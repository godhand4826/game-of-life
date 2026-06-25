import React, { Component } from 'react';
import Cell from "./Cell";
import "./CellMap.css"

class CellMap extends Component {
    constructor(props) {
        super(props);
        this.state = { isMouseDown: false }
        this.lastTouchIndex = -1
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleTouchStart = this.handleTouchStart.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchEnd = this.handleTouchEnd.bind(this)
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

    handleTouchStart(e) {
        e.preventDefault()
        this.lastTouchIndex = -1
        const touch = e.touches[0]
        const el = document.elementFromPoint(touch.clientX, touch.clientY)
        if (el && el.dataset.index !== undefined) {
            const index = parseInt(el.dataset.index)
            this.props.toggle(index)
            this.lastTouchIndex = index
        }
    }

    handleTouchMove(e) {
        e.preventDefault()
        const touch = e.touches[0]
        const el = document.elementFromPoint(touch.clientX, touch.clientY)
        if (el && el.dataset.index !== undefined) {
            const index = parseInt(el.dataset.index)
            if (index !== this.lastTouchIndex) {
                this.props.toggle(index)
                this.lastTouchIndex = index
            }
        }
    }

    handleTouchEnd() {
        this.lastTouchIndex = -1
    }

    renderCell(x, y) {
        const index = x + this.props.width * y
        return (<Cell
            toggle={() => this.props.toggle(index)}
            onDrag={() => { if (this.state.isMouseDown) this.props.toggle(index) }}
            index={index}
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

        return (<div
            className="board"
            onMouseDown={this.handleMouseDown}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
        >{board}</div>)
    }
}

export default CellMap;
