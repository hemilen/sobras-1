import React, { Component } from 'react';
// import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

// react-md
import {
  Button,
  TextField,
  DatePicker
} from 'react-md';

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = {
      message: 'Por favor informe seu nome completo'
    }
  }

  // if(!values.cellPhone) {
  //   errors.cellPhone = {
  //     message: 'Por favor informe um telefone valido'
  //   }
  // } else if(!/^\+(?:[0-9] ?){6,14}[0-9]$/.test(values.phone)) {
  //   errors.cellPhone = {
  //     message: 'Phone number must be in International format'
  //   }
  // }

  if (!values.email) {
    errors.email = {
      message: 'Informe um email valido'
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      message: 'Email invalido'
    }
  }

  if (!values.birthDate) {
    errors.birthDate = {
      message: 'Informe sua data de nascimento'
    }
  }

  if (!values.password) {
    errors.password = {
      message: 'Informe uma senha'
    }
  }

  return errors;
}

const warn = values => {
  const warnings = {}

  if (values.birthDate) {
    if (values.birthDate.slice(0, 4) > '2000') {
      warnings.birthDate = 'Menor de Idade';

      console.log("menor");

    }
  }

  return warnings
}

const renderField = ({
  id,
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
    // <TextField id="field-2" label="Field 2" placeholder="Multiline text here" rows={2} className="md-cell md-cell--12" /> 

    <div>
      {(type === 'date') ? (
        <div className="md-grid">
          <DatePicker
            id={id}
            {...input}
            label={label}
            errorText={error ? error.message : ''}
            error={(touched && error)}
            lineDirection="center"
            className="md-cell md-cell--12"
            portal
            lastChild
            renderNode={null}
            disableScrollLocking
          />
        </div>
      ) : (
          <TextField
            id={id}
            {...input}
            label={label}
            type={type}
            placeholder={placeholder}
            className="md-cell md-cell--12"
            errorText={error ? error.message : ''}
            error={(touched && error) ? true : false}
          />
        )}
    </div>
  )


class UserForm extends Component {

  componentWillReceiveProps = (nextProps) => { // Load User Asynchronously
    const { user } = nextProps;
    // console.log(user);

    if ((user.id !== this.props.user.id) || (user.id && !this.props.user.id)) { // Initialize form only once
      this.props.initialize(user);
      console.log(user);
      
    }
  }

  render() {
    const { handleSubmit, pristine, submitting, loading, user, reset } = this.props;

    return (

      <div>
        <h1 style={{ marginTop: "1em" }}>{user.id ? 'Edit User' : 'Add New User'}</h1>

        <form onSubmit={handleSubmit} loading={loading}>

          <Field
            id="name"
            name="name"
            type="text"
            component={renderField}
            label="Nome"
            placeholder="Biro-biro da silva"

          />
          <Field
            id="email"
            name="email"
            type="email"
            component={renderField}
            label="Email"
            placeholder="biro-biro@vaicurintia.br"

          />
          <Field
            id="cell"
            name="cellPhone"
            type="tel"
            component={renderField}
            label="Cell"

          />
          <Field
            id="birth"
            name="birthDate"
            type="date"
            component={renderField}
            label="Data de Nascimento"
          />
          <Field
            id="pass"
            name="password"
            type="password"
            component={renderField}
            label="Senha"
          />

          <div>
            <Button flat primary type="submit" disabled={submitting}>
              Submit
            </Button>
            <Button flat secondary type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </Button>
          </div>

        </form>
      </div>
    )
  }
}

export default reduxForm({ form: 'user', validate, warn })(UserForm);
