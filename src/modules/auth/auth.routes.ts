import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { AuthController } from './auth.controller'
import { validationBodyMiddleware } from '../../middleware/validate-body.middleware'
import { authSchema } from './schemas/auth.schema'

export const controller = new AuthController()

export async function authRoutes(fastify: FastifyInstance) {

    fastify.post('/',
        { preHandler: validationBodyMiddleware(authSchema) },
        controller.login
    )
}