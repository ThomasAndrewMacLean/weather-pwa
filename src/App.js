
import React, { Component } from 'react';
import './App.css';
var Twit = require('twit');


const dontHitApi = process.env.NODE_ENV !== 'production' && localStorage.getItem('city');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data: {}, city: '' };
  }

  componentDidMount() {
    this.getTweets();
    this.loadDataFromLocalStorage();
    if (!dontHitApi) {
      this.loadDataFromApi();
    }
  }

  getTweets = () => {
    console.log(process.env.CONS_SECRET);

    var T = new Twit({
      consumer_key: 'Zbom8PGyLV9emL6Vnr2sST946',
      consumer_secret: 'On2HHRxU44UJHkNCowViovB21jIcmC8YP3jt3PwZn7BThXt9fg',
      access_token: '848122671007137792-NcOrVA3uYx568sXSViHIiUevu4nS2yg',
      access_token_secret: 'COoudQjWOcnysx2gc1lGpZbtxbcok32BLJRSBLPFfiZd8',
      timeout_ms: 60 * 1000,
    })
    T.get('search/tweets', { q: 'frankdeboosere', count: 3 }, function (err, data, response) {
      console.log(data)
    })
  }

  loadDataFromLocalStorage = () => {
    console.log('loading from local storage');
    const lat = localStorage.getItem('lat');
    const lon = localStorage.getItem('lon');
    const city = localStorage.getItem('city');
    const data = localStorage.getItem('data');


    if (city) {
      this.setState({ city: JSON.parse(city) });
    }
    if (data) {
      console.log(JSON.parse(data));
      this.setState({ data: JSON.parse(data) });
    }
    if (lat && lon && !dontHitApi) {
      this.getWeatherData(lat, lon);
    }
  }

  loadDataFromApi = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
    else {
      console.log('no geo?!!!???');
    }
  }

  showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);

    this.getData(lat, lon);
  }

  getData = (lat, lon) => {
    this.getCityData(lat, lon);
    this.getWeatherData(lat, lon);
  }

  getCityData = (lat, lon) => {
    console.log('loading city from api');

    fetch('https://d7gsigzqe2.execute-api.eu-west-1.amazonaws.com/dev/getcity?lat=' +
      lat + '&lon=' + lon
    )
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('city', JSON.stringify(data.results[0]));
        console.log(data)
        this.setState({
          city: data.results[0]
        });
      })
  }

  getWeatherData = (lat, lon) => {
    console.log('loading weather from api');

    fetch('https://d7gsigzqe2.execute-api.eu-west-1.amazonaws.com/dev/getweather?lat=' +
      lat + '&lon=' + lon
    )
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('data', JSON.stringify(data));

        console.log(data)
        this.setState({
          data: data
        });
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <code>
            Whats the weather like in {this.state.city ? this.state.city.formatted_address : '...'}
          </code>
        </header>

        {this.state.data.currently &&
          <div className="container">
            <div className="data">
              {this.state.data.currently.summary}
            </div>
            <div className="data">
              {this.state.data.currently.temperature}°C
            </div>
            <img src={'./icons/' + this.state.data.currently.icon + '.svg'} alt="" />
            <div className="data">
              {this.state.data.hourly.summary}
            </div>
            <div className="data">
              {this.state.data.daily.summary}
            </div>
            <div className="data">
              {new Date(this.state.data.currently.time * 1000).toLocaleTimeString()}
            </div>
          </div>

        }
        <footer><img height="50" src="https://darksky.net/dev/img/attribution/poweredby-darkbackground.png" alt="darksky icon" /></footer>
      </div>
    );
  }
}

export default App;

