import useTable from "../../shared/hooks/useTable.ts";
import styles from "./Table.module.scss"

const Table = () => {

    const { tableData, selectOptions, ref, error } = useTable()

    if (!tableData) {
        return <p>Нет данных</p>
    }

    const headers = Object.keys(tableData[0]).filter(key => key !== 'id');

    if (error) return <p>Походу здесь ошибка</p>

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.tableRow}>
                            {headers.map((key) => (
                                <th key={key} className={styles.th}>
                                    {tableData[0][key].title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                    {tableData.map((user, index) => (
                        <tr key={index} className={styles.tableRow}>
                            {headers.map((key) => (
                                <td key={key} className={styles.td}>
                                    {(key === "role" || key === "gender")
                                        ? selectOptions[key as keyof typeof selectOptions][user[key].payload as keyof typeof selectOptions[typeof key]]
                                        : String(user[key].payload)}
                                </td>
                            ))}
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