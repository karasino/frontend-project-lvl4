import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  ListGroup,
  Form,
  Button,
  Nav,
  Modal,
  Dropdown,
  ButtonGroup,
  Stack,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { uniqueId } from "lodash";
import routes from '../routes.js';
import { addChannels } from "../slices/channelsSlice.js";
import { addMessages } from "../slices/messagesSlice.js";
import { openAddChannelModal } from "../slices/modalsSlice.js";
import AddChannelModal from './addChannelModal.jsx';
import useSocket from '../hooks/socket.jsx';

const MessageForm = React.forwardRef((props, ref) => {
  const { formik, messageSending } = props;
  return (
    <Form onSubmit={formik.handleSubmit}>
      <fieldset disabled={messageSending}>
        <Stack direction="horizontal" gap={1}>
          <Form.Control
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            placeholder="Type a message"
            name="message"
            id="message"
            ref={ref}
          />
          <Button type="submit">Send</Button>
        </Stack>
      </fieldset>
    </Form>
  );
});

const HomePage = () => {
  const [renderedChannelId, setRenderedChannelId] = useState();
  const [messageSending, setMessageSending] = useState(false);
  const dispatch = useDispatch();
  const messageInputRef = useRef(null);
  const socket = useSocket();

  useEffect(async () => {
    messageInputRef.current.focus();
    try {
      const header = { Authorization: `Bearer ${userToken.token}` };
      const response = await axios.get(routes.dataPath(), { headers: header });
      const { channels, messages, currentChannelId } = response.data;
      setRenderedChannelId(currentChannelId);
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
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
    const { name, id, removable } = channel;
    const buttonVariant = id === renderedChannelId ? 'primary' : 'outline-primary';
    const handleChannelChange = () => {
      setRenderedChannelId(id);
    };
    const removableChannel = (
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button
          variant={buttonVariant}
          onClick={handleChannelChange}
          className="rounded-0 text-start flex-grow-1"
        >
          <div>{name}</div>
        </Button>
        <Dropdown.Toggle className="rounded-0 flex-grow-0" variant={buttonVariant} />
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">Rename</Dropdown.Item>
          <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
    const fixedChannel = (
    <Button
      variant={buttonVariant}
      onClick={handleChannelChange}
      className="w-100 rounded-0 text-start"
    >
      <div>{name}</div>
    </Button>
    );

    return (
      <Nav.Item key={id}>
        {removable ? removableChannel : fixedChannel}
      </Nav.Item>
    );
  };
  
  const generateMessage = (message) => {
    const { author, text } = message;
    return <ListGroup.Item key={uniqueId()}>{`${author}: ${text}`}</ListGroup.Item>;
  };

  const handleAddChannel = () => {

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
		<div className="d-flex flex-column h-100">
			<div className="row h-100">
				<div className="col-sm-3 h-100">
          <Nav className="flex-column">
            <Stack gap={2}>
              <div className="d-flex justify-content-between">
                <span>Channels</span>
                <Button
                  variant="outline-primary"
                  onClick={() => {dispatch(openAddChannelModal())}}
                >
                  Add
                </Button>
              </div>
              <div>{channelsList.map(generateChannel)}</div>
            </Stack>
          </Nav>
        </div>
				<div className="col-sm-9 h-100">
					<div className="row h-100">
						<div className="col-sm-12 overflow-auto h-100">
              <ListGroup variant="flush">
                {
                  messagesList
                    .filter(({ channelId }) => channelId === renderedChannelId)
                    .map(generateMessage)
                }
              </ListGroup>
            </div>
						<div className="col-sm-12">
              <MessageForm formik={formik} messageSending={messageSending} ref={messageInputRef}/>
            </div>
            <AddChannelModal />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
