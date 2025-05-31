
import styles from "./Navbar.module.scss";

const Navbar = () => {




    return (
        <div className={styles.container}>
            <p>Таблица</p>
            <img src="/VK%20Text%20Logo.svg" alt="ВКонтакте" className={styles.logo} />
            <button>Форма</button>
        </div>
    );
};

export default Navbar;