import React, { useState } from 'react';
import dataTable from './dataTable.json';

const MarketTable = () => {
    const preLoad = 5
    const startingData = dataTable?.length && dataTable.slice(0, preLoad)
    const [dataIndex, setDataIndex] = useState(preLoad)
    const headerData = Object.keys(dataTable[0]);
    const [filterCriteria, setFilterCriteria] = useState('');
    const [selectedColumn, setSelectedColumn] = useState(headerData[0]);
    const [selectedOperator, setSelectedOperator] = useState('==');

    const [tableData, setTableData] = useState(startingData);

    const loadData = () => {
        if (dataIndex >= dataTable.length) {
            return
        }
        setTableData([...tableData, ...dataTable.slice(dataIndex, (dataIndex + preLoad))])
        setDataIndex(e => e + preLoad)
    }

    const applyFilter = () => {
        if (!filterCriteria) {
            setTableData(dataTable);
            return;
        }

        const filteredResult = dataTable.filter((item) => {
            const itemValue = item[selectedColumn];
            switch (selectedOperator) {
                case '==':
                    return itemValue === filterCriteria;
                case '>':
                    return itemValue > filterCriteria;
                case '<':
                    return itemValue < filterCriteria;
                default:
                    return false;
            }
        });

        setTableData(filteredResult);
    };

    const clearFilter = () => {
        setFilterCriteria('');
        setTableData(startingData);
    };

    return (
        <div>
            <div className="filter-box">
                <select
                    name="column"
                    id="column"
                    value={selectedColumn}
                    onChange={(e) => {
                        setSelectedColumn(e.target.value)
                        setTableData(startingData)
                    }
                    }
                >
                    {headerData?.map((val, index) => {
                        return (
                            <option key={index} value={val}>
                                {val}
                            </option>
                        );
                    })}
                </select>
                <select
                    name="operator"
                    id="operator"
                    value={selectedOperator}
                    onChange={(e) => {
                        setSelectedOperator(e.target.value)
                        setTableData(startingData)
                    }
                    }
                >
                    <option value="<">{'<'}</option>
                    <option value="==">{'=='}</option>
                    <option value=">">{'>'}</option>
                </select>
                <input
                    type="text"
                    placeholder="Filter (e.g., Symbol == SBIN)"
                    value={filterCriteria}
                    onChange={(e) => setFilterCriteria(e.target.value)}
                />
                <button onClick={applyFilter}>Apply Filter</button>
                <button onClick={clearFilter}>Clear Filter</button>
            </div>
            <table>
                <thead>
                    <tr>
                        {headerData?.map((val, index) => {
                            return <th key={index}>{val}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData?.length ?
                            tableData?.map((val, index) => {
                                return (
                                    <tr key={index}>
                                        {headerData?.map((itm, idx) => {
                                            return <td key={idx}>{val[itm]}</td>;
                                        })}
                                    </tr>
                                );
                            })
                            :
                            <tr>
                                <td colSpan={headerData?.length}>
                                    No Data
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            {
                (filterCriteria === '' && dataIndex < dataTable.length)
                &&
                <div className='loadMore'>
                    <button onClick={loadData}>Load More</button>
                </div>
            }
        </div>
    );
};

export default MarketTable;
