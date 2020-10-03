import { NextApiRequest, NextApiResponse } from "next";
import Knex from "knex";
import axios from "axios";
import querystring from "querystring";
import moment from "moment";

const clientId = "WGwl4crnohsIPbs6CkTHP17VAM0k2oE9";
const clientSecret = "bZlhmL4PMG3Bwym1";
const redirectUrl = `http://app.bimdive.com/api/auth/user`;

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
  const error = req.query.error as string;
  const code = req.query.code as string;

  if (error || !code) {
    console.log(`found error ${error}`);
    res.redirect("/error");
  }
  console.log(`found code ${code}`);

  try {
    const token = await generateAuthToken(code);

    if (!token) {
      res.redirect("/error");
    }

    await axios.post(
      "http://ft92wl46ie.execute-api.eu-west-2.amazonaws.com/prod/auth/user",
      token
    );

    res.redirect(`/home`);
  } catch (e) {
    console.error(e);
    res.redirect("/error");
  }
}
