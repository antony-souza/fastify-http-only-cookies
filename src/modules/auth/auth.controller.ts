import { FastifyReply, FastifyRequest } from "fastify";
import { genericResponseControllerUtil } from "../../core/utils/generic-controller-response";
import { AuthUseCase, IAuth } from "./usecase/auth.usecase";
import { IApiResponse } from "../../core/interface/api-response.interface";

export class AuthController {
    async login(request: FastifyRequest, reply: FastifyReply) {
        const service = new AuthUseCase();
        const { data, ...responseData } = await service.handler(request.body as IAuth) as IApiResponse

        reply.setCookie('token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            signed: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1,
        })

        genericResponseControllerUtil(responseData, reply)
    }
}   