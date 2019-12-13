import React, {Component} from 'react';
import axios from 'axios'
class Countries extends Component {
    state = {
countries: []
    };
    componentDidMount() {
            axios({
                method: 'get',
                url: 'https://restcountries.eu/rest/v2/all'
            })
                .then(response => {
                    // this.setState({messages: response.name})
                    console.log(response.data)
                })

    }


    render() {
        // console.log(this.state.countries);
        return (
            <div>
                {this.state.countries.map((name) => {
                    return(
                        <li>a</li>
                    )
                })}
            </div>
        );
    }
}

export default Countries;