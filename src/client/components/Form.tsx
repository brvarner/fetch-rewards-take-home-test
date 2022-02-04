import * as React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
// Using bcrypt library to salt and hash passwords before sending them to API
import bcrypt from 'bcryptjs';

const Form: React.FC<FormProps> = props => {


    // Including a simple email validation function
    const validateEmail = (email) => {
        let re = /^\S+@\S+\.\S+$/;
        return re.test(email);
    };

    // Declaring bcrypt functionality for salting/hashing, to prevent sending plaintext passwords to the server.
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword: string = bcrypt.hashSync(props.password, salt);


    // Event handler for the submit button. Unless the user's name is a certain length, the email is valid (by the function above's standards),
    // the password is a certain length, and the occupation/state have been selected, the user gets a SweetAlert modal 
    // telling them to check the form and try again. 
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (props.name.length >= 1 && validateEmail(props.email) && props.password.length >= 8 && props.occupation.length > 1 && props.homeState.length > 1 && props.occupation != "Occupation" && props.homeState != "State") {
            const data = {
                "name": props.name,
                "email": props.email,
                "password": hashedPassword,
                "occupation": props.occupation,
                "state": props.homeState
            };
            await axios({
                method: 'POST',
                url: 'https://frontend-take-home.fetchrewards.com/form',
                headers: {'content-type': 'application/json'},
                data: JSON.stringify(data),
                validateStatus: () => true
            })
                .then(response => {
                    // After the information is posted to the server, a SweetAlert modal pops up informing the user that 
                    // the operation was successfully completed.
                    if (response.status === 200) {
                        Swal.fire(
                            'Data Submitted!',
                            `You've successfully sent data to the Fetch Rewards API`,
                            'success'
                        )
                        // Resetting the form's dropdowns and clearing the inputs, while also setting all states back to default.
                        document.getElementById('form').reset()
                        props.setName('')
                        props.setEmail('')
                        props.setPassword('')
                        props.setOccupation('')
                        props.setHomeState('')
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        // If an error comes back from the server, a SweetAlert modal pops up informing the user that there was a problem.
                        Swal.fire(
                            'Data Not Submitted!',
                            `There's been an error, please try again`,
                            'error'
                        )
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                        Swal.fire(
                            'Data Not Submitted!',
                            `There's been an error, please try again`,
                            'error'
                        )
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        Swal.fire(
                            'Data Not Submitted!',
                            `There's been an error, please try again`,
                            'error'
                        )
                    }
                    console.log(error.config);
                })
            // If the user has made a mistake while filling out the form, they'll get a specific error message.
            // If they've done more than one error, or there's an error we can't track, they'll get a general message.
        } else if (props.name.length === 0) {
            Swal.fire(
                'Something Went Wrong!',
                `Please enter your name`,
                'error'
            )
            event.preventDefault()
        } else if (props.email.length === 0) {
            Swal.fire(
                'Something Went Wrong!',
                `Please enter your email address`,
                'error'
            )
            event.preventDefault()
        } else if (props.password.length < 8) {
            Swal.fire(
                'Something Went Wrong!',
                `Password must be at least 8 characters long`,
                'error'
            )
            event.preventDefault()
        } else if (props.occupation.length === 0 || props.occupation === "Occupation") {
            Swal.fire(
                'Something Went Wrong!',
                `Please choose an occupation`,
                'error'
            )
            event.preventDefault()
        } else if (props.homeState.length === 0 || props.homeState === "State") {
            Swal.fire(
                'Something Went Wrong!',
                `Please choose your state`,
                'error'
            )
            event.preventDefault()
        } else {
            event.preventDefault()
            // If there's something wrong with the user's form that I didn't account for, they get a SweetAlert modal informing them that they need to
            // make some sort of change.
            Swal.fire(
                'Something Went Wrong!',
                `Check the form and try again`,
                'error'
            )
        }


    }


    return (
        <main className="container my-5 row justify-content-center">
            <div className="card col-5 shadow p-3 mb-5 bg-body rounded">
                <div className="card-body">
                    <form id="form">
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="form-label">Name</label>
                            <input type="name" className="form-control" id="nameInput" value={props.name} onChange={e => props.setName(e.target.value)} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email</label>
                            <input type="email" className="form-control" id="emailInput" value={props.email} onChange={e => props.setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input type="password" className="form-control" id="passwordInput" value={props.password} onChange={e => props.setPassword(e.target.value)} />
                            <div id="passwordHelp" className="form-text">Password must be at least 8 characters long.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="occupationSelect" className="form-label">Select Your Occupation</label>
                            <select className="form-select" aria-label="Default select example" id="occupationSelect" onChange={(e) => props.setOccupation(e.target.value)}>
                                <option defaultValue="true">Occupation</option>
                                {props.occOptions.map((occupation, index) =>
                                    <option key={index} value={`${occupation}`}>{occupation}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stateSelect" className="form-label">Select Your State</label>
                            <select className="form-select" aria-label="Default select example" id="stateSelect" onChange={(e) => props.setHomeState(e.target.value)}>
                                <option defaultValue="true">State</option>
                                {props.stateOptions.map((state, index) =>
                                    <option key={index} value={`${state.name}`}>{state.name}</option>
                                )}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary my-2" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

interface FormProps {
    name: string;
    email: string;
    password: string;
    occupation: string;
    homeState: string;
    occOptions: string[];
    stateOptions: string[];
    setName: (value: string) => string;
    setEmail: (value: string) => string;
    setPassword: (value: string) => string;
    setOccupation: (value: string) => string;
    setHomeState: (value: string) => string;
}

export default Form;