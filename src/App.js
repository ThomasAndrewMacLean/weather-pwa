import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, city: '' };
  }

  componentDidMount() {
    this.loadDataFromLocalStorage();
    this.loadDataFromApi();

  }

  loadDataFromLocalStorage = () => {
    console.log('loading from local storage');
    const lat = localStorage.getItem('lat');
    const lon = localStorage.getItem('lon');
    const city = localStorage.getItem('city');

    if (city) {
      console.log('loadgin city')
      this.setState({ city: JSON.parse(city) });
    }
    if (lat && lon) {
      this.getWeatherData(lat, lon);
    }
  }

  loadDataFromApi = () => {
    console.log('loading from api');
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

    fetch('https://d7gsigzqe2.execute-api.eu-west-1.amazonaws.com/dev/getweather?lat=' +
      lat + '&lon=' + lon
    )
      .then(res => res.json())
      .then(data => {
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
          <div>
            <div className="data">
              {this.state.data.currently.summary}
            </div>
            <div className="data">
              {this.state.data.currently.temperature}°C
           </div>
            <div className="data">
              {this.state.data.hourly.summary}°C
           </div>
            <div className="data">
              {this.state.data.daily.summary}°C
           </div>
          </div>

        }

      </div>
    );
  }
}

export default App;
