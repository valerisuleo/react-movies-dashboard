// import React, { Fragment, useEffect, useState } from "react";
// import { indexAssign } from "../views/movies/utils";
// import httpService from "../../services/httpService";
// import config from "../../config.json";
// import reactiveForm from "./useReactiveForm";
// import BootstrapTable from "../common/table/ bootstrapTable";
// import reactiveTable from "./useTable";

// const MoviesCollection = () => {
//     const formSchema = {
//         title: "",
//         numberInStock: "",
//         dailyRentalRate: "",
//         liked: "",
//         genre: {
//             label: "",
//             id: "",
//             value: "",
//         },
//     };

//     const tableSchema = {
//         collection: [],
//         itemOnScreen: [],
//         colsName: [],
//         actions: [],
//         pageSize: 4,
//         sortColumns: {
//             path: "title",
//             order: "asc",
//         },
//     };

//     tableSchema.colsName = ["title", "numberInStock", "dailyRentalRate"];
//     tableSchema.actions = [
//         {
//             name: "edit",
//             label: "edit",
//             className: "btn btn-sm btn-primary",
//         },
//         {
//             name: "remove",
//             label: "delete",
//             className: "btn btn-sm ms-1 btn-danger",
//         },
//     ];

//     // _______________________________HOOKS_______________________________
//     const [controllers, setControllers] = useState([]);
//     const [movies, setMovies] = useState([]);
//     // const [genres, setGenres] = useState([]);

//     // ___________________________CUSTMOM HOOKS___________________________
//     const [formGroup, handleChange, handleBlur, handleSubmit, errorMessages] =
//         reactiveForm.useFormControl(formSchema, controllers, doSubmit);
//     const [table, handleClick, handleSelection] = reactiveTable.useTable(
//         tableSchema,
//         movies,
//         doSomething
//     );

//     // console.log("table", table);

//     useEffect(() => {
//         console.clear();
//         getFormCtrls();
//         getMovies();
//     }, []);

//     // _____________________________API CALLS_____________________________
//     async function getFormCtrls() {
//         const promise = httpService.get(`${config.portAPI}/movies-form`);
//         const response = await promise;
//         const formControllers = response.data
//             .map((el) => {
//                 return {
//                     ...el,
//                     index: indexAssign(el.name),
//                 };
//             })
//             .sort((a, b) => a.index - b.index);

//         setControllers(formControllers);
//     }

//     async function getMovies() {
//         const promise = httpService.get(`${config.portAPI}/movies`);
//         const response = await promise;
//         const { data } = response;
//         setMovies(data);
//     }

//     async function deleteMovie(currentMovie) {
//         const result = movies.filter((item) => item.id !== currentMovie.id);

//         console.log('result', result);

//         // await httpService.delete(`${config.portAPI}/movies/${currentMovie.id}`);
//         setMovies(result);
//     }

//     // _______________________________FILTER_______________________________
//     // function getGenres(movies) {
//     //     let list = movies
//     //         .reduce((acc, current) => {
//     //             const match = acc.find(
//     //                 (item) => item.genre.id === current.genre.id
//     //             );
//     //             if (!match) {
//     //                 acc.push(current);
//     //             }
//     //             return acc || [];
//     //         }, [])
//     //         .map((el) => {
//     //             return {
//     //                 ...el.genre,
//     //                 isActive: false,
//     //             };
//     //         });

//     //     list = [
//     //         { id: "", label: "All Genres", value: "all", isActive: true },
//     //         ...list,
//     //     ];
//     //     setGenres(list);
//     //     // console.log("genres", genres);
//     // }

//     // ________________________________MIX________________________________
//     function doSubmit() {
//         // createMovie();
//         console.log("createMovie");
//     }

//     function doSomething(data) {
//         const { currentItem, event } = data;

//         if (event.name === "remove") {
//             deleteMovie(currentItem);
//             console.log("coddio", movies);
//         }
//     }

//     // ______________________________MARKUP______________________________
//     return (
//         <Fragment>
//             {JSON.stringify(movies)}
//             <div className="row mt-4">
//                 <h2>Movies Dashboard Hooks</h2>
//             </div>

//             <div className="row p-3">
//                 <div className="col-3">{/* <BootstrapListGroup /> */}</div>
//                 <div className="col-9">
//                     <BootstrapTable
//                         cols={table.colsName}
//                         collection={table.collection}
//                         valueProp={"id"}
//                         onBtnClick={handleClick}
//                         onSelection={handleSelection}
//                     />
//                     {/* <BootstrapTable
//                         cols={table.colsName}
//                         collection={movies}
//                         valueProp={"id"}
//                         onBtnClick={this.handleClick}
//                         onSort={this.handleSorting}
//                         onSelection={this.handleSelection}
//                     /> */}
//                 </div>
//             </div>
//             <div className="row">
//                 <div className="col-md-9 mx-auto">
//                     {/* <form className="px-4" onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             {controllers.map((ctrl) => (
//                                 <Fragment key={ctrl.id}>
//                                     {ctrl.type === "text" ||
//                                     ctrl.type === "checkbox"
//                                         ? reactiveForm.renderInput(
//                                               ctrl,
//                                               handleChange,
//                                               handleBlur,
//                                               formGroup,
//                                               errorMessages
//                                           )
//                                         : reactiveForm.renderSelect(
//                                               ctrl,
//                                               handleChange,
//                                               formGroup,
//                                               "id",
//                                               "label"
//                                           )}
//                                 </Fragment>
//                             ))}
//                         </div>
//                         {reactiveForm.renderButton(
//                             "Submit",
//                             formGroup,
//                             errorMessages
//                         )}
//                         <h4>formGroup: {JSON.stringify(formGroup)}</h4>
//                     </form> */}
//                 </div>
//             </div>
//         </Fragment>
//     );
// };

// export default MoviesCollection;
