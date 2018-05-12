import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    console.log(process.env)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  }

  showPosition = (position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    fetch('https://d7gsigzqe2.execute-api.eu-west-1.amazonaws.com/dev/getweather?lat=' +
      position.coords.latitude + '&lon=' +
      position.coords.longitude
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
          Whats the weather like...
        </header>
        <p className="App-intro">

          <code>

            {this.state.data && this.state.data.currently && this.state.data.currently.summary}
          </code>
        </p>
      </div>
    );
  }
}

export default App;
