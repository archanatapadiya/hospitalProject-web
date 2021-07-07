import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';


function invoiceField({ file_name,file_url}) {
  return (
    <div className="bfc-table-list-components ">
      <div className="inovice-field" >
      <a target="_blank" href={file_url}>
        {file_name}
      </a>
      
      </div>
    </div>
  );
}

invoiceField.propTypes = {
  invoice_number: PropTypes.string.isRequired,
};

export default invoiceField;
