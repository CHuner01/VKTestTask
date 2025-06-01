import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../../shared/api.ts";
import useData from "../../shared/hooks/useData.ts";
import {z} from "zod";
import {type IUser, selectOptions, typeMap} from "../../shared/fieldsTypesConfig.ts";
import {useEffect, useState} from "react";

const useCreateUserForm = () => {

    const { data: { tableData } } = useData();
    const [open, setOpen] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    useEffect(() => {
        setIsDisabled(!tableData)
    }, [tableData]);

    const userSchema = z.object(
        Object.fromEntries(
            tableData ? Object.entries(tableData[0]).flatMap(([key, field]) => {
                if (key === "id") { return []}
                const zodType = typeMap[field.type];
                if (!zodType) {
                    throw new Error(`Unsupported type: ${field.type}`);
                }
                return [[key, zodType]];
            }) : []
        )
    )

    type TUserSchema = z.infer<typeof userSchema>

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (newUser: IUser) =>
            api.post('', newUser),
        onSuccess: (data) => {
            console.log(data)
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ['table'] })
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const onSubmit = (data: TUserSchema) => {

        if (!tableData) { return }

        const newUser: IUser = { ...tableData[0] }
        Object.entries(data).forEach(([key, value]) => {
            newUser[key] = {
                ...newUser[key],
                payload: value,
            }
        })
        mutate(newUser)
        console.log(data)
        console.log(newUser)
    }


    return {
        data: {
            tableData,
            userSchema,
            selectOptions,
        },
        state: {
            open,
            isDisabled,
            isPending
        },
        functions: {
            setOpen,
            onSubmit,
        }
    }
};

export default useCreateUserForm;