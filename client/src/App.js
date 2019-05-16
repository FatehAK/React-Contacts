import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
    //whenever any changes to this state are made React will automatically update the ui
    state = {
        contacts: []
    };

    //get all contacts from server
    //called after the component is rendered
    componentDidMount() {
        ContactsAPI.getAll().then((contacts) => {
            this.setState({ contacts: contacts });
        });
    }

    removeContact = (contact) => {
        //override the state with new value
        this.setState((state) => ({
            //returns a new contacts array that doesen't contain the removed contact
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }));

        //remove contact on server as well
        ContactsAPI.remove(contact);
    };

    addContact = (contact) => {
        ContactsAPI.create(contact).then((contact) => {
            this.setState((state) => ({
                contacts: state.contacts.concat(contact)
            }));
        });
    };

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    //we can pass function like this
                    <ListContacts remove={this.removeContact} contactList={this.state.contacts} />
                )} />
                <Route path="/create" render={({ history }) => (
                    //or like this (both are valid) - use this style if you want to do something after the function has finished executing
                    <CreateContact add={(contact) => {
                        this.addContact(contact);
                        history.push('/');
                    }} />
                )} />
            </div>
        );
    }
}

export default App;
