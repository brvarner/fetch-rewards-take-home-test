import * as React from 'react';



const Hero : React.FC<HeroProps> = props => {

	return (
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">Welcome to the Home Page!</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">This project is built with React, Bootstrap, TypeScript, Express, and a little bit of Sass. Please use the form below to submit your information to the Fetch Rewards API.</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            </div>
          </div>
        </div>
	);
};

interface HeroProps {}

export default Hero;