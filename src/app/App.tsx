import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Main from "../pages/Main.tsx";
import styles from "./App.module.scss"
import {Theme} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';

const queryClient = new QueryClient();

function App() {


    return (
        <Theme>
            <div className={styles.container}>
                <QueryClientProvider client={queryClient}>
                    <Main />
                </QueryClientProvider>
            </div>
        </Theme>
    )
}

export default App
