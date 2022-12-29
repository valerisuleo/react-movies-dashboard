import React, { Component } from "react";
import BootstrapCounter from "../common/bootstrapCounter";

class Counters extends Component {
    state = {
        counters: [
            { id: 1, value: 2 },
            { id: 2, value: 9 },
            { id: 3, value: 0 },
            { id: 4, value: 7 },
        ],
    };

    handleIncrement = (current, actionName) => {
        const clone = [...this.state.counters];
        let result = clone.find((item) => item.id === current.id);
        if (actionName === "add") {
            result.value += 1;
        } else if (result.value > 0) {
            result.value -= 1;
        }

        this.setState({ counters: clone });
    };

    render() {
        const { counters } = this.state;
        return (
            <div className="row">
                <div className="col">
                    <ul style={{ listStyle: "none" }}>
                        {counters.map((counter) => (
                            <li key={counter.id}>
                                {
                                    <BootstrapCounter
                                        value={counter.value}
                                        onBntClick={(actionName) =>
                                            this.handleIncrement(
                                                counter,
                                                actionName
                                            )
                                        }
                                    ></BootstrapCounter>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Counters;
