import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { io } from 'socket.io-client';
import * as _ from 'lodash';
import routes from '../routes.js';
import { addChannel } from "../slices/channelsSlice.js";
import { addMessage } from "../slices/messagesSlice.js";

const HomePage = () => {
  const [renderedChannelId, setRenderedChannelId] = useState();
  const dispatch = useDispatch();
  const socket = io();
  const channels = useSelector(({ channels: { entities, ids } }) => (
    ids.map((id) => entities[id])
  ));
  const userToken = JSON.parse(localStorage.getItem('userToken'));
  useEffect(async () => {
    try {
      console.log(userToken.username);
      const header = { Authorization: `Bearer ${userToken.token}` };
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

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const message = {
        id: _.uniqueId(),
        author: '',
        text: values.message,
      };
    }
  });

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
