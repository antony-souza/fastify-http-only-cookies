import { FastifyRequest, FastifyReply } from "fastify";
import { environment } from "../env/environment";

export const needKeyApiHeadersMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const apiKey = request.headers['api-key'];
  
  if (apiKey && apiKey === environment.apiKey) {
    return;
  }

  return reply.status(401).send({ message: "Not Authenticated" });
};