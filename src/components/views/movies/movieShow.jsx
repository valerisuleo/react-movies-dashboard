import React, { Component } from "react";
import withRouter from "../../../routers/withRouter";

class MovieShow extends Component {
    state = {};

    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return <h1>Show</h1>;
    }
}

export default withRouter(MovieShow);
