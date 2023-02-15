import { useState, useEffect, useRef } from "react";
import { colsMaker } from "../common/table/colsMaker";

function useTableHooks(schema, collection, eventEmitter, columns, actions) {
    const [table, setTableState] = useState(schema);
    const prevCollectionRef = useRef(collection);

    useEffect(() => {
        if (collection !== prevCollectionRef.current) {
            const clone = { ...table };
            const cols = colsMaker(collection[0], columns, actions);
            clone.collection = collection;
            clone.cols = cols;
            setTableState(clone);
        }
        prevCollectionRef.current = collection;
    }, [actions, collection, columns, table]);

    const handleClick = (currentItem, event) => {
        eventEmitter({ currentItem, event });
    };
    const handleSelection = (currentMovie, currentCol) => {};

    return [table, handleClick, handleSelection];
}



export default useTableHooks;
