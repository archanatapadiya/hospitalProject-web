import React, {useState} from 'react';
import { Row } from 'reactstrap';
import Dropzone from 'react-dropzone';
import EditIcon2 from 'mdi-react/SquareEditOutlineIcon';
import * as handlers from './handlers';

const UploadDocument = (props) => {

  const { field, form, entity_type_enum, front_back_enum, fileName, entity_id, attachmentId, attachmentPath, disabled } = props;
  const { name, value, onChange } = field;
  const files = value;
  const onDrop = (onDropFiles) => {
    let val = onDropFiles.map((fl) =>
      Object.assign(fl, {
        preview: URL.createObjectURL(fl),
      }),
    );


    const fileToUpload = val[val.length - 1];

       val[0] = fileToUpload;
    const attachmentIdToPass = props.attachmentId? props.attachmentId : 0
    // const file1 = handlers.handleUpload(val,  entity_type_enum, front_back_enum, entity_id, attachmentIdToPass);


    return form.setFieldValue(name, val);
  };

  return (
    <div>
      <Row>
        <div className="col-md-3">
          <Dropzone
            className="dropzone__input col-md-6"
            accept="image/jpeg, image/png, application/pdf"
            name={name}
            disabled={disabled}
            onDrop={(filesToUpload) => {
              onDrop(value ? value.concat(filesToUpload) : filesToUpload);
            }}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                {!files || files.length === 0}
                <input {...getInputProps()} />
                <div className="drag-block">
                  <Row>
                    <div className="icon-block">
                      <EditIcon2 />
                    </div>
                    <div> Drop file here</div>
                  </Row>
                </div>
              </div>
            )}
          </Dropzone>
        </div>
        {attachmentId ?
        fileName ? <a target="_blank" href={attachmentPath}>
        {fileName}
      </a> : ''  : ''}


        {files && Array.isArray(files) && (
          <div class="row col-md-6" style={{ marginLeft: 12 }}>
            {files.map((file, i) => (
              <div key={file.i}>
                <div class="column">
                  <div class="row">
                    <p>{file.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Row>
    </div>
  );
};

export default UploadDocument;
