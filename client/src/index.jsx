import React from 'react';
import ReactDOM from 'react-dom';
import PageApp from './components/App';

ReactDOM.hydrate(<PageApp {...window.propsForRender}/>, document.getElementById('product-detail'), () => console.log('Hydrated!'));
