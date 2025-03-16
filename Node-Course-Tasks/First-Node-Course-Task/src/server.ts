import { app } from './app';
import { env } from './env/index';
import { prismaClient } from './lib/prisma';

const server = app.listen({
    host: '0.0.0.0',
    port: env.PORT,
    }, (error, address) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }

        console.log(`Server is listening on port ${env.PORT}`);
        console.log(`Server is running in address ${address}`);
});


process.on('SIGINT', async () => {
    await prismaClient.$disconnect();
})
