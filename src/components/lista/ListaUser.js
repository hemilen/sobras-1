import React, { Component } from 'react';

// react-md
import {
    DataTable,
    TableHeader,
    TableBody,
    TableRow,
    TableColumn
} from 'react-md';

class ListaUser extends Component {
    constructor(props){
        super(props);

        this.state = {
            ascending: false,
            sortedMovies: props.lista
        }
    }

    sort = () => {
        const ascending = !this.state.ascending;
        // const sortedMovies = this.sortedMovies.map(name => (name.slice()));
        // sortedMovies.map(name => (name.reverse()));

        this.setState({ ascending});
    };

    componentWillReceiveProps(newProps){
        if(newProps.lista !== this.props.lista){
            this.setState({sortedMovies: newProps.lista })
        }
    }

    render() {
        const { ascending, sortedMovies } = this.state;

        const rows = sortedMovies.map(({ id, name, email }) => (
            <TableRow key={id}>
                <TableColumn>{name}</TableColumn>
                <TableColumn>{email}</TableColumn>
                <TableColumn>
                    <button type="button" onClick={() => this.props.edit(id)}>
                        Edit
                    </button>
                </TableColumn>
            </TableRow>
        ));
        
        return (
            <DataTable baseId="movies">
                <TableHeader>
                    <TableRow>
                        <TableColumn sorted={ascending} role="button" onClick={this.sort}>
                            Nome
                        </TableColumn>

                        <TableColumn>
                            Email
                        </TableColumn>

 

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows}
                </TableBody>
            </DataTable>
        );
    }
}

export default ListaUser;
