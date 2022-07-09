import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesByDeliverymanUseCase {
    async execute(id_deliveryman: string) {
        const deliveries = await prisma.deliveries.findMany({
            where: {
                id_deliveryman,
            }
        });

        return deliveries;
    }
}