import {createContext, type FC, useContext, useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";

export type UrlType = "users5" | "users15"

const urls = {
    users5: "5 полей",
    users15: "15 полей",
}

interface IUrlContext {
    url: UrlType,
    setUrl: (url: UrlType) => void,
    urls: Record<string, string>,
}

const UrlContext = createContext<IUrlContext>({
    url: Object.keys(urls)[0] as UrlType,
    setUrl: () => {},
    urls: urls
});

interface UrlProviderProps {
    children: React.ReactNode;
}

const UrlProvider: FC<UrlProviderProps> = ({children}) => {
    const [url, setUrl] = useState<UrlType>(Object.keys(urls)[0] as UrlType);

    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['table', url] })
    }, [url])

    return (
        <UrlContext.Provider value={{url, setUrl, urls}}>
            {children}
        </UrlContext.Provider>
    )
}

export const useUrl = () => {
    return useContext(UrlContext);
};

export default UrlProvider;