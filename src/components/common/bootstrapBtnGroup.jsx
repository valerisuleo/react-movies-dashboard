import React from "react";

const BootStrapBtnGroup = (props) => {
    const { collection, textProp, valueProp, onBtnClick } = props;
    return (
        <div className="btn-group my-2" role="group" aria-label="Basic example">
            {collection.map((item, i) => (
                <button
                    onClick={() => onBtnClick(item)}
                    key={item[valueProp]}
                    type="button"
                    className="btn btn-primary"
                >
                    {item[textProp]}
                </button>
            ))}
        </div>
    );
};

export default BootStrapBtnGroup;
