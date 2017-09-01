import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunkExample from './redux-thunk-example';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <ReduxThunkExample />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
