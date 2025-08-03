import { IApiResponse } from "../interface/api-response.interface";

interface IUseCase {
    handler: (...args: any[]) => Promise<IApiResponse>
}

export class BaseUseCase implements IUseCase {
    async handler(...args: any[]): Promise<IApiResponse> {
        throw new Error("Method not implemented.");
    }
}