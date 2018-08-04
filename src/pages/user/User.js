import React, { Component } from 'react';

// components
import ListaUser from '../../components/lista/ListaUser';
import UserForm from '../../components/form/UserForm';

// Redux
import { connect } from 'react-redux';
import {
    fetchUsers,
    saveUser,
    fetchUser,
    newUser,
    updateUser
} from '../../actions/user-actions';

import { SubmissionError } from 'redux-form';


// react-md
import {
    Button,
    DialogContainer
  } from 'react-md';


class User extends Component {
    state = {
        visible: false,
    }

    show = () => {
        this.props.newUser();
        this.setState({ visible: true });
    };

    edit = (id) => {
        // Editar
        this.props.fetchUser(id)
        this.setState({ visible: true });
    }
    
    hide = () => {
        this.setState({ visible: false });
    };

    componentDidMount() {
        this.props.fetchUsers();
    }

    submit = (user) => {
        if(!user.id) { // add
          return this.props.saveUser(user)
            .then(response => console.log("Registrado"))
            .catch(err => {
               throw new SubmissionError(this.props.errors)
             })
        } else { // update
          return this.props.updateUser(user)
            .then(response => this.setState({ msg: 'Erro'}))        
            .catch(err => {
               throw new SubmissionError(this.props.errors)
             })
        }
      }

    render() {

        const actions = [{
            id: 'dialog-cancel',
            secondary: true,
            children: 'Cancel',
            onClick: this.hide,
          }, {
            id: 'dialog-ok',
            primary: true,
            children: 'Ok',
            onClick: this.hide,
          }];

        return (
            <div>
                {/* <FormUser /> */}
                <Button flat primary iconChildren="add" onClick={this.show}>New User</Button>
                <Button disabled raised secondary iconChildren="remove">Delete User</Button>

                <ListaUser lista={this.props.users} edit={this.edit}/>


                <DialogContainer
                    id="focus-control-dialog"
                    visible={this.state.visible}
                    actions={actions}
                    onHide={this.hide}                    
                    height="700px"
                    width="600px"
                    title="Form User"
                >
                    {
                        this.props.errors.map((err) => (
                            <span key={err.param}>{err.msg}</span>
                        ))
                    }
                    <UserForm user={this.props.user} onSubmit={this.submit} loading={this.props.loading.toString()} />
                    
                </DialogContainer>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userStore.user,
        users: state.userStore.users,
        loading: state.userStore.loading,
        errors: state.userStore.errors
    }
}

export default connect(mapStateToProps,
    {
        fetchUsers,
        saveUser,
        fetchUser,
        newUser,
        updateUser
    })(User);
