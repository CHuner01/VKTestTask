import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "../../shared/api.ts";
import useTable from "../../shared/hooks/useTable.ts";
import {z} from "zod";
import {type IUser, selectOptions, typeMap} from "../../shared/fieldsTypesConfig.ts";

const useCreateUserForm = () => {

    const { tableData } = useTable();

    const userSchema = z.object(
        Object.fromEntries(
            tableData ? Object.entries(tableData[0]).map(([key, field]) => {
                const zodType = typeMap[field.type];
                if (!zodType) {
                    throw new Error(`Unsupported type: ${field.type}`);
                }
                return [key, zodType];
            }) : []
        )
    )

    type TUserSchema = z.infer<typeof userSchema>

    const queryClient = useQueryClient();

    const sendUserMutation = useMutation({
        mutationFn: (newUser: IUser) =>
            api.post('/users5', newUser),
        onSuccess: (data) => {
            console.log(data)
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
        sendUserMutation.mutate(newUser)
        console.log(data)
        console.log(newUser)
    }


    return {
        tableData,
        userSchema,
        selectOptions,
        onSubmit,
    }
};

export default useCreateUserForm;