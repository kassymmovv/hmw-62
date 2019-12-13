import React, {Component} from 'react';
import axios from "axios";
import './App.css'
class App extends Component {
  state = {
    countries: [],
    countryInfo: {},
      borders: null
  };
  async componentDidMount() {
    const response = await axios.get('https://restcountries.eu/rest/v2/all');
    this.setState({countries: response.data});
  }


countryInfo = async code => {
   const response = await axios.get('https://restcountries.eu/rest/v2/alpha/' + code);
  const countryInfo = response.data;
  this.setState({countryInfo});
  this.countryBorders(countryInfo.borders)

};
countryBorders  = async (bordersArray) => {
    if (bordersArray.length > 0){
        let arr = [];
        for (let i = 0;i < bordersArray.length;i++){
            const response = await axios.get('https://restcountries.eu/rest/v2/alpha/' + bordersArray[i]);
            arr.push(response.data.name);
        }
        this.setState({borders: arr.join(',')})
    }else {
        console.log('Borders not detected');
    }
};
  render() {
      console.log(this.state.countries);
      console.log(this.state.countryInfo);

      return (
            <div className="container">
              <div className="Sidebar">
                <ul>
                  {this.state.countries.map((country,index) => {
                    return(
                      <li key={index}
                            onClick={() => {this.countryInfo(country.alpha3Code)}}
                      >
                          {country.name}
                      </li>
                  )
                  })}
                </ul>
              </div>
                <div className="info">
                    name:{this.state.countryInfo.name}
                    <div>Population:{this.state.countryInfo.population}</div>
                    <div>Capital:{this.state.countryInfo.capital}</div>
                    <img src={this.state.countryInfo.flag} alt="flag" className="img"/>
                </div>

               <div>
                   Borders:{this.state.borders}
               </div>
            </div>
        );
    }
}

export default App;