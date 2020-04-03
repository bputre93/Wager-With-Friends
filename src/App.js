import React, { Component } from 'react';
import './App.css';
import Wager from './components/Wager/Wager';
import Button from './components/UI/Button/Button';
import WagerTable from './components/WagerTable/WagerTable';
import fire from './fire';
import ResultsModal from './components/ResultsModal/ResultsModal';

class App extends Component {

  state = {
    wager: {
      person1: '',
      person2: '',
      description: '',
      amount: 0,
      odds: 0,
      person2WinPotential: 0
    },
    existingWagers: [],
    updatedWager: {
      person1: null,
      person2: null
    },
    showResultsModal: false

  }

  columns = [
    {title: "Date", field: "date", width: 125, align: "left"},
    {title: "Bettor", field: "person1", width: 100, align: "left"},
    {title: "Against", field: "person2", width: 100, align: "left"},
    {title: "Description", field: "description", align: "left", formatter:"textarea"},
    {title: "Amount", field: "amount", width: 100, align: "center", formatter: "money", formatterParams: {precision: false, symbol: "$"}},
    {title: "Odds", field:"odds", width: 75, align: "center"},
    {title: "To Win", field:"person2WinPotential", width: 100, align:"center", formatter: "money", formatterParams: {precision: false, symbol: "$"}},
    {title: "Completed?", field: "status", width: 75, align: "center",formatter:"tickCross", tooltip:"Click to complete a wager and enter a result", editor: true, cellEdited:(cell)=>{this.statusUpdated(cell)}},
    {title: "Result", field: "result", align: "left", formatter: "textarea"}

  ]

  componentDidMount() {
    fire.database().ref('wagers').on("value",(snapshot)=>{
      let wagers = snapshot.val();
      let newState = [];
      for(let wager in wagers){
        newState.push({
          id: wager,
          date: wagers[wager].date,
          person1: wagers[wager].person1,
          person2: wagers[wager].person2,
          description: wagers[wager].description,
          amount: wagers[wager].amount,
          odds: wagers[wager].odds,
          status: wagers[wager].status,
          result: wagers[wager].result,
          person2WinPotential: wagers[wager].person2WinPotential
        }
        );
      }
      this.setState({existingWagers: newState})
    })
  }

  updateWager = (element, value) =>{
     const { wager } = {...this.state}
     const currentState = wager;
     currentState[element] = value;
     this.setState({wager: currentState})

  }

  submitWager = () =>{
    let wager = {...this.state.wager};
    const date = new Date().toDateString();
    wager.date = date;
    wager.status = false;
    if (wager.person1 !== '' && wager.person2 !== '' && wager.description !== '' && wager.amount !== 0 && wager.odds !== 0){
      const winAmount = this.calculateWinnings();
      wager.person2WinPotential = winAmount;
      fire.database().ref('wagers').push(wager);
      this.setState({wager:{
        person1: '',
        person2: '',
        description: '',
        amount: 0,
        odds: 0,
        person2WinPotential: 0
      }})
    }
    else {
      console.log('invalid form')
    }
  }

  statusUpdated = (cell) =>{
    const data = cell.getData();
    console.log(data)
    this.setState({updatedWager: data});
    fire.database().ref('wagers').child(data.id).update({status: data.status});
    if (data.status){
      this.setState({showResultsModal: true}
      )
    }  
  }

  closeResultsModal = () =>{
    this.setState({showResultsModal: false})
  }

  calculateWinnings = () =>{
    const wager = {...this.state.wager};
    const odds = Number(wager.odds);
    const amount = Number(wager.amount);
    
    if (odds > 100){
      var winAmount = (odds/100*amount).toFixed(2);
    }
    else if (odds < -100){
      winAmount = (Math.abs((100/odds)*amount)).toFixed(2);
    }
    else if (-100 < odds < 100){
      winAmount = 0;;
      console.log("Odds must be >100 or <-100")
    }
    return winAmount;
  }  

  render(){

    const options = {
      movableRows: true
    }


  return (
    <div className="">
      <h1><center>Wager With Friends!</center></h1>
      <h3>Profile, My Wagers, Place Wager</h3>
      <Wager
      updateWager={this.updateWager}
      person1={this.state.person1}
      person2={this.state.person2}
      description={this.state.description}
      amount={this.state.amount}
      odds={this.state.odds}></Wager>
      <Button onClick={this.submitWager}>It's on, Brother!</Button>
      <h2><center>Wagers</center></h2>
      <WagerTable columns={this.columns} data={this.state.existingWagers} options={options}/>
      <ResultsModal show={this.state.showResultsModal} wager={this.state.updatedWager} handleClose={this.closeResultsModal}/>
    </div>
  );
  }
}

export default App;
