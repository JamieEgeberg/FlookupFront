import React, {Component} from 'react'
import {observer} from "mobx-react";
import {hashHistory} from "react-router";
import Search from "../stores/Search";

const Home = observer(class Home extends Component {


    constructor(props) {
        super(props);

        let searchParams = {
            from: "CPH",
            to: "XXX",
            date: this.getToday(),
            tickets: 1
        };


        this.state = {
            searchParams: searchParams
        };
    }

    handleChange = (event) => {
        let searchParams = this.state.searchParams;
        let id = event.target.id;
        if (id === "from") {
            searchParams.from = event.target.value;
        } else if (id === "to") {
            searchParams.to = event.target.value;
        } else if (id === "date") {
            searchParams.date = event.target.value;
        } else if (id === "tickets") {
            searchParams.tickets = event.target.value;
        }
        this.setState({searchParams: searchParams});
    };

    searchBtn = (event) => {
        Search.getData(this.state.searchParams);

        event.preventDefault();
        hashHistory.push('/list');
    };

    getToday = () => {
        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth() + 1;
        return d.getFullYear() + (month > 9 ? "-" + month : "-0" + month) + (day > 9 ? "-" + day : "-0" + day);
    };

    render() {
        return (
            <div>
                <img className="logo" src="logo2t.png" alt="Logo" />
                <h3>Welcome to FlookUp, the place to find the cheapest way for all your flying needs!
                </h3>
                <form className="form-inline">

                    <div className="form-group">
                        <label htmlFor="from">From:</label>
                        <select id="from"
                                className="form-control"
                                value={this.state.searchParams.from}
                                onChange={this.handleChange}>
                            <option value="CPH">Copenhagen</option>
                            <option value="ATL">Atlanta, USA</option>
                            <option value="PEK">Beijing</option>
                            <option value="ORD">Chicago, USA</option>
                            <option value="LHR">London, Heathrow</option>
                            <option value="HND">Tokyo</option>
                            <option value="LAX">Los Angeles, USA</option>
                            <option value="CDG">Paris</option>
                            <option value="DFW">Dallas/ Fort Worth, USA</option>
                            <option value="FRA">Frankfurt</option>
                            <option value="DEN">Denver, USA</option>
                            <option value="HKG">Hong Kong</option>
                            <option value="MAD">Madrid</option>
                            <option value="DXB">Dubai</option>
                            <option value="JFK">New York, USA</option>
                            <option value="AMS">Amsterdam</option>
                            <option value="CGK">Jakarta</option>
                            <option value="BKK">Bangkok</option>
                            <option value="SIN">Singapore</option>
                            <option value="CAN">Guangzhou, China</option>
                            <option value="PVG">Shanghai, China</option>
                            <option value="IAH">Houston, USA</option>
                            <option value="LAS">Las Vegas, USA</option>
                            <option value="SFO">San Fransisco, USA</option>
                            <option value="PHX">Phoenix, USA</option>
                            <option value="CLT">Charlotte, USA</option>
                            <option value="FCO">Rome</option>
                            <option value="SYD">Sydney</option>
                            <option value="MIA">Miami, USA</option>
                            <option value="MCO">Orlando, USA</option>
                            <option value="MUC">Munich</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="to">To:</label>
                        <select id="to" className="form-control"
                                value={this.state.searchParams.to}
                                onChange={this.handleChange}>
                            <option value="XXX">Anywhere</option>
                            <option value="CPH">Copenhagen</option>
                            <option value="ATL">Atlanta, USA</option>
                            <option value="PEK">Beijing</option>
                            <option value="ORD">Chicago, USA</option>
                            <option value="LHR">London, Heathrow</option>
                            <option value="HND">Tokyo</option>
                            <option value="LAX">Los Angeles, USA</option>
                            <option value="CDG">Paris</option>
                            <option value="DFW">Dallas/ Fort Worth, USA</option>
                            <option value="FRA">Frankfurt</option>
                            <option value="DEN">Denver, USA</option>
                            <option value="HKG">Hong Kong</option>
                            <option value="MAD">Madrid</option>
                            <option value="DXB">Dubai</option>
                            <option value="JFK">New York, USA</option>
                            <option value="AMS">Amsterdam</option>
                            <option value="CGK">Jakarta</option>
                            <option value="BKK">Bangkok</option>
                            <option value="SIN">Singapore</option>
                            <option value="CAN">Guangzhou, China</option>
                            <option value="PVG">Shanghai, China</option>
                            <option value="IAH">Houston, USA</option>
                            <option value="LAS">Las Vegas, USA</option>
                            <option value="SFO">San Fransisco, USA</option>
                            <option value="PHX">Phoenix, USA</option>
                            <option value="CLT">Charlotte, USA</option>
                            <option value="FCO">Rome</option>
                            <option value="SYD">Sydney</option>
                            <option value="MIA">Miami, USA</option>
                            <option value="MCO">Orlando, USA</option>
                            <option value="MUC">Munich</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Flight date:</label>
                        <input
                            className="form-control" id="date" type="date" required
                            min={this.getToday()}
                            max="2017-12-31" value={this.state.searchParams.date}
                            onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tickets">Tickets:</label>
                        <input
                            className="form-control"
                            id="tickets"
                            type="number" required
                            min="1" max="25" value={this.state.searchParams.tickets}
                            onChange={this.handleChange}/>
                    </div>

                    <button id="search" className="btn btn-primary" type="submit" onClick={this.searchBtn}>Search</button>

                </form>
            </div>
        )
    };
});

export default Home;


