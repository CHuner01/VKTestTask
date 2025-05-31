import { z } from 'zod';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useCreateUserForm from "./useCreateUserForm.ts";
import styles from "./CreateUserForm.module.scss"

const CreateUserForm = () => {

    const { tableData, userSchema, selectOptions, onSubmit } = useCreateUserForm()

    type TUserSchema = z.infer<typeof userSchema>

    const {

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



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
                {Object.entries(tableData[0]).map(([key, val]) => {
                    let inputType = 'text';
                    if (val.type === 'number') inputType = 'number';

                    return (
                        <div key={key}>
                            <label>{key}</label>

                            {(val.type === 'role' || val.type === 'gender')
                                ? <select
                                    {...register(key)}
                                >
                                    {Object.entries(selectOptions[val.type]).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                : <input
                                    type={inputType}
                                    {...register(key)}
                                />
                            }

                            {errors[key] && <p>{errors[key]?.message as string}</p>}
                        </div>
                    );
                })}

                <button type="submit">Создать</button>
                <button type="button" onClick={() => console.log(getValues)}>Что</button>
            </form>
        </>
    );
};

export default CreateUserForm;