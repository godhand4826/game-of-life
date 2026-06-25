import React, { Component } from 'react';
import "./Cell.css";

class Cell extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.alive !== this.props.alive
    }

    render() {
        return (<button
            onClick={this.props.toggle}
            onMouseEnter={this.props.onDrag}
            className={"square " + (this.props.alive ? 'alive' : '')}
        >
        </button >);
    }
}

export default Cell;
