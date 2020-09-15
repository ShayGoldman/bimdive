import { NextApiRequest, NextApiResponse } from "next";
import Knex from "knex";
import axios from "axios";
import querystring from "querystring";
import moment from "moment";

const clientId = "WGwl4crnohsIPbs6CkTHP17VAM0k2oE9";
const redirectUrl = `http://localhost:3000/api/auth/redirected`;

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
  connection: {
    host: process.env.db_host,
    port: parseInt(process.env.db_port, 10),
    database: process.env.db_database,
    user: process.env.db_userName,
    password: process.env.db_password,
  },
});

client.on("query", function ({ sql, bindings }) {
  console.debug({ msg: "DB query", sql, bindings });
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const error = req.query.error as string;
  const code = req.query.code as string;

  if (error || !code) {
    res.redirect("/error");
  }

  const issuedAt = new Date().toUTCString();
  const token = await generateAuthToken(code);
  const accessToken = token.access_token;

  if (!token) {
    res.redirect("/error");
  }

  const userData = await getUserData(accessToken);

  const providerUserId = userData.userId;

  try {
    await client("etl.users").insert({
      provider_id: providerUserId,
      email: userData.emailId,
      first_name: userData.firstName,
      last_name: userData.lastName,
      profile_img_url: userData.profileImages.sizeX240,
    });
    await client("etl.access_tokens").insert({
      provider_user_id: providerUserId,
      access_token: accessToken,
      refresh_token: token.refresh_token,
      issued_at: issuedAt,
      expires_at: moment(issuedAt)
        .add(token.expires_in, "seconds")
        .toDate()
        .toUTCString(),
    });
  } catch (e) {
    console.error(e);
  }
  res.redirect(`/home?emailz=${userData.emailId}`);
}
