import React from 'react';
import style from './hello-world.scss';

const HelloWorld = ({ title }) => (
 <div className={style.hello}>{`Hello ${title}`}</div>
);

export default HelloWorld;
