import React from "react";

const BootstrapListGroup = (props) => {
    const { collection, textProp, valueProp, onItemSelection } = props;

    const setActiveClass = (current) => {
        collection
            .filter((el) => el !== current)
            .forEach((item) => (item.isActive = false));
        current.isActive = true;

        return collection;
    };

    return (
        <ul className="list-group my-2">
            {collection.map((item, index) => (
                <li
                    onClick={() => onItemSelection(setActiveClass(item))}
                    className={
                        item.isActive
                            ? "list-group-item active"
                            : "list-group-item"
                    }
                    aria-current="true"
                    key={item[valueProp]}
                >
                    {item[textProp]}
                </li>
            ))}
        </ul>
    );
};

export default BootstrapListGroup;
