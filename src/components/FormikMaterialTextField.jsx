import React from 'react';
import { TextField } from '@material-ui/core';

const FormikMaterialTextField = (props) => {
  // console.log('MaterialFormikTextField--->props', props)

  const {
    field,
    form: { touched, errors },
    ...rest
  } = props;

  return (
    <TextField
      onWheel={(event) => {
        // event.preventDefault();
        event.target.blur();
      }}
      className="material-form__field"
      error={touched[field.name] && errors[field.name]}
      helperText={touched[field.name] && errors[field.name] ? errors[field.name] : ''}
      {...field}
      {...rest}
    />
  );
};

// MaterialFormikTextField.propTypes = {
//   field: PropTypes.shape().isRequired,
//   label: PropTypes.string,
//   form: PropTypes.shape({
//     touched: PropTypes.bool,
//     error: PropTypes.string,
//   }),
//   select: PropTypes.bool,
//   children: PropTypes.arrayOf(PropTypes.element),
// };

// MaterialFormikTextField.defaultProps = {
//   label: '',
//   // meta: null,
//   select: false,
//   children: [],
// };

export default FormikMaterialTextField;
