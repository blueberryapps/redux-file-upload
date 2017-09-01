import React from 'react';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import fileUploadReducer from '../../src/reducer';
import FileUpload from '../../src/FileUpload.react';

const rootReducer = combineReducers({ fileUpload: fileUploadReducer });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default class ReduxThunkExample extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <h1>Redux thunk example</h1>
          <FileUpload
            allowedFileTypes={['jpg', 'pdf']}
            data={{ type: 'picture' }}
            dropzoneId="fileUpload"
            url={process.env.API_URL}
          >
            <button>
              Click or drag here
            </button>
          </FileUpload>
        </div>
      </Provider>
    );
  }
}
