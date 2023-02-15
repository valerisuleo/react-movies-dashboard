import { useState, useEffect, useRef } from "react";
import { colsMaker } from "../common/table/colsMaker";

function useTableHooks(eventEmitter, props, state) {
    const { collection, cols, actions } = props;
    const [table, setTable] = useState(state);
    const prevCollectionRef = useRef(props.collection);

    useEffect(() => {
        if (collection !== prevCollectionRef.current) {
            const clone = { ...table };
            clone.collection = collection;
            clone.cols = colsMaker(collection[0], cols, actions);
            setTable(clone);
        }
        prevCollectionRef.current = collection;
    }, [actions, collection, cols, table]);

    const handleClick = (currentItem, event) => {
        eventEmitter({ currentItem, event });
    };
    const handleSelection = (currentMovie, currentCol) => {};

    return [table, handleClick, handleSelection];
}

export default useTableHooks;
