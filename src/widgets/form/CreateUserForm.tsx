import { z } from 'zod';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useCreateUserForm from "./useCreateUserForm.ts";
import styles from "./CreateUserForm.module.scss"
import {Button, Dialog, Flex, Select, Text, TextField} from "@radix-ui/themes";
import {useEffect} from "react";

const CreateUserForm = () => {

    const {
        data: {selectOptions, tableData, userSchema},
        state: { open, isDisabled, isPending },
        functions: { onSubmit, setOpen },
    } = useCreateUserForm()


    type TUserSchema = z.infer<typeof userSchema>

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TUserSchema>({
        resolver: zodResolver(userSchema),
        mode: "onChange",
    })

    useEffect(() => {
        reset()
    }, [open]);


    type InputType = "text" | "number"

    return (
        <>
            <Dialog.Root open={open} onOpenChange={(open) => {setOpen(open)}}>
                <Dialog.Trigger>
                    <Button
                        disabled={isDisabled}
                        className={styles.button}
                    >Добавить запись</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px" >
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Dialog.Title>Добавить запись</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Заполните поля, чтобы создать нового пользователя
                    </Dialog.Description>

                    <Flex direction="column" gap="1">

                            {tableData && Object.entries(tableData[0]).map(([key, val]) => {
                                if (key === 'id') return null;
                                let inputType: InputType = 'text';
                                if (val.type === 'number') inputType = 'number';
                                let entries: [string, string][]
                                if (val.type === 'role' || val.type === 'gender') {
                                    entries = Object.entries(selectOptions[val.type]); }

                                return (
                                    <div key={key}>
                                        <div className={errors[key] ? "" : styles.container}>
                                            {(val.type === 'role' || val.type === 'gender')
                                                ?
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
                                                                <Select.Content position="popper">
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
                                                :
                                                <label>
                                                    <Text as="div" size="2" mb="1" weight="bold">
                                                        {val.title}
                                                    </Text>
                                                    <TextField.Root
                                                        color={errors[key] ? "red" : undefined}
                                                        variant={errors[key] ? "soft" : undefined}
                                                        type={inputType}
                                                        {...register(key)}
                                                    />
                                                </label>
                                            }
                                        </div>

                                        {errors[key]
                                            && <p className={styles.errorMessage}>
                                            {errors[key]?.message as string}
                                        </p>}
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
                        <Button
                            type="submit"
                            disabled={isPending}
                        >Сохранить</Button>
                    </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

export default CreateUserForm;