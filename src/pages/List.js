/**
 * Created by Jamie on 04-05-2017.
 */
import React, {Component} from 'react'
import {observer} from "mobx-react";
import {hashHistory} from "react-router";
import Search from "../stores/Search";

const List = observer(class List extends Component {

    constructor(props) {
        super(props);

        if (!Search.gettingData && Search.airlines.length === 0)
            hashHistory.push("/home");

        this.state = {
            airlines: Search.airlines
        }
    }

    displayAirlines = (airlines) => {
        return airlines.map((airline) => {
            if (airline)
                return this.displayAirline(airline);
            else
                return "";
        })
    };

    displayAirline = (airline) => {
        return airline.flights.map((flight) => {
            return this.displayFlight(flight, airline.airline);
        })
    };

    displayFlight = (flight, airline) => {
        return (<div className="panel panel-default">
            <div className="panel-body">
                <p> Flight ID: {flight.flightID} </p>
                <p> Flight number: {flight.flightNumber} </p>
                <p> Date: {String(new Date(flight.date))} </p>
                <p> Tickets: {flight.numberOfSeats} </p>
                <p> Total Price: {flight.totalPrice} kr</p>
                <p> Travel Time: {parseInt(flight.traveltime / 60, 10) + "t"
                + flight.traveltime % 60 + "m"} </p>
                <p> From: {flight.origin} </p>
                <p> To: {flight.destination} </p>
                <p> Airline: {airline} </p>
                <button id={flight.flightID} className="btn btn-primary"
                        type="submit" onClick={this.booking}>Book</button>
            </div>
        </div>)
    };

    booking = (e) => {
        hashHistory.push('/booking/' + e.currentTarget.id);
    };

    render() {
        return (
            <div>
                {this.displayAirlines(Search.airlines)}
            </div>
        )
    };
});

export default List;