import React, { Fragment } from "react";
import { paginate } from "../../common/pagination/paginate";
import { colsMaker } from "../../common/table/colsMaker";
import { sorting } from "../../common/table/sorting";
import { indexAssign } from "./utils";

import BootstrapTable from "../../common/table/ bootstrapTable";
import BootstrapListGroup from "../../common/bootstrapList";
import BootstrapPagination from "../../common/pagination/bootstrapPagination";
import Form from "../../common/form/formContainer";

import withRouter from "../../../routers/withRouter";
import httpService from "../../../services/httpService";
import * as utils from "../../common/utils";
import config from "../../../config.json";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class MoviesIndex extends Form {
    state = {
        movies: [],
        moviesOnScreen: [],
        moviesLength: 0,
        genres: [],
        colsName: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" },
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
        isOpen: false,
    };

    async componentDidMount() {
        console.clear();
        const response = await this.getMovies();
        const formCtrl = await this.getFormCtrl();

        this.getGenres(response);
        this.setTable(response);
        this.getFormCtrl();

        this.setState({
            movies: response,
            moviesLength: response.length,
            moviesOnScreen: sorting(
                paginate(response, 1, 4),
                this.state.sortColumn.path,
                this.state.sortColumn.order
            ),
            formControllers: formCtrl,
        });
    }

    async getFormCtrl() {
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
        return formControllers;
    }

    async getMovies() {
        const promise = httpService.get(`${config.portAPI}/movies`);
        const response = await promise;
        return response.data;
    }

    async createMovie(payload) {
        const promise = httpService.post(`${config.portAPI}/movies`, payload);
        const response = await promise;
        const movies = [response.data, ...this.state.movies];
        const moviesOnScreen = sorting(
            paginate(movies, this.state.currentPage, 4),
            this.state.sortColumn.path,
            this.state.sortColumn.order
        );
        this.setState({ moviesOnScreen, movies });
    }

    async deleteMovie(currentMovie) {
        const movies = this.state.movies.filter(
            (item) => item.id !== currentMovie.id
        );
        const moviesOnScreen = paginate(movies, this.state.currentPage, 4);
        await httpService.delete(`${config.portAPI}/movis/${currentMovie.id}`);
        this.setState({ moviesOnScreen, movies });
    }

    doSubmit(payload) {
        this.createMovie(payload);
    }

    getGenres(movies) {
        let genres = movies
            .reduce((acc, current) => {
                const match = acc.find(
                    (item) => item.genre.id === current.genre.id
                );
                if (!match) {
                    acc.push(current);
                }
                return acc || [];
            }, [])
            .map((el) => {
                return {
                    ...el.genre,
                    isActive: false,
                };
            });

        genres = [
            { id: "", label: "All Genres", value: "all", isActive: true },
            ...genres,
        ];
        this.setState({ genres });
    }

    setTable(movies) {
        const obj = movies[0];
        const cols = ["title", "numberInStock", "dailyRentalRate"];
        const actions = [
            {
                name: "edit",
                label: "edit",
                className: "btn btn-sm btn-primary",
            },
            {
                name: "remove",
                label: "delete",
                className: "btn btn-sm ms-1 btn-danger",
            },
        ];
        const colsName = colsMaker(obj, cols, actions);
        this.setState({ colsName });
    }

    handlePageChange = (currentPage) => {
        const moviesOnScreen = sorting(
            paginate(this.state.movies, currentPage, 4),
            this.state.sortColumn.path,
            this.state.sortColumn.order
        );
        this.setState({ currentPage, moviesOnScreen });
    };

    handleFilter = (collection) => {
        let movies;
        const currentGenre = collection.find((item) => item.isActive);

        if (currentGenre.value === "all") {
            movies = paginate(this.state.movies, 1, 4);
        } else {
            movies = this.state.movies.filter(
                (item) => item.genre.id === currentGenre.id
            );
        }

        this.setState({
            moviesOnScreen: sorting(
                movies,
                this.state.sortColumn.path,
                this.state.sortColumn.order
            ),
            moviesLength:
                currentGenre.value === "all"
                    ? this.state.movies.length
                    : movies.length,
        });
    };

    handleClick = (currentMovie, currentBtn) => {
        if (currentBtn.name === "remove") {
            this.deleteMovie(currentMovie);
        } else {
            utils.navigateTo(
                this.props,
                `/movies/${currentMovie.id}/edit`,
                currentMovie
            );
        }
    };

    handleSelection = (currentMovie, currentCol) => {
        if (currentCol.key !== "actions") {
            utils.navigateTo(
                this.props,
                `/movies/${currentMovie.id}`,
                currentMovie
            );
        }
    };

    handleSorting = (current) => {
        const { moviesOnScreen, sortColumn } = this.state;
        const clone = { ...this.state.sortColumn };
        clone.order = sortColumn.order === "asc" ? "desc" : "asc";
        clone.path = current.key;
        const sorted = sorting(moviesOnScreen, current.key, clone.order);
        this.setState({ moviesOnScreen: sorted, sortColumn: clone });
    };

    handleToggle = () => {
        this.setState((currentValue) => ({
            isOpen: !currentValue.isOpen,
        }));
    };

    render() {
        const {
            pageSize,
            currentPage,
            moviesOnScreen,
            genres,
            colsName,
            moviesLength,
            formControllers,
            formGroup,
            isOpen,
        } = this.state;

        return (
            <Fragment>
                <ToastContainer></ToastContainer>

                <div className="row mt-4">
                    <h2>Movies Dashboard</h2>
                </div>

                <div className="row p-3">
                    <div className="col-3">
                        <div className="mt-4">
                            <BootstrapListGroup
                                collection={genres}
                                textProp={"label"}
                                valueProp={"id"}
                                defaultValue={"all"}
                                onItemSelection={this.handleFilter}
                            />
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Add movie to catalog
                                </h5>

                                <button
                                    onClick={this.handleToggle}
                                    className="btn btn-primary btn-sm"
                                >
                                    {isOpen ? "Hide form" : "Show form"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-9">
                        <BootstrapTable
                            cols={colsName}
                            collection={moviesOnScreen}
                            valueProp={"id"}
                            onBtnClick={this.handleClick}
                            onSort={this.handleSorting}
                            onSelection={this.handleSelection}
                        />
                        <BootstrapPagination
                            itemsCount={moviesLength}
                            pageSize={pageSize}
                            onBtnClick={this.handlePageChange}
                            currentPage={currentPage}
                            collection={moviesOnScreen}
                        />
                    </div>
                </div>
                {isOpen ? (
                    <form className="px-4" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            {formControllers.map((controller) => (
                                <Fragment key={controller.id}>
                                    {controller.type === "text" ||
                                    controller.type === "checkbox" ? (
                                        <div>
                                            {this.renderInput(controller)}
                                        </div>
                                    ) : (
                                        <div>
                                            {this.renderSelect(
                                                controller,
                                                "id",
                                                "label"
                                            )}
                                        </div>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                        {this.renderBtn("Submit")}
                        <h4>formGroup: {JSON.stringify(formGroup)}</h4>
                    </form>
                ) : null}
            </Fragment>
        );
    }
}

export default withRouter(MoviesIndex);
