import { prisma } from '../../../../database/prismaClient';
import { hash, genSalt } from 'bcrypt';


interface ICreateDeliveryman {
    username: string;
    password: string;
}

export class CreateDeliverymanUseCase {
    async execute({ password, username}: ICreateDeliveryman) {
        const deliverymanExist = await prisma.deliveryman.findFirst({
            where: {
                username: {
                    mode: "insensitive"
                }
            }
        })

        if (deliverymanExist) {
            throw new Error("Deliveryman already exists")
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const deliveryman = await prisma.deliveryman.create({
            data: {
                username,
                password: hashedPassword,
            }
        });

        return deliveryman;
    }
}