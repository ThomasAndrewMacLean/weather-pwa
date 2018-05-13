import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    console.log(process.env)
    console.log(navigator)
    if (navigator.geolocation) {
      console.log('getting position?');
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
    else {
      console.log('no geo?!!!???')
    }
  }

  showPosition = (position) => {
    console.log('testing');
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
          <code>
            Whats the weather like...
          </code>
        </header>

        {this.state.data.currently &&
          <div>
            {this.state.data.currently.summary}
            <br />
            {this.state.data.currently.temperature}°C
          </div>

        }

      </div>
    );
  }
}

export default App;
