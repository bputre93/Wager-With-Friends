import React, { Component } from 'react';
import './App.css';
import Wager from './components/Wager/Wager';
import Button from './components/UI/Button/Button';
import WagerTable from './components/WagerTable/WagerTable'
import fire from './fire';

class App extends Component {

  state = {
    wager: {
      person1: '',
      person2: '',
      description: '',
      amount: 0,
      odds: null
    },
    existingWagers: []

  }

  columns = [
    {title: "Date", field: "date", width: 150, align: "left"},
    {title: "Bettor", field: "person1", width: 150, align: "left"},
    {title: "Against", field: "person2", width: 150, align: "left"},
    {title: "Description", field: "description", align: "left", formatter:"textarea"},
    {title: "Amount", field: "amount", width: 75, align: "center", formatter: "money", formatterParams: {precision: false, symbol: "$"}},
    {title: "Odds", field:"odds", width: 75, align: "center"}
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
          odds: wagers[wager].odds
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
    console.log(wager)
    fire.database().ref('wagers').push(wager);
    this.setState({wager:{
      person1: '',
      person2: '',
      description: '',
      amount: 0,
      odds: null
    }})
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
      <Button onClick={this.submitWager}>It's On, Brother!</Button>
      <h2><center>Wagers</center></h2>
      <WagerTable columns={this.columns} data={this.state.existingWagers} options={options}/>
    </div>
  );
  }
}

export default App;
