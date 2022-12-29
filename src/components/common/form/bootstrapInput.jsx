import React, { Fragment } from "react";

const InputGroup = (props) => {
    const { label, value, onChange, onBlur, name, type, errorMessages, validators } = props;
    return (
        <div className="my-3">
            {type === "checkbox" ? (
                <Fragment>
                    <input
                        className="form-check-input"
                        value={value}
                        onChange={onChange}
                        name={name}
                        type={type}
                    />
                    <label className="form-check-label ms-2" htmlFor={name}>
                        {label}
                    </label>
                </Fragment>
            ) : (
                <Fragment>
                    <label className="form-label" htmlFor={name}>
                        {label}
                    </label>
                    <input
                        value={value}
                        onChange={onChange}
                        onBlur={() => onBlur(name, value, validators)}
                        name={name}
                        type={type}
                        className="form-control"
                    />
                    {errorMessages ? (
                        <div className="alert alert-danger">{errorMessages}</div>
                    ) : null}
                </Fragment>
            )}
        </div>
    );
};

export default InputGroup;
