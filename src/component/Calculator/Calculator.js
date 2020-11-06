import React, { Component } from 'react';
import './Calculator.css';
import Keypad from '../Keypad';
import Result from '../Result';
import Log from '../Log/Log'
import {socket} from '../../socket';

class Calculator extends Component{
    
    constructor(){
        super();

        this.state = {
            result: "",
            log: "",
            logs: []
        }
    }

    componentDidMount() {
        socket.on('newLog', newLog => {
            if(this.state.logs.length >= 10){
                this.setState({logs : this.state.logs.slice(1)});
                this.setState({logs : this.state.logs.concat(newLog.newLog.log)});

            }
            else{
                this.setState({logs : this.state.logs.concat(newLog.newLog.log)});
            }
        })
    }


    onClick = button => {

        if(button === "="){
            this.calculate()
        }

        else if(button === "C"){
            this.reset()
        }
        else if(button === "CE"){
            this.backspace()
        }

        else {
            this.setState({
                result: this.state.result + button,
                log: this.state.log + button
            })
        }
    };

    calculate = () => {
        try {
            this.setState({
                // eslint-disable-next-line
                result: (eval(this.state.result) || "" ) + "",
                log: this.state.log + " = " + (eval(this.state.result) || "" ) + ""
            },
            () => {socket.emit('newLog', this.state.log); this.setState({log: this.state.result})}  )
        } catch (e) {
            this.setState({
                result: "error",
                log: "error"
            })

        }
    };

    reset = () => {
        this.setState({
            result: "",
            log: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1),
            log: this.state.log.slice(0, -1),
        })
    };

    render() {
        return (
            <div>
                <div className="calculator-body">
                    <h1>Simple Calculator</h1>
                    <Result result={this.state.result}/>
                    <Keypad onClick={this.onClick}/>
                    <Log logs={this.state.logs}/>
                </div>
            </div>
        );
    }
}

export default Calculator;