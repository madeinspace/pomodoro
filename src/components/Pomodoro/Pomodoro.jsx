import React, { Component } from 'react';
import style from './Pomodoro.scss';
import { timerStates, modes, timeBlocks } from './constants';

const countDownSpeed = 1000;

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workTimeBlock: this.getDurationInMs(timeBlocks.WORK_TIME),
      breakTimeBlock: this.getDurationInMs(timeBlocks.SHORT_BREAK_TIME),
      currentTime: 0,
      timerState: timerStates.NOT_SET,
      pomodoroCount: 0,
      mode: modes.IDLE,
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
  };

  handleClick = () => {
    const { timerState, mode } = this.state; // eslint-disable-line no-shadow
    this.setState({ mode: mode === modes.IDLE ? modes.WORK : modes.IDLE });
    timerState === timerStates.NOT_SET ? this.tick() : this.reset();
  };

  reset = () => {
    const { workTimeBlock } = this.state;
    clearInterval(this.timer);
    this.setState({
      currentTime: workTimeBlock,
      timerState: timerStates.NOT_SET,
      mode: modes.IDLE,
    });
  };

  tick = () => {
    this.setState({
        timerState: timerStates.RUNNING,
    });
    this.timer = setInterval(this.countdown, countDownSpeed);
  };

  handleTimerComplete = () => {
    const { pomodoroCount, mode, breakTimeBlock } = this.state;
    const isLongBreak = pomodoroCount % 2 === 1;
    const newState = { ...this.state };
    clearInterval(this.timer);

    if (mode === 'WORK') {
      newState.mode = isLongBreak ? modes.LONG_BREAK : modes.BREAK;
      newState.currentTime = isLongBreak ? breakTimeBlock * 2 : breakTimeBlock;
      newState.pomodoroCount = pomodoroCount + 1;
    } else {
      newState.mode = modes.WORK;
      newState.currentTime = newState.workTimeBlock;
    }

    this.setState(newState, () => {
      this.tick();
    });
  };

  countdown = () => {
    const { currentTime } = this.state;
    if (currentTime - 1000 < 0) {
      this.handleTimerComplete();
      return;
    }

    this.setState(state => ({
      currentTime: state.currentTime - 1000,
    }));
  };

  render() {
    const {
        currentTime,
        mode,
        timerState,
    } = this.state;

    const bgCol = mode === modes.WORK ? style.worktime : style.breaktime;

    return (
      <div className={(mode !== modes.IDLE ? bgCol : '') + ' ' + style.pomodoro}>
        <h1>{mode} time</h1>
        <div className={style.clock}>
          <div className={style.circle}>
            <div className={style.aligner}>
              <h1>{this.formatTime(currentTime)}</h1>
            </div>
          </div>
          <button
            className={style.actions}
            type="button"
            onClick={this.handleClick}>
            {timerState === timerStates.RUNNING ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
