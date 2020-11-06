import React, {Component} from 'react';
import './Log.css';


class Log extends Component {

    render() {

        let logs = this.props.logs.map((x, index) => {
            return (<li key={index}>{x}</li>)
        })


        return (
            <div className="log">
                <p>{logs}</p>
            </div>
    )
        ;
    }
}


export default Log;