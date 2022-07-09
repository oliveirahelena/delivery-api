import { prisma } from "../../../../database/prismaClient";

interface IUdateEndDate {
    id_delivery: string;
    id_deliveryman: string;
}

export class UpdateEndDateUseCase {
    async execute({id_delivery, id_deliveryman}: IUdateEndDate) {
        const result = await prisma.deliveries.updateMany({
            where: {
                id: id_delivery,
                id_deliveryman
            },
            data: {
                ended_at: new Date(),
            }
        });

        return result;
    }
}