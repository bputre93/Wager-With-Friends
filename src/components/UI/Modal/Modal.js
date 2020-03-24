import React from 'react';
import './Modal.css';
import Modal from 'react-bootstrap/Modal';
import Button from '../Button/Button';

const modal = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleSave}>Save</Button>
                <Button onClick={props.handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default modal;