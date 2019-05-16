import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import sortBy from "sort-by";

//If your component does not keep track of internal state (i.e., all it really has is just a render() method)
//, you can declare the component as a Stateless Functional Component.
//but here we track state so its a Statefull Class Component
class ListContacts extends Component {

    static propTypes = {
        contactList: PropTypes.array.isRequired,
        remove: PropTypes.func.isRequired,
    };

    state = {
        query: ''
    };

    /* Our displayed value will always be the value in the component's state, making our state the "single source of truth".
       Because it is React that ultimately controls the value of our input form element, we consider this component a Controlled Component.

      1. The user enters text into the input field.
      2. An event listener invokes the updateQuery() function on every onChange event.
      3. updateQuery() then calls setState(), merging in the new state to update the component's internal state.
      4. Because its state has changed, the ListContacts component re-renders.
    */
    updateQuery = (query) => {
        //override the query with new value when onChange event occurs
        this.setState({
            query: query.trim()
        });
    };

    //clear query on 'show all'
    clearQuery = () => {
        this.setState({
            query: ''
        });
    };

    render() {
        //using object destructuring
        let { contactList, remove } = this.props;
        let { query } = this.state;

        let filteredContacts;

        //if query is truthy
        if (query) {
            const match = new RegExp(escape(query), 'i');
            filteredContacts = contactList.filter((c) => match.test(c.name));
        } else {
            filteredContacts = contactList;
        }

        //sorting in alphbetical order
        filteredContacts.sort(sortBy('name'));

        //return our UI
        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input className="search-contacts" type="text" placeholder="Search Contacts" onChange={(evt) => this.updateQuery(evt.target.value)} value={query} />
                    <Link to="/create" className="add-contact"></Link>
                </div>
                {(filteredContacts.length !== contactList.length) && (
                    <div className="showing-contacts">
                        <span>Showing {filteredContacts.length} of {contactList.length}</span>
                        <button onClick={() => this.clearQuery()}>Show all</button>
                    </div>
                )}
                <ol className="contact-list">
                    {filteredContacts.map((contact) => (
                        <li key={contact.id} className="contact-list-item">
                            <img className="contact-avatar" src={contact.avatarURL} />
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => remove(contact)} className="contact-remove">Remove</button>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default ListContacts;
