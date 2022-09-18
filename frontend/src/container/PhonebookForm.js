import '../App.css';
import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_USER, GET_USERS } from '../utils/queries';

export default function PhonebookForm(props) {

    const [createPhonebook, { loading, error }] = useMutation(CREATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });


    const [user, setUser] = useState({
        name: '',
        phone: ''
    })

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.name !== "" && user.phone !== "") {
            createPhonebook({ variables: { user } });
            console.log('add', user)
            setUser({
                name: '',
                phone: ''
            })
        }
    }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className="card form-card">
            <div className="card-header" style={{ "padding": "15px 20px" }}>
                Adding Form
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <label className="fw-bold">
                        Name
                        <input type="text" className="input-phonebook" id="name" name="name" value={user.name} onChange={handleChange} placeholder="name" required />
                    </label>
                    <label className="fw-bold">
                        Phone
                        <input type="text" className="input-phonebook" id="phone" name="phone" value={user.user} onChange={handleChange} placeholder="phone"required />
                    </label>
                    <button type="submit" className="btn btn-success me-2">
                        <i className="far fa-check-circle me-2"></i>
                        Save
                    </button>
                    <button type="button" className="btn btn-warning" style={{ "color": "white" }} onClick={() => props.setOnAdd(false)}>
                        <i className="fas fa-ban me-2"></i>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}
