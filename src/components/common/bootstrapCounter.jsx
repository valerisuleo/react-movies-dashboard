import React from "react";

const BootstrapCounter = (props) => {
    const { value, onBntClick } = props;

    const setBadgeClass = () => {
        let className = "badge bg-";
        className += value === 0 ? "warning" : "secondary";
        return className;
    };

    return (
        <div className="d-flex flex-row bd-highlight mb-3">
            <div className="p-2 bd-highlight">
                <div onClick={() => onBntClick("add")} className="btn btn-primary btn-sm">
                    +
                </div>
            </div>
            <div className="p-2 bd-highlight">
                <div onClick={() => onBntClick("remove")} className="btn btn-danger btn-sm">
                    -
                </div>
            </div>
            <div className="p-2 bd-highlight">
                <div className={setBadgeClass()}>{!value ? "Zero" : value}</div>
            </div>
        </div>
    );
};

export default BootstrapCounter;
