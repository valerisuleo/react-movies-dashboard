import { NavLink } from "react-router-dom";

import React, { Component } from "react";

class BootstrapNav extends Component {
    state = {
        links: [],
    };

    componentDidMount() {
        // get links from API
        const links = [
            {
                route: "movies",
                label: "OLD SCHOOL",
            },
            {
                route: "movies-hooks",
                label: "NEW SCHOOL",
            },
            {
                route: "counters",
                label: "Class Counters",
            },
        ];

        this.setState({ links });
    }
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <div>
                        {this.state.links.map((item, i) => (
                            <NavLink
                                key={i}
                                to={`/${item.route}`}
                                className="nav-link me-2 p-3"
                                style={{ display: "inline" }}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>
        );
    }
}

export default BootstrapNav;
