import { useEffect } from "react";
import { useState } from "react";
import { sorting } from "../common/table/sorting";

function usePagination(schema, collection) {
    const [paginateData, setStatePaginateData] = useState(schema);

    useEffect(() => {
        if (collection.length) {
            console.log("paginateData", paginateData);
            console.log("collection", collection);
            const clone = { ...paginateData };

            // clone.itemsDisplayed = sorting(
            //     collection,
            //     clone.sortColumn.path,
            //     clone.sortColumn.order
            // );

            setStatePaginateData(clone);
            // console.log("clone", clone);
        }
    }, [collection]);

    const handlePageChange = (current) => {};

    return [paginateData, handlePageChange];
}

export default usePagination;
