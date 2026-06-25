import React, { Component } from 'react';
import Cell from "./Cell";
import "./CellMap.css"

class CellMap extends Component {
    constructor(props) {
        super(props);
        this.state = { isMouseDown: false }
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.handleMouseUp)
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.handleMouseUp)
    }

    handleMouseDown() {
        this.setState({ isMouseDown: true })
    }

    handleMouseUp() {
        this.setState({ isMouseDown: false })
    }

    renderCell(x, y) {
        const index = x + this.props.width * y
        return (<Cell
            toggle={() => this.props.toggle(index)}
            onDrag={() => { if (this.state.isMouseDown) this.props.toggle(index) }}
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

        return (<div className="board" onMouseDown={this.handleMouseDown}>{board}</div>)
    }
}

export default CellMap;
