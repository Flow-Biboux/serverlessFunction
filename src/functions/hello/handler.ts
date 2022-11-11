import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return formatJSONResponse({
    response: {
      message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
      event,
    },
    statusCode: 200,
  });
};

export const main = middyfy(hello);
