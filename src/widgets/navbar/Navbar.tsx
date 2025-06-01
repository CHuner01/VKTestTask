import styles from "./Navbar.module.scss";
import CreateUserForm from "../form/CreateUserForm.tsx";
import {Select} from "@radix-ui/themes";
import {type UrlType, useUrl} from "../../app/contexts/UrlContext.tsx";

const Navbar = () => {

    const { url, setUrl, urls } = useUrl()

    return (
        <div className={styles.container}>
            <img src="/VK%20Text%20Logo.svg" alt="ВКонтакте" className={styles.logo} />
            <div className={styles.row}>
                <p>Изменить количество полей</p>
                <Select.Root
                    value={url}
                    onValueChange={(value) => setUrl(value as UrlType)}
                >
                    <Select.Trigger />
                    <Select.Content position="popper">
                        {Object.entries(urls).map(([value, label]) => (
                            <Select.Item key={value} value={value}>
                                {label}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>
                <CreateUserForm />
            </div>
        </div>
    );
};

export default Navbar;