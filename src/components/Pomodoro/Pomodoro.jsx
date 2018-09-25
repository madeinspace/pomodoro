import React, { Component } from 'react';
import style from './Pomodoro.scss';
import { timerState, modes } from './constants';

const countDownSpeed = 10;

class Pomodoro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workTimeBlock: this.getDurationInMs(5),
            breakTimeBlock: this.getDurationInMs(5),
            currentTime: 0,
            timerState: timerState.NOT_SET,
            pomodoroCount: 0,
            mode: modes.WORK,
        };
    }

    componentDidMount() {
        const { workTimeBlock } = this.state;
        this.setState({
            currentTime: workTimeBlock,
        });
    }

    getDurationInMs = min => min * 60 * 1000;
    
    formatTime = (ms) => {
        const min = Math.floor(ms / 60000);
        const sec = (ms / 1000) % 60;
        return `${min < 10 ? '0' : ''}${min} : ${sec < 10 ? '0' : ''}${sec}`;
    }

    handleClick = () => {
        this.state.timerState === 'NOT_SET' ? this.tick() : this.reset();
    }

    reset = () => {
        console.log('reset');
        const { workTimeBlock } = this.state;
        clearInterval(this.timer);
        this.setState({
            currentTime: workTimeBlock,
            timerState: timerState.COMPLETE,
        });
    }

    tick = () => {
        this.setState({ timerState: timerState.RUNNING });
        this.timer = setInterval(this.countdown, countDownSpeed);
    }

    handleTimerComplete = () => {
        this.reset();
        const { pomodoroCount, mode } = this.state;
        const isLongBreak = pomodoroCount % 2 === 1;
        const newState = {...this.state};

        if (mode === 'WORK') {
            newState.mode = isLongBreak ? modes.LONG_BREAK : modes.BREAK;
            newState.currentTime = this.getDurationInMs(isLongBreak ? 10 : 5);
            newState.pomodoroCount = pomodoroCount + 1;
        }
        else {
            newState.mode = modes.WORK;
            newState.currentTime = newState.workTimeBlock;
        }

        this.setState(newState, () => {
            this.tick();
        });
    }

    countdown = () => {
        const { currentTime } = this.state;
        if (currentTime - 1000 < 0) {
            this.handleTimerComplete();
            return;
        }

        this.setState(state => ({
            currentTime: state.currentTime - 1000,
        }));
    }


    render() {
        const { currentTime, mode, pomodoroCount } = this.state;
        return (
            <div className={style.pomodoro}>
                <h1>{mode}</h1>
                <h2>Pomodoro count: {pomodoroCount}</h2>
                <div className={style.clock}>
                    <div className={style.circle}>
                        <div className={style.aligner}>
                            <h1>{this.formatTime(currentTime)}</h1>
                        </div>
                    </div>
                    <button className={style.actions} type="button" onClick={this.handleClick}>Start</button>
                </div>
            </div>
        );
    }
}

export default Pomodoro;
