import React, { Component } from 'react';

class Sobras extends Component {
    render() {
        return (
            <div>
                <h2>Lista de Contatos</h2>
                <table>
                    <thead>
                        <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Phone</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.props.contacts.map(contact => {
                            return(
                                <tr key={contact._id}>
                                <td>{contact.name.first}</td>
                                <td>{contact.name.last}</td>
                                <td>{contact.phone}</td>
                                <td>{contact.email}</td>
                                <td>
                                    <button type="button" onClick={() => this.props.fetchContact(contact._id)}>
                                    Edit
                                    </button>
                                </td>
                                <td>
                                    <button type="button" onClick={() => this.props.deleteContact(contact._id)}>
                                    Delete
                                    </button>
                                </td>
                                </tr>
                            )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Sobras;
