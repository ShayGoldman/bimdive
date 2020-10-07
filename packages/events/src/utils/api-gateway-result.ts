import { APIGatewayProxyResult } from "aws-lambda";

function success<T>(data: T): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      success: true,
      error: null,
      data,
    }),
    isBase64Encoded: false,
  };
}

function redirect(url: string): APIGatewayProxyResult {
  return {
    statusCode: 302,
    body: "",
    headers: {
      Location: url,
    },
    isBase64Encoded: false,
  };
}

function error(error: Error | string): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      success: true,
      errorCode: -1,
      error: error instanceof Error ? error.message : error,
      data: null,
    }),
    isBase64Encoded: false,
  };
}

export { success, error, redirect };
