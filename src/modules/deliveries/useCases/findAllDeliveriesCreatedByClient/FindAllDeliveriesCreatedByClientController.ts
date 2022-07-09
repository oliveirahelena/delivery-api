import { Request, Response } from "express";
import { FindAllDeliveriesCreatedByClientUseCase } from "./FindAllDeliveriesCreatedByClientUseCase";


export class FindAllDeliveriesCreatedByClientController {
    async handle(request: Request, response: Response) {
        const { id_client } = request;

        const findAllDeliveriesCreatedByClientUseCase = new FindAllDeliveriesCreatedByClientUseCase();

        const deliveries = await findAllDeliveriesCreatedByClientUseCase.execute(id_client);

        return response.json(deliveries);    
    }
}