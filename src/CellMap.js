import React, { Component } from 'react';
import Cell from "./Cell";
import "./CellMap.css"

class CellMap extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderCell(x, y) {
        const index = x + this.props.width * y
        return (<Cell
            toggle={(e) => {
                this.props.toggle(index)
            }}
            alive={this.props.cells[index]}
            key={index}
        />)
    }

    render() {
        const width = this.props.width
        const height = this.props.height

        let board = []
        for (let y = 0; y < width; y++) {
            let children = []
            for (let x = 0; x < height; x++) {
                children.push(this.renderCell(x, y))
            }
            board.push(<div className="board-row" key={y}>{children}</div>)
        }

        return (<div className="board">{board}</div>)
    }
}

export default CellMap;
