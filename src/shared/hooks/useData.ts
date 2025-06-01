import {type QueryFunctionContext, useInfiniteQuery} from "@tanstack/react-query";
import {api} from "../api.ts";
import {type IUser, selectOptions} from "../fieldsTypesConfig.ts";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import {type UrlType, useUrl} from "../../app/contexts/UrlContext.tsx";


const USERS_PER_PAGE = 15;

interface IPage {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: IUser[];
}

interface IDataResponse {
    pages: IPage[];
    pageParams: number[];
}
type MyQueryContext = QueryFunctionContext<[string, UrlType], number>;

const useData = () => {

    const { url } = useUrl()
    const { ref, inView } = useInView();

    const fetchData = async ({ pageParam = 1 }: MyQueryContext): Promise<IPage> => {
        const response = await api.get<IPage>(url, {
            params: {
                _page: pageParam,
                _per_page: USERS_PER_PAGE,
            }
        });

        return response.data
    };

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery<IPage, Error, IDataResponse, [string, UrlType], number>
    ({
        queryKey: ['table', url],
        queryFn: fetchData,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.next ?? undefined
    })

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

    const tableData = data?.pages.flatMap(page => page.data);

    return {
        data: {
            tableData,
            selectOptions
        },
        state: {
            isLoading,
            error
        },
        ref,
    }
};

export default useData;