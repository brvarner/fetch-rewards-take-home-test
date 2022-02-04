import * as React from 'react';
import Form from '../components/Form';
import Hero from '../components/Hero';

const Home: React.FC<HomeProps> = props => {


    return (
        <main className="container my-5" >
            <Hero />
            <Form
                name={props.name}
                email={props.email}
                password={props.password}
                occupation={props.occupation}
                homeState={props.homeState}
                occOptions={props.occOptions}
                stateOptions={props.stateOptions}
                setName={props.setName}
                setEmail={props.setEmail}
                setPassword={props.setPassword}
                setOccupation={props.setOccupation}
                setHomeState={props.setHomeState}
            />
        </main>
    );
};

interface HomeProps {
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

export default Home;
