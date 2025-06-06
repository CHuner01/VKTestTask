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
        .trim()
        .min(1, "Пустая строка")
        .regex(/^[A-Za-zА-Яа-яЁё -]+$/, "Можно использовать буквы, пробел и тире")
        .max(50, "Максимум 50 символов"),
    number: z.coerce.number()
        .min(1, "Минимальное значение 1")
        .max(100, "Максимальное значение 100"),
    email: z.string()
        .trim()
        .email("Некорректный email"),
    role: z.enum(["ADMIN", "USER"]),
    gender: z.enum(["MALE", "FEMALE"]),
    telegram: z.string()
        .trim()
        .regex(/^@([a-zA-Z][a-zA-Z0-9_]{4,31})$/, "Введите по примеру: @user. Минимум 5 символов")
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