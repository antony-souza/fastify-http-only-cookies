import Fastify from 'fastify'
import { environment } from './env/environment'
import mongoose from 'mongoose';
import cors from '@fastify/cors';
import { routes } from './routes';
import cookie from '@fastify/cookie';
import { needKeyApiHeadersMiddleware } from './middleware/key-headers.middleware';

export async function bootstrap() {

    const app = Fastify({
        logger: {
            level: 'debug',
        },

    })

    app.register(cors, {
        origin: '*',
        credentials: true,
    })

    await app.register(cookie, {
        secret: environment.cookieSecret,
    });

    app.addHook("onRequest", needKeyApiHeadersMiddleware);

    await app.register(routes)

    await mongoose.connect(environment.mongoUrl).then(() => {
        app.log.debug("Connected to DB");
    });

    await app.listen({ port: environment.port }).catch(err => {
        app.log.error(err);
        process.exit(1);
    });
}

bootstrap()