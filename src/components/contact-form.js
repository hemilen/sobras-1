import React, { Component } from 'react';
// import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {name:{}};

  if(!values.name || !values.name.first) {
    errors.name.first = {
      message: 'You need to provide First Name'
    }
  }
  if(!values.phone) {
    errors.phone = {
      message: 'You need to provide a Phone number'
    }
  } else if(!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.phone)) {
    errors.phone = {
      message: 'Phone number must be in International format'
    }
  }
  if(!values.email) {
    errors.email = {
      message: 'You need to provide an Email address'
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      message: 'Invalid email address'
    }
  }
  return errors;
}

const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error.message}</span>) ||
          (warning && <span>{warning.message}</span>))}
    </div>
  </div>
)


class ContactForm extends Component {

  componentWillReceiveProps = (nextProps) => { // Load Contact Asynchronously
    const { contact } = nextProps;
    if(contact._id !== this.props.contact._id) { // Initialize form only once
      this.props.initialize(contact)
    }
  }

  // renderField = ({ input, label, type, meta: { touched, error } }) => (
  //   <form>
  //     <label>{label}</label>
  //     <input {...input} placeholder={label} type={type}/>
  //     {touched && error && <span className="error">{error.message}</span>}
  //   </form>
  // )

  render() {
    const { handleSubmit, pristine, submitting, loading, contact, reset } = this.props;

    return (

      <div>
        <h1 style={{marginTop:"1em"}}>{contact._id ? 'Edit Contact' : 'Add New Contact'}</h1>
        
        <form onSubmit={handleSubmit} loading={loading}>
          
          <Field 
            name="name.first" 
            type="text" 
            component={renderField} 
            label="First Name"
          />

          <Field name="name.last" type="text" component={renderField} label="Last Name"/>
    
          <Field name="phone" type="text" component={renderField} label="Phone"/>
          <Field name="email" type="text" component={renderField} label="Email"/>
          <div>
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>

        </form>
      </div>
    )
  }
}

export default reduxForm({form: 'contact', validate})(ContactForm);
