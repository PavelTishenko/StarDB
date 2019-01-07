import React, { Component } from 'react';
import Spinner from '../spinner'
import './item-list.css';
import SwapiService from '../../services/swapi-service';

export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    peopleList: null
  }

  componentDidMount() {
this.swapiService
    .getAllPeople()
    .then((peopleList) =>{
      this.setState({peopleList})
    })
    
  }

  renderItems(arr){
    return arr.map((person) => {
      return(
        <li className = "list-group-item" key = {person.id}>
          {person.name}
        </li>
      )
    })
  }

  render() {
    const {peopleList} = this.state;
    if (!peopleList){
      return <Spinner/>
    }
    return (
      <ul className="item-list list-group">
        <li className="list-group-item">
          Luke Skywalker
        </li>
        <li className="list-group-item">
          Darth Vader
        </li>
        <li className="list-group-item">
          R2-D2
        </li>
      </ul>
    );
  }
}