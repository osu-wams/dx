import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const applicationRoot = document.getElementById('root') as HTMLElement;
ReactDOM.render(<App containerElement={applicationRoot} />, applicationRoot);
