import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticateDeliveryman(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            error: "Token not provided",
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, "2f87b2040482ca6ea250fe8e34569c09") as IPayload;
        request.id_deliveryman = sub;
        return next();
    } catch (error) {
        return response.status(401).json({
            error: "Token invalid",
        });
    }
}