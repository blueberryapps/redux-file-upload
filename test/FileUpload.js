import FileUpload from '../src/FileUpload.react';
import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

test('Input has the passed ID', t => {
  const id = 'file-upload-id';
  const component = shallow(
    <FileUpload
      url={'api/v1/mock-api'}
      dropzoneId={id}
    />);

  t.is(component.find(`#${id}`).length, 1);
});
