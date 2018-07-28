import React, { Component } from 'react';
import SyncValidationForm from "./form";
import { Values } from "redux-form-website-template";
// import { connect } from 'react-redux';


import showResults from '../../components/showResultJson';

class FormRedux extends Component {
    render() {
        return (           
            <div style={{ padding: 15 }}>
                <h2>Synchronous Validation</h2>
                <SyncValidationForm onSubmit={showResults} />
                <Values form="syncValidation" />
            </div>            
        );
    }
}

export default FormRedux;
