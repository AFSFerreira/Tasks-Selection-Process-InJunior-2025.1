import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPajamasSizeRepository } from "src/repositories/prisma/prisma-pajama-size-repository";
import { PrismaPajamasRepository } from "src/repositories/prisma/prisma-pajamas-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { GetPajamaInfoUseCase } from "src/use-cases/pajamas/get-pajama-info-use-case";
import { z } from "zod";

export async function getPajama(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        pajamaId: z.string()
            .nonempty("Pajama ID cannot be empty")
            .uuid("Pajama ID must be a valid UUID")
    });


    const { pajamaId } = getParamsSchema.parse(request.params);
    
    const prismaPajamasRepository = new PrismaPajamasRepository();
    const prismaPajamaSizeRepository = new PrismaPajamasSizeRepository();
    
    const getPajamaUseCase = new GetPajamaInfoUseCase(prismaPajamasRepository, prismaPajamaSizeRepository);

    try {
        const getPajamaResponse = await getPajamaUseCase.execute({ pajamaId });

        return reply.status(200).send(getPajamaResponse.pajama);

    } catch (error) {
        if (error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}
