import { useState, useRef } from "react";
import InputGroup from "../common/form/bootstrapInput";
import Select from "../common/form/bootstrapSelect";
import SimpleReactValidator from "simple-react-validator";

function useFormControl(schema, controllers, doSubmit) {
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formGroup, setStateFormGroup] = useState(schema);
    const [errorMessages, setStateSimpleValidators] = useState({});

    const handleChange = (e) => {
        const clone = { ...formGroup };
        const current = e.target;

        if (current.type === "checkbox") {
            clone[current.name] = current.checked;
        } else if (current.type === "select-one") {
            clone[current.name] = JSON.parse(current.value);
        } else {
            clone[current.name] = current.value;
        }

        setStateFormGroup(clone);
    };

    const handleBlur = (currentField, value, validators) => {
        validateOnEvent(validators, currentField, value);
    };

    const handleSubmit = (e) => {
        const { current } = simpleValidator;
        e.preventDefault();
        validateOnSubmit();

        if (current.allValid()) {
            doSubmit();
        } else {
            const clone = { ...current.errorMessages };
            setStateSimpleValidators(clone);
        }
    };

    return [formGroup, handleChange, handleBlur, handleSubmit, errorMessages];

    function validateOnEvent(validators, currentField, value) {
        const { current } = simpleValidator;
        if (validators.length) {
            current.message(currentField, value, validators[0]);
        }

        if (!current.fieldValid(currentField)) {
            current.showMessageFor(currentField);
        } else {
            current.hideMessageFor(currentField);
        }

        const clone = { ...current.errorMessages };
        setStateSimpleValidators(clone);
    }

    function validateOnSubmit() {
        const result = Object.keys(formGroup).map((key) => {
            return {
                [key]: formGroup[key],
            };
        });

        for (let i = 0; i < result.length; i++) {
            const { validators } = controllers[i];
            const obj = result[i];
            let ctrlName;
            let value;

            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    value = obj[key];
                    ctrlName = key;
                }
            }

            if (validators.length) {
                simpleValidator.current.message(ctrlName, value, validators[0]);
            }
        }
    }
}

function renderInput(
    controller,
    handleChange,
    handleBlur,
    formGroup,
    errorMessages
) {
    const { label, name, validators, type } = controller;
    return (
        <InputGroup
            label={label}
            name={name}
            value={formGroup[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            type={type}
            validators={validators}
            errorMessages={errorMessages[name]}
        />
    );
}

function renderSelect(
    controller,
    handleChange,
    formGroup,
    valueProp,
    textProp
) {
    const { label, name, options, validators, type } = controller;

    return (
        <Select
            options={options}
            textProp={textProp}
            valueProp={valueProp}
            value={formGroup[name]}
            onChange={handleChange}
            label={label}
            name={name}
            type={type}
            validators={validators}
        />
    );
}

function renderButton(label, formGroup, errorMessages) {
    // this check nested obj too!
    const isFormEmpty = Object.values(formGroup)
        .filter((item) => item !== "")
        .map((element) => !Object.values(element).some((obj) => obj !== ""))
        .filter((x) => x === false);

    const isErrMessagesEmpty = !Object.values(errorMessages).some(
        (item) => item !== "" && item !== null
    );

    return (
        <button
            type="submit"
            className="btn btn-primary m-3"
            disabled={!isFormEmpty.length || !isErrMessagesEmpty}
        >
            {label}
        </button>
    );
}

const reactiveForm = {
    useFormControl,
    renderInput,
    renderSelect,
    renderButton,
};

export default reactiveForm;
