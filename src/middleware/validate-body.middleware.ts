import { FastifyReply, FastifyRequest } from 'fastify'
import { z, ZodError } from 'zod'

export const validationBodyMiddleware = <T>(schema: z.ZodSchema<T>) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      request.body = schema.parse(request.body)
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map(
          (err) => `${err.message} at ${err.path.join('.')}`
        )

        return reply.status(400).send({
          message: 'Erro de validação',
          errors: errorMessages,
        })
      }

      return reply.status(400).send({ message: 'Erro desconhecido', error })
    }
  }
}
