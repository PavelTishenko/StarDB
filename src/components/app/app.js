import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorButton from '../error-button';
import './app.css';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import SwapiService from '../../services/swapi-service';
export default class App extends Component {

  swapiService = new SwapiService();
  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };

  componentDidCatch(){
    console.log('catch');
    this.setState({ hasError: true })
    
  }

  render() {
    if(this.state.hasError){
      return <ErrorIndicator/>
    }
    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    return (
      <div className="stardb-app">
        <Header />
        { planet }

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        {/* <ErrorButton/> */}

        <PeoplePage/>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected}
            getData = {this.swapiService.getAllPlanets}>

            {(item) => (
            <span>{item.name}<button>!</button></span>
            )}
            
            </ItemList>
          </div>
          <div className="col-md-6">
          {/* <ErrorButton/> */}
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
       </div>

       <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected}
            getData = {this.swapiService.getStarships}>
            {(item) => item.name}
            </ItemList>
          </div>
          <div className="col-md-6">
          {/* <ErrorButton/> */}
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
       </div>
        
      </div>
    );
  }
}