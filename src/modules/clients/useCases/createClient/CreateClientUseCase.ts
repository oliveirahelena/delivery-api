import { prisma } from '../../../../database/prismaClient';
import { hash, genSalt } from 'bcrypt';


interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {
    async execute({ password, username}: ICreateClient) {
        const clientExist = await prisma.clients.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: "insensitive"
                }
            }
        })

        if (clientExist) {
            throw new Error("Client already exists")
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const client = await prisma.clients.create({
            data: {
                username,
                password: hashedPassword,
            }
        });

        return client;
    }
}