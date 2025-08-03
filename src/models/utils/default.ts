export const modelConfigDefault = {
    timestamps: true,
    versionKey: false,
}

export const modelKeysDefault = {
    enabled: {
        type: Boolean,
        required: false,
        default: true,
    },
}

export interface IModel {
    _id?: string;
    enabled?: boolean;
}