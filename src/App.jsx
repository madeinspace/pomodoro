import React from 'react';
import { hot } from 'react-hot-loader';
import Pomodoro from './components/Pomodoro/Pomodoro.jsx';
import './scss/main.scss';

const App = () => <Pomodoro />;

export default hot(module)(App);
