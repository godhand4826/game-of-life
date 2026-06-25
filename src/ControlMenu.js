import React, { Component } from 'react';
import "./ControlMenu.css"

class ControlMenu extends Component {
    render() {
        const isRunning = this.props.status === "RUNNING";
        return (
            <div className="controlMenu">
                <div className="controlButtons">
                    <button onClick={isRunning ? this.props.pause : this.props.play}>
                        {isRunning ? '⏸ Pause' : '▶ Play'}
                    </button>
                    <button onClick={this.props.step}>&gt; Step</button>
                    <button onClick={this.props.seed}>🎲 Random</button>
                    <button onClick={this.props.clear}>✕ Clear</button>
                </div>
                <div className="info">
                    <div className="status">
                        <span className={`status-dot ${isRunning ? 'running' : ''}`}></span>
                        {this.props.status}
                    </div>
                    <div className="speedControl">
                        <button onClick={this.props.slower}>−</button>
                        <span className="speed-value">Speed: {this.props.speed}</span>
                        <button onClick={this.props.faster}>+</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ControlMenu;
