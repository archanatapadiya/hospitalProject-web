import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { isMobileOnly } from 'react-device-detect';
// import moment from 'moment';
import dayjs from 'dayjs';

const FormikDatePickerField = (props) => {
  // const { fieldName, placeholder, formikBag } = props;
  // const { touched, errors } = formikBag;
console.log('props in formik date', props)
  const { field, form, fieldName, defaultValue, placeholder, minDate, disabled } = props;

  const { touched, errors } = form;

  const name = field.name || fieldName;

  const [date, setDate] = useState(props.defaultValue ? new Date(props.defaultValue) : null);

  let refDate;
  if(props.field.value){
    refDate = dayjs(props.field.value).format('DD-MMM-YYYY');
  }


  const handleChange = (updatedDate) => {
    setDate(updatedDate);
    form.setFieldValue(name, updatedDate);
  };

  const hasError = touched[name] && errors[name];

  return (
    <div className="date-picker date-picker--single">
      <div className={`${hasError ? 'has-error' : ''} bfc-date-from-wrapper`}>
        <DatePicker
          selected={date}
          selectsStart
          onChange={handleChange}
          dateFormat="MMM d, yyyy"
          placeholderText={placeholder || 'select date'}
          dropDownMode="select"
          withPortal={isMobileOnly}
          value={refDate}
          // minDate={new Date()}
          disabled={disabled}
        />
        {touched[name] && errors[name] && <span className="form__form-group-error">{errors[name]}</span>}
      </div>
    </div>
  );
};

export default FormikDatePickerField;
