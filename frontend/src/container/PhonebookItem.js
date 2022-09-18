import '../App.css';
import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { UPDATE_USER ,DELETE_USER, GET_USERS } from "../utils/queries";


export default function PhonebookItem(props) {
    
    const [updatePhonebook, { loading, error }] = useMutation(UPDATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    
    const [deletePhonebook, { loading1, error1 }] = useMutation(DELETE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    const [OnEdit, setOnEdit] = useState(false)
    const [user, setUser] = useState({
        name: props.name,
        phone: props.phone
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
    }
    const handleUpdate = () => {
        if (user.name !== "" && user.phone !== "") {
            updatePhonebook({ variables: { id: props.id, user } });
            setOnEdit(false)
            props.searchReset()
        }
    }


    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    if (loading1) return 'Submitting...';
    if (error1) return `Submission error! ${error.message}`;

    if (OnEdit) {
        return (
            <tr>
                <th scope="row" style={{ "lineHeight": "35px" }}>{props.index + 1}</th>
                <td>
                    <input type="text" className="input-phonebook input-edit-phonebook" name="name" value={user.name} onChange={handleInputChange} />
                </td>
                <td>
                    <input type="text" className="input-phonebook input-edit-phonebook" name="phone" value={user.phone} onChange={handleInputChange} />
                </td>
                <td>
                    <button type="submit" className="btn btn-primary" onClick={handleUpdate}>
                        <i className="far fa-check-circle me-2"></i>
                        Save
                    </button>
                    <button type="submit" className="btn btn-warning me-2" style={{ "color": "white" }} onClick={() => setOnEdit(false)}>
                        <i className="fas fa-ban me-2"></i>
                        Cancel
                    </button>
                </td>
            </tr>
        )
    } else {
        return (
            <tr>
                <th scope="row" style={{ "lineHeight": "35px" }}>{props.index + 1}</th>
                <td style={{ "lineHeight": "35px" }}>{props.name}</td>
                <td style={{ "lineHeight": "35px" }}>{props.phone}</td>
                <td>
                    <button type="submit" className="btn btn-success me-2" onClick={() => { setOnEdit(true) }}>
                        <i className="fas fa-pen me-2"></i>
                        Edit
                    </button>
                    <button type="submit" className="btn btn-danger" onClick={() => deletePhonebook({ variables: { id: props.id } }) }>
                        <i className="fas fa-trash-alt me-2"></i>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}
