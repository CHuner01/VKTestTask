import {z, type ZodTypeAny} from "zod";

type FieldType = 'string' | 'number' | 'email' | 'role' | 'gender';
type RoleType = 'ADMIN' | 'USER'
type GenderType = 'MALE' | 'FEMALE'

interface IField {
    title: string;
    payload: string | number | RoleType | GenderType;
    type: FieldType
}

export type IUser = Record<string, IField>


export const typeMap: Record<string, ZodTypeAny> = {
    string: z.string()
        .regex(/^[A-Za-zА-Яа-яЁё]+$/, "Некорректное слово")
        .min(1, "Пустая строка")
        .max(50, "Максимум 50 символов"),
    number: z.coerce.number().nonnegative("Неотрицательное значение").max(100, "Максимальное значение 100"),
    email: z.string().email(),
    role: z.enum(["ADMIN", "USER"]),
    gender: z.enum(["MALE", "FEMALE"]),
}

export const selectOptions = {
    role: {
        ADMIN: "Админ",
        USER: "Пользователь",
    },
    gender: {
        MALE: "Мужчина",
        FEMALE: "Женщина",
    },
}