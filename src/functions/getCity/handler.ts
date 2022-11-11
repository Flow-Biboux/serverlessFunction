import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getCity: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const blockchainName = event.pathParameters?.blockchainName;
  if (!blockchainName || !blockchainData[blockchainName]) {
    return apiResponses._400({ message: "blockchain name incorrect" });
  }
  return apiResponses._200(blockchainData[blockchainName]);
};

export const main = middyfy(getCity);

interface Blockchain {
  name: string;
  api?: string;
  address?: string;
}

const blockchainData: { [key: string]: Blockchain } = {
  solana: { name: "solana" },
  etherum: { name: "etherum" },
  bnb: { name: "bnb" },
};

const apiResponses = {
  _200: (body: { [key: string]: any }) => {
    return formatJSONResponse({
      response: {
        message: body,
      },
      statusCode: 200,
    });
  },
  _400: (body: { [key: string]: any }) => {
    return formatJSONResponse({
      response: {
        message: body,
      },
      statusCode: 400,
    });
  },
};
