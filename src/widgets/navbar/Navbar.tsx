import styles from "./Navbar.module.scss";
import CreateUserForm from "../form/CreateUserForm.tsx";

const Navbar = () => {

    return (
        <div className={styles.container}>
            <img src="/VK%20Text%20Logo.svg" alt="ВКонтакте" className={styles.logo} />
            <CreateUserForm />
        </div>
    );
};

export default Navbar;