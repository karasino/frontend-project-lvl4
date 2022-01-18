import React, { useEffect } from "react";
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import routes from '../routes.js';

const HomePage = () => {
  useEffect(async () => {
    const header = { Authorization: `Basic ${localStorage.getItem('userToken')}` };
    const response = await axios.get('/api/v1/data', { headers: header });
    console.log(response.data);
  }, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-3" style={{'height': '100vh'}}>Channels list</div>
				<div className="col-sm-9">
					<div className="row">
						<div className="col-sm-12" style={{'height': '60vh'}}>Chat window</div>
						<div className="col-sm-12" style={{'height': '40vh'}}>Message form</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
