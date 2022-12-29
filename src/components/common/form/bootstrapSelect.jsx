import React from "react";

const Select = (props) => {
    const { options, textProp, valueProp, onChange, label, name, type, value } = props;

    return (
        <div className="my-3">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <select
                onChange={onChange}
                defaultValue={JSON.stringify(value)}
                className="form-control"
                name={name}
                type={type}
            >
                {options.map((item) => (
                    <option key={item[valueProp]} value={JSON.stringify(item)}>
                        {item[textProp]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
