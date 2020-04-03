import React, { Component } from 'react';
import Modal from '../UI/Modal/Modal'
import Form from 'react-bootstrap/Form'
import fire from '../../fire'

class ResultsModal extends Component{

    state = {

    };

    handleSave = () =>{
        const wager = {...this.props.wager}
        console.log(wager);
        if (this.state.winner === wager.person1){
            fire.database().ref('wagers').child(wager.id).update({result: `${this.state.winner} wins $${wager.amount}`});
        }
        else if (this.state.winner === wager.person2){
            fire.database().ref('wagers').child(wager.id).update({result: `${this.state.winner} wins $${wager.person2WinPotential}`});
        }
        this.props.handleClose();
    }

    updateResultsHandler = (e) => {
        const winner = e.target.value;
        this.setState({winner: winner});
    }

    render(){

        return (
            <Modal
            title="Who won the bet?"
            show={this.props.show}
            handleClose={this.props.handleClose}
            handleSave={this.handleSave}>
                <Form>
                    <Form.Group>
                        <Form.Check type="radio" label={this.props.wager.person1} value={this.props.wager.person1} name="result-option" onClick={this.updateResultsHandler}/>
                        <Form.Check type="radio" label={this.props.wager.person2} value={this.props.wager.person2} name="result-option" onClick={this.updateResultsHandler}/>
                    </Form.Group>
                </Form>
            </Modal>
        )
    }
}

export default ResultsModal;