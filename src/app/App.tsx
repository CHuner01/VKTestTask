import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import styles from "./App.module.scss"
import {Theme} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import Navbar from "../widgets/navbar/Navbar.tsx";
import Table from "../widgets/table/Table.tsx";

const queryClient = new QueryClient();

function App() {


    return (
        <Theme>
            <div className={styles.container}>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    <Table />
                </QueryClientProvider>
            </div>
        </Theme>
    )
}

export default App
