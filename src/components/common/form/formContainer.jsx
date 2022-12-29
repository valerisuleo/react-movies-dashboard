import { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import InputGroup from "./bootstrapInput";
import Select from "./bootstrapSelect";
import state from "./state";

class Form extends Component {
    state = state;

    constructor() {
        super();
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    }

    // _________________________ADD VALIDATORS_________________________
    validateOnEvent(currentField, value, validators) {
        if (validators.length) {
            this.validator.message(currentField, value, validators[0]);
        }
        if (!this.validator.fieldValid(currentField)) {
            this.validator.showMessageFor(currentField);
        } else {
            this.validator.hideMessageFor(currentField);
        }
    }

    validateOnSubmit(formGroup) {
        const result = Object.keys(formGroup).map((key) => {
            return {
                [key]: formGroup[key],
            };
        });

        for (let i = 0; i < result.length; i++) {
            const { validators } = this.state.formControllers[i];
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
                this.validator.message(ctrlName, value, validators[0]);
            }
        }
    }

    // ________________________HANDLE EVENTS________________________
    handleChange = (e) => {
        const formGroup = { ...this.state.formGroup };
        const current = e.target;
        const currentCtrl = this.state.formControllers.find((ctrl) => ctrl.name === current.name);
        this.validateOnEvent(current.name, current.value, currentCtrl.validators);

        if (current.type === "checkbox") {
            formGroup[current.name] = current.checked;
        } else if (current.type === "select-one") {
            formGroup[current.name] = JSON.parse(current.value);
        } else {
            formGroup[current.name] = current.value;
        }

        this.setState({ formGroup });
    };

    handleBlur = (currentField, value, validators) => {
        this.validateOnEvent(currentField, value, validators);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.validateOnSubmit(this.state.formGroup);
        if (this.validator.allValid()) {
            this.doSubmit(this.state.formGroup);
        } else {
            this.validator.showMessages();
        }
    };

    // _____________________RENDER HTML ELEMENTS_____________________
    renderInput(controller) {
        const { formGroup } = this.state;
        const { label, name, validators, type } = controller;
        console.log('render');
        return (
            <InputGroup
                label={label}
                value={formGroup[name]}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                name={name}
                type={type}
                validators={validators}
                errorMessages={this.validator.errorMessages[name]}
            />
        );
    }

    renderSelect(controller, valueProp, textProp) {
        const { formGroup } = this.state;
        const { label, name, options, validators, type } = controller;

        return (
            <Select
                options={options}
                textProp={textProp}
                valueProp={valueProp}
                value={formGroup[name]}
                onChange={this.handleChange}
                label={label}
                name={name}
                type={type}
                validators={validators}
            />
        );
    }

    renderBtn(label) {
        const isFormEmpty = !Object.values(this.state.formGroup).some((item) => item !== "");
        const isErrMsgEmpty = !Object.values(this.validator.errorMessages).some(
            (item) => item !== null
        );

        return (
            <button
                type="submit"
                className="btn btn-primary m-3"
                disabled={isFormEmpty || !isErrMsgEmpty}
            >
                {label}
            </button>
        );
    }
}

export default Form;
