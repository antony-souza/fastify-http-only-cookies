

import { FastifyReply } from "fastify";
import { IApiResponse } from "../interface/api-response.interface";

export function genericResponseControllerUtil(data: IApiResponse, reply: FastifyReply) {
  if (!data.data) {
    data.data = {};
  }

  reply.status(data.errors?.length ? 400 : 200).send(data);
}