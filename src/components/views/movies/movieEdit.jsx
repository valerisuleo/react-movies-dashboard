import React, { Fragment } from "react";
import withRouter from "../../../routers/withRouter";
import axios from "axios";
import config from "../../../config.json";
import Form from "../../common/form/formContainer";
import { indexAssign } from "./utils";

class MovieEdit extends Form {
    state = {
        formControllers: [],
        formGroup: {
            title: "",
            numberInStock: "",
            dailyRentalRate: "",
            liked: "",
            genre: {
                label: "",
                id: "",
                value: "",
            },
        },
    };

    async componentDidMount() {
        console.clear();
        const promise = axios.get(`${config.portAPI}/movies-form`);
        const response = await promise;
        const formControllers = response.data
            .map((el) => {
                return {
                    ...el,
                    index: indexAssign(el.name),
                };
            })
            .sort((a, b) => a.index - b.index);
        this.formPopulate(this.props);
        this.setState({ formControllers });
    }

    formPopulate(props) {
        const formGroup = { ...this.state.formGroup };
        const { dailyRentalRate, genre, liked, numberInStock, title } = props.location.state.data;

        formGroup.dailyRentalRate = dailyRentalRate;
        formGroup.genre = genre;
        formGroup.liked = liked;
        formGroup.numberInStock = numberInStock;
        formGroup.title = title;
        this.setState({ formGroup });
    }

    doSubmit(payload) {
        console.log("fire PUT", payload);
    }

    render() {
        const { formControllers, formGroup } = this.state;
        return (
            <form className="px-4" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    {formControllers.map((controller) => (
                        <Fragment key={controller.id}>
                            {controller.type === "text" || controller.type === "checkbox" ? (
                                <div>{this.renderInput(controller)}</div>
                            ) : (
                                <div>{this.renderSelect(controller, "id", "label")}</div>
                            )}
                        </Fragment>
                    ))}
                </div>
                {this.renderBtn('Save')}
                <h4>formGroup: {JSON.stringify(formGroup)}</h4>
            </form>
        );
    }
}

export default withRouter(MovieEdit);
