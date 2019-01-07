import { __await } from "tslib";

//  https://swapi.co
export default class SwapiService{

  _apiBase = 'https://swapi.co/api';

  async getResource(url){ 
    const res = await fetch(`${this._apiBase}${url}`);//  await значит ждем ответа 
    if(!res.ok){ // сщдержит true
      throw Error(`Could not fetch ${url} received ${res.status}`) // res.status содержит один из ок статусов 200-299
    }
    return await res.json();
  }

  async getAllPeople(){
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  }

  async getPerson(id){
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person)
  }

  async getAllPlanets(){
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }

 async getPlanet(id){
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getStarships(){
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._tranformStarship);
  }

  async getStarship(id){
   const starship =  this.getResource(`/starship/${id}/`);
   return this._transformStarship(starship)
  }

  _extractId(item){
    const idRegExp = /\/([0-9]*)\/$/; 
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet = (planet) => {
    return  {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }
  _tranformStarship = (starship) => {
    return{
      id: this._extractId(starship),
      name:starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }

  _transformPerson = (person) => {
    return{
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    }
  }

}
const swapi = new SwapiService();
// swapi.getAllPeople()
// .then((people) => {
//   console.log(people.forEach((p)=>{
//     console.log(p.name);
//     })
//   )
// });
swapi.getPerson(3)
.then((p) => {
  // console.log(p.name);
});

// const getResource = async(url) => {
//   const res = await fetch(url);//  await значит ждем ответа 
//   if(!res.ok){ // сщдержит true
//     throw Error(`Could not fetch ${url} received ${res.status}`) // res.status содержит один из ок статусов 200-299
//   }

//   const body = await res.json();// когда ответит переводим в джейсон
//   return body;
// }

// getResource('https://swapi.co/api/people/1444/') // путь запроса 
//   .then((body) =>{console.log(body); //  достаем тело ответа 
//   })
//   .catch((err)=> console.log('Could not fecth:', err))

