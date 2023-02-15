import { useState, useEffect, useRef } from "react";
import { colsMaker } from "../common/table/colsMaker";

function useTableHooks(collection, eventEmitter, props) {
    const schema = {
        collection: [],
        itemOnScreen: [],
        cols: [],
        pageSize: 0,
        sortColumns: {
            path: "title",
            order: "asc",
        },
    };
    const [table, setTable] = useState(schema);
    const prevCollectionRef = useRef(collection);

    useEffect(() => {
        if (collection !== prevCollectionRef.current) {
            const clone = { ...table };
            const cols = colsMaker(collection[0], props.cols, props.actions);
            clone.collection = collection;
            clone.cols = cols;
            setTable(clone);
        }
        prevCollectionRef.current = collection;
    }, [props.actions, collection, props.cols, table]);

    const handleClick = (currentItem, event) => {
        eventEmitter({ currentItem, event });
    };
    const handleSelection = (currentMovie, currentCol) => {};

    return [table, handleClick, handleSelection];
}

export default useTableHooks;
