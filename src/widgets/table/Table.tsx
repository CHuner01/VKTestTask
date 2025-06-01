import useData from "../../shared/hooks/useData.ts";
import styles from "./Table.module.scss"
import {Tooltip} from "@radix-ui/themes";
import { ClipLoader } from "react-spinners";

const Table = () => {

    const { data: { tableData, selectOptions }, state: { isLoading, error }, ref } = useData()

    if (isLoading) {
        return (
            <div className={styles.textContainer}>
                <ClipLoader size={48} color="#0077FF" />
            </div>
        )
    }

    if (!tableData) {
        return (
            <div className={styles.textContainer}>
                <p className={styles.text}>Похоже, ничего не нашлось</p>
            </div>
        )
    }

    const headers = Object.keys(tableData[0]).filter(key => key !== 'id');


    if (error) {
        return (
            <div className={styles.textContainer}>
                <p className={styles.text}>Походу тут ошибка</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.tableRow}>
                            {headers.map((key) => (
                                <Tooltip content={tableData[0][key].title} key={key}>
                                    <th className={styles.th}>
                                        {tableData[0][key].title}
                                    </th>
                                </Tooltip>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                    {tableData.map((user, index) => (
                        <tr key={index} className={styles.tableRow}>
                            {headers.map((key) => {
                                const title = (key === "role" || key === "gender")
                                    ? selectOptions[key as keyof typeof selectOptions][user[key].payload as keyof typeof selectOptions[typeof key]]
                                    : String(user[key].payload)
                                return (
                                <Tooltip content={title} key={key}>
                                    <td key={key} className={styles.td}>
                                        {title}
                                    </td>
                                </Tooltip>
                                )
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
                {tableData && <div ref={ref}></div>}
                {/*<div ref={ref}></div>*/}
            </div>
        </div>
    );
};

export default Table;