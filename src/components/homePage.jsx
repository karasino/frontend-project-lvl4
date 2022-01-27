import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { uniqueId } from "lodash";
import socket from '../service/socket.js';
import routes from '../routes.js';
import { addChannel, addChannels } from "../slices/channelsSlice.js";
import { addMessage, addMessages } from "../slices/messagesSlice.js";

const MessageForm = React.forwardRef((props, ref) => {
  const { formik, messageSending } = props;
  return (
    <Form onSubmit={formik.handleSubmit}>
      <fieldset disabled={messageSending}>
        <Form.Group>
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            contentEditable
            placeholder="Type a message"
            name="message"
            id="message"
            autoComplete="message"
            ref={ref}
          />
        </Form.Group>
        <Button type="submit">Send</Button>
      </fieldset>
    </Form>
  );
});

const HomePage = () => {
  const [renderedChannelId, setRenderedChannelId] = useState();
  const [messageSending, setMessageSending] = useState(false);
  const dispatch = useDispatch();
  const messageInputRef = useRef();

  useEffect(async () => {
    messageInputRef.current.focus();
    try {
      const header = { Authorization: `Bearer ${userToken.token}` };
      const response = await axios.get(routes.dataPath(), { headers: header });
      const { channels, messages, currentChannelId } = response.data;
      setRenderedChannelId(currentChannelId);
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
      socket.on('newMessage', (message) => {
        dispatch(addMessage({ message }));
      });
    } catch(err) {
      throw(err);
    }
  }, []);

  const channelsList = useSelector(({ channels: { entities, ids } }) => (
    ids.map((id) => entities[id])
  ));
  const messagesList = useSelector(({ messages: { entities, ids }}) => (
    ids.map((id) => entities[id])
  ));
  const userToken = JSON.parse(localStorage.getItem('userToken'));

  const generateChannel = (channel) => {
    const { name, id } = channel;
  
    const handleChannelChange = () => {
      setRenderedChannelId(id);
    };

    return (
      <ListGroup.Item
        key={id}
        as="a"
        active={renderedChannelId === id}
        onClick={handleChannelChange}
      >
        {name}
      </ListGroup.Item>
    );
  };
  
  const generateMessage = (message) => {
    const { author, text } = message;
    return <ListGroup.Item key={uniqueId()}>{`${author}: ${text}`}</ListGroup.Item>;
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values, actions) => {
      setMessageSending(true);
      const message = {
        author: userToken.username,
        text: values.message,
        channelId: renderedChannelId,
        id: uniqueId('msg_'),
      };
      socket.emit('newMessage', message, (response) => {
        if (response.status !== 'ok') {
          console.log('Message was not recieved by server');
        }
      });
      actions.resetForm();
      setMessageSending(false);
    },
  });

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-3" style={{'height': '100vh'}}>
          <ListGroup>
            {channelsList.map(generateChannel)}
          </ListGroup>
        </div>
				<div className="col-sm-9">
					<div className="row">
						<div className="col-sm-12 overflow-auto" style={{'height': '80vh'}}>
              <ListGroup variant="flush">
                {
                  messagesList
                    .filter(({ channelId }) => channelId === renderedChannelId)
                    .map(generateMessage)
                }
              </ListGroup>
            </div>
						<div
              className="col-sm-12"
              style={{'height': '20vh'}}
            >
              <MessageForm formik={formik} messageSending={messageSending} ref={messageInputRef}/>
            </div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
