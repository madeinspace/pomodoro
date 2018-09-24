import React, { Component } from 'react';
import style from './Pomodoro.scss';

class Pomodoro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workTimeBlock: 25,
            breakTimeBlock: 5,
        };
    }


    render() {
        return (
            <div className={style.clock}>
                 <div className={style.circle}>
                    <div className={style.aligner}>
                        <h1>25:00</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pomodoro;
