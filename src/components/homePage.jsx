import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import socket from '../service/socket.js';
import routes from '../routes.js';
import { addChannel } from "../slices/channelsSlice.js";
import { addMessage } from "../slices/messagesSlice.js";

const MessageForm = ({ formik }) => (
  <Form onSubmit={formik.handleSubmit}>
    <Form.Group>
      <Form.Control
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
        contentEditable
        placeholder="message"
        name="message"
        id="message"
        autoComplete="message"
      />
    </Form.Group>
    <Button type="submit">Send</Button>
  </Form>
);

const HomePage = () => {
  const [renderedChannelId, setRenderedChannelId] = useState();
  const dispatch = useDispatch();
  const channels = useSelector(({ channels: { entities, ids } }) => (
    ids.map((id) => entities[id])
  ));
  const userToken = JSON.parse(localStorage.getItem('userToken'));
  useEffect(async () => {
    try {
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
      socket.on('newMessage', (message) => {
        dispatch(addMessage({ message }));
      });
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
        author: userToken.username,
        text: values.message,
        channelId: renderedChannelId,
      };
      socket.emit('newMessage', message, (response) => {
        if (response.status !== 'ok') {
          console.log('Message was not recieved by server');
        }
      });
    },
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
						<div className="col-sm-12" style={{'height': '40vh'}}><MessageForm formik={formik}/></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
