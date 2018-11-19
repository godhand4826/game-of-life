import React, { Component } from 'react';
import "./App.css"
import ControlMenu from "./ControlMenu";
import CellMap from "./CellMap";

class App extends Component {

    constructor(props) {
        super(props);
        this.STATUS = {
            RUNNING: 'RUNNING',
            PAUSED: 'PAUSED',
        }

        this.play = this.play.bind(this)
        this.step = this.step.bind(this)
        this.pause = this.pause.bind(this)
        this.slower = this.slower.bind(this)
        this.faster = this.faster.bind(this)
        this.seed = this.seed.bind(this)
        this.clear = this.clear.bind(this)
        this.toggleCell = this.toggleCell.bind(this)

        this.state = {
            requestID: null,
            status: this.STATUS.PAUSED,
            speed: 80,
            cells: new Array(20 * 20).fill(false),
            width: 20,
            height: 20
        }
    }

    componentDidMount() {
        this.seed()
    }

    step() {
        this.pause()
        this.tick()
    }

    tick() {
        const width = this.state.width
        const height = this.state.height
        const size = width * height
        const old_cells = this.state.cells
        let new_cells = new Array(size).fill(false)

        function countLiveNeighbor(cells, index) {
            let live_neighbor = 0
            if (index % width !== 0) { // left edge
                cells[index - width - 1] && live_neighbor++
                cells[index - 1] && live_neighbor++
                cells[index + width - 1] && live_neighbor++
            }
            if (index % width !== width - 1) { // right edge
                cells[index - width + 1] && live_neighbor++
                cells[index + 1] && live_neighbor++
                cells[index + width + 1] && live_neighbor++
            }
            cells[index - width] && live_neighbor++
            cells[index + width] && live_neighbor++

            return live_neighbor
        }

        old_cells.map((cell, index) => {
            // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
            // Any live cell with two or three live neighbors lives on to the next generation.
            // Any live cell with more than three live neighbors dies, as if by overpopulation.
            if (cell === true) {
                const live = countLiveNeighbor(old_cells, index)
                if (live < 2) {
                    new_cells[index] = false
                } else if (live === 2 || live === 3) {
                    new_cells[index] = true
                } else if (live > 3) {
                    new_cells[index] = false
                }
                // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            } else if (cell === false) {
                const live = countLiveNeighbor(old_cells, index)
                if (live === 3) {
                    new_cells[index] = true
                }
            }
            return null
        })

        this.setState({ cells: new_cells })
    }

    play() {
        if (this.state.status === this.STATUS.RUNNING) return;
        const requestAnimationFrame =
            window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame
        let pastFrame = 0;
        const tickLoop = () => {
            if (this.state.status === this.STATUS.RUNNING) {
                if (100 - this.state.speed <= pastFrame) {
                    this.tick()
                    pastFrame = 0
                } else {
                    pastFrame = (pastFrame + 1) % 100
                }

                requestAnimationFrame(tickLoop)
            }
        }
        const requestID = requestAnimationFrame(tickLoop)
        this.setState({
            requestID: requestID,
            status: this.STATUS.RUNNING
        })
    }

    pause() {
        const cancelAnimationFrame =
            window.cancelAnimationFrame
            || window.mozCancelAnimationFrame
        cancelAnimationFrame(this.state.requestID)
        this.setState({
            requestID: null,
            status: this.STATUS.PAUSED
        })
    }

    slower() {
        console.log('slower')
        const current = this.state.speed
        if (current - 10 >= 0) {
            this.setState({ speed: current - 10 })
        }
    }

    faster() {
        console.log('faster')
        const current = this.state.speed
        if (current + 10 <= 100) {
            this.setState({ speed: current + 10 })
        }
    }

    seed() {
        console.log('seed')
        const width = this.state.width
        const height = this.state.height
        const size = width * height
        const cells = new Array(size).fill().map(() => Math.random() > 0.75)
        this.setState({ cells: cells })
    }

    clear() {
        console.log('clear')
        const width = this.state.width
        const height = this.state.height
        const size = width * height
        this.setState({ cells: new Array(size).fill(false) })
    }

    toggleCell(index) {
        // console.log('toggleCell ' + index)
        let cells = this.state.cells.slice()
        cells[index] = !cells[index]
        this.setState({ cells: cells })
    }


    render() {
        return (<div className="app">
            <ControlMenu
                status={this.state.status}
                speed={this.state.speed}
                play={this.play}
                step={this.step}
                pause={this.pause}
                faster={this.faster}
                slower={this.slower}
                seed={this.seed}
                clear={this.clear}
            />
            <CellMap
                toggle={this.toggleCell}
                cells={this.state.cells}
                width={this.state.width}
                height={this.state.height}
            />
        </div>);
    }
}

export default App;