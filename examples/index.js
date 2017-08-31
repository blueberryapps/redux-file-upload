// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app';


if (module.hot) {
  module.hot.accept('./app', () => {
    console.log('HMR!!!');
  });
}

console.log('index.js');

// ReactDOM.render(<App />, document.getElementById('app'));
