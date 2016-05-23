#redux-file-upload

#Motivation

#API
The package exposes the following:

- `actions` - you can use these to implement your own custom logic if you need (i.e. add more dropzones for a single uploader). Check the source code to see what actions are available.
- `reducer` - add this to your composed reducer.
- `FileUpload` - the main component (see its API below).
- `UploadPreview` - used to display simple upload previews, just pass it the file upload's part of store. You are absolutely to free to implement your own logic to display previews if desired.

#FileUpload


#Example

#Upload previews
To show simple upload previews you can either use the `UploadPreview` component provided by this package and pass it the file upload's part of store or you are absolutely to free to implement your own logic to display previews.

#License
MIT 2016
