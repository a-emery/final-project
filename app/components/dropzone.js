import React from 'react';
import Dropzone from 'react-dropzone';

var DropzoneDemo = React.createClass({
    onDrop: function (files) {
      console.log('Received files: ', files);
    },

    render: function () {
      return (
          <div>
            <Dropzone onDrop={this.onDrop}>
              <div>Upload pictures</div>
            </Dropzone>
          </div>
      );
    }
});

export default DropzoneDemo;
