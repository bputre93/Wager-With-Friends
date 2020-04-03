import React from 'react';
import { Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const wager = (props) =>{
    return(
        <div>
            <Form className="WagerForm">
                <Form.Row>
                    <Col>
                <Form.Group controlId="bettor1">
                    <Form.Label>Bettor:</Form.Label>
                    <Form.Control required type="textarea" rows="1" onChange={(e)=>props.updateWager('person1',e.target.value)} value={props.person1}></Form.Control>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="bettor2">
                    <Form.Label>Against:</Form.Label>
                    <Form.Control type="textarea" rows="1" onChange={(e)=>props.updateWager('person2',e.target.value)} value={props.person2}></Form.Control>
                </Form.Group>
                </Col>
                </Form.Row>
                <Form.Group controlId="bet_description">
                    <Form.Label>Bet Description: </Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={(e)=>props.updateWager('description',e.target.value)} value={props.description}></Form.Control>
                </Form.Group>
                <Form.Row>
                    <Col>
                <Form.Group controlId="bet_type">
                    <Form.Label>Odds: </Form.Label>
                    <Form.Control type="number" placeholder="Ex) -110" onChange={(e)=>props.updateWager('odds', e.target.value)} value={props.odds}></Form.Control>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="bet_ammount">
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control type="number" onChange={(e)=>props.updateWager('amount',e.target.value)} value={props.amount}></Form.Control>
                </Form.Group>
                </Col>
                </Form.Row>
            </Form>
        </div>
    )
}

export default wager;