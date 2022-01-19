import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import routes from '../routes.js';
import { addChannel } from "../slices/channelsSlice.js";
import { addMessage } from "../slices/messagesSlice.js";

const HomePage = () => {
  const [renderedChannelId, setRenderedChannelId] = useState();
  const dispatch = useDispatch();
  const channels = useSelector(({ channels: { entities, ids } }) => (
    ids.map((id) => entities[id])
  ));
  useEffect(async () => {
    try {
      const header = { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userToken')).token}` };
      const response = await axios.get(routes.dataPath(), { headers: header });
      const { channels, messages, currentChannelId } = response.data;
      setRenderedChannelId(currentChannelId);
      for (const channel of channels) {
        dispatch(addChannel({ channel }));
      }
      for (const message of messages) {
        dispatch(addMessage({ message }));
      }
    } catch(err) {
      throw(err);
    }
  }, []);

  const generateChannel = (channel) => {
    const { name, id } = channel;
    return (
      <ListGroup.Item
        key={id}
        as="a"
        className={id === renderedChannelId && 'active'}
      >
        {name}
      </ListGroup.Item>
    );
  };

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-3" style={{'height': '100vh'}}>
          {channels.map(generateChannel)}
        </div>
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
