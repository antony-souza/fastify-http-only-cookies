import { BaseUseCase } from "../../../core/base/usecase.base";
import { IApiResponse } from "../../../core/interface/api-response.interface";
import { environment } from "../../../env/environment";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../../models/user.model";

export type IAuth = {
    email: string;
    password: string;
}

export class AuthUseCase implements BaseUseCase {
    async handler(data: IAuth): Promise<IApiResponse> {
        const user = await userModel.findOne({
            email: data.email,
            enabled: true,
            isVerify: true,
            isBlocked: false,
        }).exec();

        if (!user) {
            return {
                message: "Oops!",
                errors: ["User not found or not authorized!"],
            }
        }

        const comparePassword = await bcrypt.compare(data.password, user.password);

        if (!comparePassword) {
            return { message: "Oops!", errors: ["Email or password is incorrect!"] };
        }

        const token = jwt.sign({ email: user.email }, environment.tokenSecret, {
            expiresIn: "1h"
        });

        return {
            message: "Login successful!",
            errors: [],
            data: {
                token,
            },
        }
    }
}