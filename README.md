#redux-file-upload

#Motivation
There aren't any simple yet customizable file uploader packages that would work nicely with Redux. redux-file-upload is here to fill the gap!

#Install
`npm install --save redux-file-upload`

Please note - a middleware that passes `dispatch` to actions, e.g. redux-thunk, redux-promise-middleware, is required for this package to work properly.

#API
The package exposes the following:

- `actions` - you can use these to implement your own custom logic if you need (e.g. add more dropzones for a single uploader). Check the source code to see what actions are available.
- `reducer` - add this to your composed reducer.
- `FileUpload` - the main component (see its API below).
- `UploadingDocument` - an immutable record representing the way a generic document is represented in store.
- `UploadingImage` - an immutable record representing the way an image is represented in store.

#FileUpload API
Below are the props you can pass to the file upload component.

##`allowedFileTypes`
An array with filetypes that can be uploaded using the file upload. There are several that will be recognized automatically as images (jpg, jpeg, png, gif, tiff).

##`className`
The component will be wrapped in a div with this class.

##`data`
Object with any additional data that will be sent along with the files to the endpoint.

##`dropzoneActiveStyle`
Style used when user hovers over the dropzone.

##`dropzoneId` (required)
Each file uploader on the package needs a unique ID. This value is also used as an identifier in the reducer unless the `identifier` prop is specified (see below).

##`identifier`
If specified, uploaded files will be organized in the store using this value. Specifying the same value for multiple file upload components allows you to have multiple dropzones for the same file upload on one page.

##`multiple`
Specifies whether the file upload allows more than one file being added at one time.

##`url` (required)
The URL to which the files will be POSTed.

You can also pass something as children to the component (for example an upload button).

#Example

```jsx
import { FileUpload } from 'redux-file-upload'

<FileUpload
  allowedFileTypes={['jpg', 'pdf']}
  data={{ type: 'picture' }}
  dropzoneId="fileUpload"
  url="https:/url.org/api/docs/upload"
>
  <button>
    Click or drag here
  </button>
</FileUpload>
```

#Browser compatibility
The component should work in all modern browsers including IE11+.

#License
MIT 2016
