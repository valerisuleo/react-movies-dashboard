import BootstrapNav from "../components/common/bootstapNav";
import Counters from "../components/views/counters";
import MovieShow from "../components/views/movies/movieShow";
import MoviesIndex from "../components/views/movies/movies";
import MovieEdit from "../components/views/movies/movieEdit";
import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MoviesCollection from "../components/hooks/moviesIndex";

const MoviesRouter = () => {
    return (
        <Fragment>
            <BootstrapNav></BootstrapNav>
            <main className="container-fluid">
                <Routes>
                    <Route path="/movies/:id/edit" element={<MovieEdit />} />
                    <Route path="/movies/:id" element={<MovieShow />} />
                    <Route
                        path="/movies"
                        element={<MoviesIndex text={"jello"} />}
                    />
                    <Route path="/counters" element={<Counters />} />
                    <Route path="/movies-hooks" element={<MoviesCollection />} />
                    <Route path="/" element={<Navigate to="/movies" />} />
                </Routes>
            </main>
        </Fragment>
    );
};

export default MoviesRouter;
