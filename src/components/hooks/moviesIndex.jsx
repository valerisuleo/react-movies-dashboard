import React, { Fragment, useEffect, useState } from "react";
import { indexAssign } from "../views/movies/utils";
import httpService from "../../services/httpService";
import config from "../../config.json";
import reactiveForm from "./useReactiveForm";

const MoviesCollection = () => {
    const schema = {
        title: "",
        numberInStock: "",
        dailyRentalRate: "",
        liked: "",
        genre: {
            label: "",
            id: "",
            value: "",
        },
    };

    // _______________________________HOOKS_______________________________

    const [controllers, setControllers] = useState([]);
    const [formGroup, handleChange, handleBlur, handleSubmit, errorMessages] =
        reactiveForm.useFormControl(schema, controllers, doSomething);

    useEffect(() => {
        console.clear();
        getFormCtrl();
    }, []);

    // _____________________________API CALLS_____________________________
    const getFormCtrl = async () => {
        const promise = httpService.get(`${config.portAPI}/movies-form`);
        const response = await promise;

        const formControllers = response.data
            .map((el) => {
                return {
                    ...el,
                    index: indexAssign(el.name),
                };
            })
            .sort((a, b) => a.index - b.index);
            console.log('formControllers', formControllers);
        setControllers(formControllers);
    };

    function doSomething() {
        console.log("payload", formGroup);
    }

    // ______________________________MARKUP______________________________
    return (
        <Fragment>
            <div className="row">
                <div className="col-md-9 mx-auto">
                    <form className="px-4" onSubmit={handleSubmit}>
                        <div className="form-group">
                            {controllers.map((ctrl) => (
                                <Fragment key={ctrl.id}>
                                    {ctrl.type === "text" ||
                                    ctrl.type === "checkbox"
                                        ? reactiveForm.renderInput(
                                              ctrl,
                                              handleChange,
                                              handleBlur,
                                              formGroup,
                                              errorMessages
                                          )
                                        : reactiveForm.renderSelect(
                                              ctrl,
                                              handleChange,
                                              formGroup,
                                              "id",
                                              "label"
                                          )}
                                </Fragment>
                            ))}
                        </div>
                        {reactiveForm.renderButton("Submit", formGroup, errorMessages)}
                        <h4>formGroup: {JSON.stringify(formGroup)}</h4>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default MoviesCollection;
