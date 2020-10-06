import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

const clientId = "WGwl4crnohsIPbs6CkTHP17VAM0k2oE9";
const clientSecret = "bZlhmL4PMG3Bwym1";
const redirectUrl = `https://app.bimdive.com/api/auth/user`;

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

  return response?.data;
}

export default async function authCallback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("request received");
  const error = req.query.error as string;
  const code = req.query.code as string;

  if (error || !code) {
    console.log(`found error ${error}`);
    res.redirect("/error");
  }

  try {
    console.log(`found code ${code}`);
    const token = await generateAuthToken(code);

    if (!token) {
      res.redirect("/error");
    }

    const userData = await getUserData(token.access_token);
    console.log(`authed user ${userData.emailId}`);

    await axios.post(
      "http://ft92wl46ie.execute-api.eu-west-2.amazonaws.com/prod/auth/user",
      { ...token, code }
    );

    res.redirect(`/home?email=${userData.emailId}`);
  } catch (e) {
    console.log(e);
    res.redirect("/error");
  }
}
