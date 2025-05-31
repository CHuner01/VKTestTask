import {useQuery} from "@tanstack/react-query";
import {api} from "../api.ts";
import type {IUser} from "../fieldsTypesConfig.ts";


const useTable = () => {

    const fetchData = async () => {
        const response = await api.get<IUser[]>(`/users5`);
        console.log(response.data)
        return response.data
    }

    const { data: tableData } = useQuery<IUser[]>({
        queryKey: ['table'],
        queryFn: fetchData,
    })

    return {
        tableData,
    }
};

export default useTable;