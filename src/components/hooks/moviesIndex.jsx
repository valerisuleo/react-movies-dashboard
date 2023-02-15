import React, { Fragment, useEffect, useState, useCallback } from "react";
import httpService from "../../services/httpService";
import config from "../../config.json";
import BootstrapTable from "../common/table/ bootstrapTable";
import useTableHooks from "./useTable";

const MoviesCollection = () => {
    const stateTable = {
        collection: [],
        itemOnScreen: [],
        actions: [],
        cols: [],
        pageSize: 0,
        sortColumns: {
            path: "title",
            order: "asc",
        },
    };

    // _______________________________HOOKS_______________________________
    const [props, setProps] = useState([]);
    const [table, handleClick, handleSelection] = useTableHooks(
        eventEmitter,
        props,
        stateTable
    );

    // _____________________________API CALLS_____________________________

    const getMovies = useCallback(async () => {
        const promise = httpService.get(`${config.portAPI}/movies`);
        const response = await promise;
        const { data } = response;
        const clone = { ...stateTable };
        clone.collection = data;
        clone.cols = ["title", "numberInStock", "dailyRentalRate"];
        clone.pageSize = 4;
        clone.actions = [
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

        setProps(clone);
    }, []);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    async function deleteMovie(currentMovie) {
        // const result = movies.filter((item) => item.id !== currentMovie.id);
        // // await httpService.delete(`${config.portAPI}/movies/${currentMovie.id}`);
        // setMovies(result);
    }

    function eventEmitter(data) {
        const { currentItem, event } = data;

        if (event.name === "remove") {
            deleteMovie(currentItem);
        }
    }

    // ______________________________MARKUP______________________________
    return (
        <Fragment>
            {/* {JSON.stringify(movies)} */}
            <div className="row mt-4">
                <h2>Movies Dashboard Hooks</h2>
            </div>

            <div className="row p-3">
                <div className="col-3">{/* <BootstrapListGroup /> */}</div>
                <div className="col-9">
                    <BootstrapTable
                        cols={table.cols}
                        collection={table.collection}
                        valueProp={"id"}
                        onBtnClick={handleClick}
                        onSelection={handleSelection}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-9 mx-auto"></div>
            </div>
        </Fragment>
    );
};

export default MoviesCollection;
