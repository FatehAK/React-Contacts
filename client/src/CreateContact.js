import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serialize from 'form-serialize';

import ImageInput from './ImageInput';

class CreateContact extends Component {

    //handle the form submission
    submitForm(evt) {
        evt.preventDefault();
        let contact = serialize(evt.target, { hash: true });
        this.props.add(contact);
    }

    render() {
        return (
            <div className="CreateContact">
                <Link to="/" className="close-create-contact">Go Back</Link>
                <form onSubmit={(evt) => this.submitForm(evt)} className="create-contact-form">
                    <ImageInput className="create-contact-avatar-input" name="avatarURL" maxHeight={64} />
                    <div className="create-contact-details">
                        <input type="text" name="name" placeholder="Name" />
                        <input type="text" name="email" placeholder="Email" />
                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        );

    }
}

export default CreateContact;
