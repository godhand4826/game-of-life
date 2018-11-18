import React, { Component } from 'react';
class ControlMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <button onClick={this.props.play}>Play</button>
                <button onClick={this.props.step}>Step</button>
                <button onClick={this.props.pause}>Pause</button>
                <button onClick={this.props.slow}>Slow</button>
                <button onClick={this.props.fast}>Fast</button>
                <button onClick={this.props.seed}>Seed</button>
                <button onClick={this.props.clear}>Clear</button>
            </div>
        );
    }
}

export default ControlMenu;