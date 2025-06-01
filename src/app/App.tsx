import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import styles from "./App.module.scss"
import {Theme} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import Navbar from "../widgets/navbar/Navbar.tsx";
import Table from "../widgets/table/Table.tsx";
import UrlProvider from "./contexts/UrlContext.tsx";

const queryClient = new QueryClient();

function App() {


    return (
        <Theme>
            <QueryClientProvider client={queryClient}>
                <UrlProvider>
                    <div className={styles.container}>
                        <Navbar />
                        <Table />
                    </div>
                </UrlProvider>
            </QueryClientProvider>
        </Theme>
    )
}

export default App
