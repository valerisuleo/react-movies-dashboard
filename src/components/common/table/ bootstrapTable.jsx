import React, { Fragment } from "react";
import _ from "lodash";

const BoorstrapTable = (props) => {
    const { colsName, collection, valueProp, onBtnClick, onSort, onSelection } = props;
    return (
        <table className="table my-3">
            <thead>
                <tr>
                    {colsName.map((item) => (
                        <th onClick={() => onSort(item)} key={item.key}>
                            {item.label}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {collection.map((item) => (
                    <tr key={item[valueProp]}>
                        {colsName.map((col) => (
                            <td key={col.key} onClick={() => onSelection(item, col)}>
                                {col.key === "actions" ? (
                                    <Fragment>
                                        {col.actions.map((btn, i) => (
                                            <button
                                                onClick={() => onBtnClick(item, btn)}
                                                className={btn.className}
                                                key={i}
                                            >
                                                {btn.label}
                                            </button>
                                        ))}
                                    </Fragment>
                                ) : (
                                    <Fragment>{_.startCase(item[col.key])}</Fragment>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BoorstrapTable;
