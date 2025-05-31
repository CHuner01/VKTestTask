import { z } from 'zod';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useCreateUserForm from "./useCreateUserForm.ts";
import styles from "./CreateUserForm.module.scss"
import {Button, Dialog, Flex, Select, Text, TextField} from "@radix-ui/themes";

const CreateUserForm = () => {

    const { tableData, userSchema, selectOptions, onSubmit } = useCreateUserForm()

    type TUserSchema = z.infer<typeof userSchema>

    const {
        control,
        getValues,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TUserSchema>({
        resolver: zodResolver(userSchema),
    })


    if (!tableData) {
        return <p>Нет данных</p>
    }

    type InputType = "text" | "number"

    return (
        <>
            {/*<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>*/}
            {/*    {Object.entries(tableData[0]).map(([key, val]) => {*/}
            {/*        if (key === 'id') return null;*/}
            {/*        let inputType = 'text';*/}
            {/*        if (val.type === 'number') inputType = 'number';*/}

            {/*        return (*/}
            {/*            <div key={key}>*/}
            {/*                <label>{key}</label>*/}

            {/*                {(val.type === 'role' || val.type === 'gender')*/}
            {/*                    ? <select*/}
            {/*                        {...register(key)}*/}
            {/*                    >*/}
            {/*                        {Object.entries(selectOptions[val.type]).map(([value, label]) => (*/}
            {/*                            <option key={value} value={value}>*/}
            {/*                                {label}*/}
            {/*                            </option>*/}
            {/*                        ))}*/}
            {/*                    </select>*/}
            {/*                    : <input*/}
            {/*                        type={inputType}*/}
            {/*                        {...register(key)}*/}
            {/*                    />*/}
            {/*                }*/}

            {/*                {errors[key] && <p>{errors[key]?.message as string}</p>}*/}
            {/*            </div>*/}
            {/*        );*/}
            {/*    })}*/}

            {/*    <button type="submit">Создать</button>*/}
            {/*    <button type="button" onClick={() => console.log(getValues)}>Что</button>*/}
            {/*</form>*/}



            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>Добавить запись</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Dialog.Title>Добавить запись</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Заполните поля, чтобы создать нового пользователя
                    </Dialog.Description>

                    <Flex direction="column" gap="3">

                            {Object.entries(tableData[0]).map(([key, val]) => {
                                if (key === 'id') return null;
                                let inputType: InputType = 'text';
                                if (val.type === 'number') inputType = 'number';
                                let entries: [string, string][]
                                if (val.type === 'role' || val.type === 'gender') {
                                    entries = Object.entries(selectOptions[val.type]); }

                                return (
                                    <div key={key}>
                                        {(val.type === 'role' || val.type === 'gender')
                                            ?
                                            <>
                                                <label>
                                                    <Text as="div" size="2" mb="1" weight="bold">
                                                        {val.title}
                                                    </Text>
                                                    <Controller
                                                        name={key}
                                                        control={control}
                                                        defaultValue={Object.keys(selectOptions[val.type])[0]}
                                                        render={({ field }) => (
                                                            <Select.Root
                                                                value={field.value}
                                                                onValueChange={field.onChange}
                                                            >
                                                                <Select.Trigger />
                                                                <Select.Content side="bottom" align="start">
                                                                    {entries.map(([value, label]) => (
                                                                        <Select.Item key={value} value={value}>
                                                                            {label}
                                                                        </Select.Item>
                                                                    ))}
                                                                </Select.Content>
                                                            </Select.Root>
                                                        )}
                                                    />
                                                </label>
                                            </>
                                            :
                                            <label>
                                                <Text as="div" size="2" mb="1" weight="bold">
                                                    {val.title}
                                                </Text>
                                                <TextField.Root
                                                    type={inputType}
                                                    {...register(key)}
                                                />
                                            </label>
                                        }

                                        {errors[key] && <p>{errors[key]?.message as string}</p>}
                                    </div>
                                );
                            })}
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button type="button" variant="soft" color="gray">
                                Отмена
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type="submit">Сохранить</Button>
                        </Dialog.Close>
                    </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

export default CreateUserForm;