/**
 * Created by Jamie on 04-05-2017.
 */
import React, {Component} from 'react'
import {observer} from "mobx-react";
import {hashHistory} from "react-router";
import Search from "../stores/Search";
import Flight from "./Flight";

const List = observer(class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            airlines: Search.airlines
        }
    }

    displayAirlines = (airlines) => {
        return airlines.map((airline) => {
            return this.displayAirline(airline);
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
                <p> Date: {Date(flight.date)} </p>
                <p> Tickets: {flight.numberOfSeats} </p>
                <p> Total Price: {flight.totalPrice} kr</p>
                <p> Travel Time: {parseInt(flight.traveltime / 60) + "t" + flight.traveltime % 60 + "m"} </p>
                <p> From: {flight.origin} </p>
                <p> To: {flight.destination} </p>
                <p> Airline: {airline} </p>
            </div>
        </div>)
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