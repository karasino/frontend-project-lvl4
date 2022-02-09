import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import useSocket from '../hooks/socket.jsx';
import { closeAddChannelModal } from '../slices/modalsSlice.js';

const AddChannelModal = () => {
  const [dataSending, setDataSending] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const socket = useSocket();
  const modalIsOpen = useSelector((state) => state.modals.addChannelModalIsOpen);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: (values, actions) => {
      setDataSending(true);
      socket.emit('newChannel', { name: values.channelName }, (response) => {
        if (response.status !== 'ok') {
          console.log('Channel was not added by server');
        }
      });
      actions.resetForm();
      setDataSending(false);
    },
  });

  return (
    <Modal show={modalIsOpen} onHide={() => dispatch(closeAddChannelModal())}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <fieldset disabled={dataSending}>
            <Stack gap={2}>
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.channelName}
                placeholder="Enter new channel"
                name="channelName"
                id="channelName"
                ref={inputRef}
              />
              <Button type="submit" variant="primary">Add</Button>
              <Button variant="secondary" onClick={() => dispatch(closeAddChannelModal())}>Close</Button>
            </Stack>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
  /* return (
    <Form onSubmit={formik.handleSubmit}>
    <fieldset disabled={dataSending}>
      <Stack gap={2}>
        <Form.Control
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.channelName}
          placeholder="Enter new channel"
          name="channelName"
          id="channelName"
          ref={inputRef}
        />
        <Button type="submit" variant="primary">Add</Button>
        <Button variant="secondary" onClick={() => dispatch(closeAddChannelModal())}>Close</Button>
      </Stack>
    </fieldset>
  </Form>
  ); */
};

export default AddChannelModal;
