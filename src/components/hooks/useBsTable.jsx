import { useEffect } from "react";
import { useState } from "react";
import { colsMaker } from "../common/table/colsMaker";
import { sorting } from "../common/table/sorting";

function useBootsTable(schema, colsName, actions, collection, deleteItem) {
    const [table, setStateTable] = useState(schema);

    useEffect(() => {
        if (collection.length) {
            // console.log("collection", collection);
            const clone = { ...table };

            clone.cols = setCols(collection);
            clone.itemsDisplayed = sorting(
                collection,
                clone.sortColumn.path,
                clone.sortColumn.order
            );

            setStateTable(clone);
            // console.log("clone", clone);
        }
    }, [collection]);

    function setCols(data) {
        const obj = data[0];
        return colsMaker(obj, colsName, actions);
    }

    const handleClick = (current, currentBtn) => {
        // console.log(currentBtn);
        if (currentBtn.name === "remove") {
            deleteItem({
                item: current,
                btn: currentBtn,
            });
        }
    };

    const handleSorting = (current) => {
        const clone = { ...table };
        clone.sortColumn.order =
            clone.sortColumn.order === "asc" ? "desc" : "asc";
        clone.sortColumn.path = current.key;
        clone.itemsDisplayed = sorting(
            clone.itemsDisplayed,
            current.key,
            clone.sortColumn.order
        );
        setStateTable(clone);
    };

    return [table, handleSorting, handleClick];
}

export default useBootsTable;
