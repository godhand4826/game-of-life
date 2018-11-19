import React, { Component } from 'react';
import "./ControlMenu.css"

class ControlMenu extends Component {
    render() {
        return (
            <div className="controlMenu">
                <div className="controlButtons">
                    <button onClick={this.props.play}><div className="play"></div>Play</button>
                    <button onClick={this.props.step}><div className="step"></div>Step</button>
                    <button onClick={this.props.pause}><div className="pause"></div>Pause</button>
                    <button onClick={this.props.seed}><div className="seed"></div>Seed</button>
                    <button onClick={this.props.clear}><div className="clear"></div>Clear</button>
                </div>
                <div className="info">
                    <div className="status">
                        {this.props.status === "PAUSED" ? <div className="pause"></div> : <div className="play"></div>}
                        {this.props.status}
                    </div>
                    <div className="speedControl">
                        <button onClick={this.props.slower}>Slower</button>
                        {this.props.speed}
                        <button onClick={this.props.faster}>Faster</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default ControlMenu;