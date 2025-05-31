import useTable from "../../shared/hooks/useTable.ts";

const Table = () => {

    const { tableData } = useTable()

    if (!tableData) {
        return <p>Нет данных</p>
    }

    const headers = Object.keys(tableData[0])

    return (
        <>
            <table>
                <thead>
                    <tr>
                    {headers.map((key) => (
                        <th key={key}>{tableData[0][key].title}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                {tableData.map((user, index) => (
                    <tr key={index}>
                        {headers.map((key) => (
                            <td key={key}>{String(user[key].payload)}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

        </>
    );
};

export default Table;