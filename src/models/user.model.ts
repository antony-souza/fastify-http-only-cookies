import { model, Schema } from "mongoose";
import { IModel, modelConfigDefault, modelKeysDefault } from "./utils/default";

export type UserType =  "ADMIN" | "COLLABORATOR" | "CUSTOMER"

export interface IUser extends IModel {
    uuid?: string;
    file?: string | null;
    name: string;
    email: string;
    phone: string;
    password: string;
    isVerify?: boolean;
    isBlocked?: boolean;
    userType?: UserType
}

export const userModel = model<IUser>("user", new Schema({
    ...modelKeysDefault,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: false,
        default: null,
    },
    isVerify: {
        type: Boolean,
        required: false,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        required: false,
        default: false,
    },
    userType: {
        type: String,
        enum: ["ADMIN", "COLLABORATOR", "CUSTOMER"],
        default: "CUSTOMER",
    }
}, modelConfigDefault));