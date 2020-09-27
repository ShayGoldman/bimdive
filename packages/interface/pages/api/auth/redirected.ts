import { NextApiRequest, NextApiResponse } from "next";
import Knex from "knex";
import axios from "axios";
import querystring from "querystring";
import moment from "moment";

const clientId = "WGwl4crnohsIPbs6CkTHP17VAM0k2oE9";
const clientSecret = "bZlhmL4PMG3Bwym1";
const redirectUrl = `http://app.bimdive.com/api/auth/redirected`;

async function getUserData(token: string): Promise<any> {
  const response = await axios.get(
    "https://developer.api.autodesk.com/userprofile/v1/users/@me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

async function generateAuthToken(code: string): Promise<any> {
  const response = await axios.post(
    "https://developer.api.autodesk.com/authentication/v1/gettoken",
    querystring.stringify({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      redirect_uri: redirectUrl,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
}

const client = Knex({
  client: "pg",
  connection: process.env.DB_CONNECTION_STRING,
});

client.on("query", function ({ sql, bindings }) {
  console.debug({ msg: "DB query", sql, bindings });
});

export default async function authCallback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const error = req.query.error as string;
  const code = req.query.code as string;

  if (error || !code) {
    console.log(`found error ${code}`);
    res.redirect("/error");
  }
  console.log(`found code ${code}`);

  try {
    const issuedAt = new Date().toUTCString();
    const token = await generateAuthToken(code);
    const accessToken = token.access_token;

    if (!token) {
      res.redirect("/error");
    }

    const userData = await getUserData(accessToken);

    const userProviderId = userData.userId;
    try {
      await client("events.users").insert({
        provider_id: userProviderId,
        email: userData.emailId,
        first_name: userData.firstName,
        last_name: userData.lastName,
        profile_img_url: userData.profileImages.sizeX240,
      });
    } catch (e) {
      console.log(e);
    }
    await client("events.access_tokens").insert({
      user_provider_id: userProviderId,
      access_token: accessToken,
      refresh_token: token.refresh_token,
      issued_at: issuedAt,
      expires_at: moment(issuedAt)
        .add(token.expires_in, "seconds")
        .toDate()
        .toUTCString(),
    });
    res.redirect(`/home?emailz=${userData.emailId}`);
  } catch (e) {
    console.error(e);
    res.redirect("/error");
  }
}
