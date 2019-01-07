import React, { Component } from 'react';
import Swapiservice from '../../services/swapi-service'; // add swapi serv
import Spinner from '../spinner';
import ErrorIndicator from  '../error-indicator';
import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new Swapiservice(); // create new swapi

  state={
    planet: {},
    loading: true
  };

  constructor(){
    super();
    this.updatePlanet();// when component is ready, in constructor we sending request to server
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading:false,
      error: false
    })
  }

  onError = (err) => {
    this.setState({
      error: true
    })
  };

  updatePlanet(){ // use swapi fore taking data
    const id = Math.floor( Math.random()*25 + 2);// get random number for id 
    this.swapiService
      .getPlanet(id)
       // apdate state of component 
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
   const {planet, loading, error} = this.state;

   const errorMessage = error ? <ErrorIndicator/> : null;
   const spiner = loading ? <Spinner/> : null;
   const content = !loading ? <PlanetView planet = {planet}/> : null;
    
    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spiner}
        {content}
      </div>

    );
  }
}

const PlanetView = ({planet}) =>{
  const { population,
    rotationPeriod, diameter, name, id} = planet;
  return( 
    <React.Fragment>
      <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt=' '/>
      <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  )
}