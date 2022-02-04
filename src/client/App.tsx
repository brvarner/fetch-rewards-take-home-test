import Home from './views/Home';
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const App: React.FC<AppProps> = props => {

	// Initializing the controlled React inputs on the form as empty strings
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	// Initializing the dropdown menu options, which will be sent along with the input data 
	// as empty strings
	const [occupation, setOccupation] = useState<string>('');
	const [homeState, setHomeState] = useState<string>('');

	// Initializing dropdown states, so that they can be set by the axios
	// GET request below. In the rendered form, we map through each index of the array,
	// adding option tags to make them usable in the dropdown 
	const [occOptions, setOccOptions] = useState<string[]>([])
	const [stateOptions, setStateOptions] = useState<string[]>([])

	// Populating occupation dropdown array, then populating home state dropdown array to give the user options to select
	useEffect(() => {
		axios({
			method: 'GET',
			url: 'https://frontend-take-home.fetchrewards.com/form',
			responseType: 'json'
		})
			.then(response => {
				setOccOptions(response.data.occupations);
				setStateOptions(response.data.states);
			})
			.catch(error => {
				console.log(`${error}: Unfortunately, we cannot reach important data at the moment.`);
				alert('Something went wrong! Check your connection or reload the page')
			});
	}, [])
	
	return (
		<Home
		name={name}
		email={email}
		password={password}
		occupation={occupation}
		homeState={homeState}
		occOptions={occOptions}
		stateOptions={stateOptions}
		setName={setName}
		setEmail={setEmail}
		setPassword={setPassword}
		setOccupation={setOccupation}
		setHomeState={setHomeState}
		/>
	);
};

interface AppProps {}

export default App;
