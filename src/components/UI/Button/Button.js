import React from 'react';
import Button from 'react-bootstrap/Button';

const button = (props) => {
    return (
    <Button onClick={props.onClick}>{props.children}</Button>
    )
}

export default button;