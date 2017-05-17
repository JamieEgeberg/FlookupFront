import React, {Component} from 'react'
import {observer} from "mobx-react";
import {hashHistory} from "react-router";
import Modal, {closeStyle} from "simple-react-modal";
import Search from "../stores/Search";
import BookStore from "../stores/BookStore";

const Booking = observer(class List extends Component {

    constructor(props) {
        super(props);

        if (!this.props.params.id) hashHistory.push("/list");
        let flight = this.findFlightById(this.props.params.id);

        if (!flight) hashHistory.push("/home");

        console.log(flight);

        this.state = {
            bookingResult: BookStore.booking,
            flight: flight,
            booking: {
                airline: flight.airline,
                flightID: flight.flightID,
                numberOfSeats: flight.numberOfSeats,
                reserveeName: "",
                reservePhone: "",
                reserveeEmail: "",
                passengers: this.getPassengerObjects(flight.numberOfSeats)
            }
        };
    }

    getPassengerObjects = (numberOfSeats) => {
        let po = [];
        for (let i = 0; i < numberOfSeats; i++) {
            po.push({
                firstName: "",
                lastName: ""
            });
        }
        return po;
    };

    findFlightById = (id) => {
        let flight = undefined;
        Search.airlines.forEach((airline) => {
            flight = airline.flights.filter((flight) => {
                flight.airline = airline.airline;
                return flight.flightID === id;
            })[0];
        });
        return flight;
    };

    displayFlight = (flight) => {
        return (
            <div className="col-sm-12">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <p> Flight ID: {flight.flightID} </p>
                        <p> Flight number: {flight.flightNumber} </p>
                        <p> Date: {String(new Date(flight.date))} </p>
                        <p> Tickets: {flight.numberOfSeats} </p>
                        <p> Total Price: {flight.totalPrice} kr</p>
                        <p> Travel
                            Time: {parseInt(flight.traveltime / 60, 10) + "t" + (flight.traveltime % 60 ) + "m"} </p>
                        <p> From: {flight.origin} </p>
                        <p> To: {flight.destination} </p>
                        <p> Airline: {flight.airline} </p>
                    </div>
                </div>
            </div>
        )
    };

    generatePassengerFields = () => {
        return this.state.booking.passengers.map((passenger, index) => {
            return <div key={index}>
                <div className="form-group">
                    <label htmlFor={"firstName" + index}
                           className="col-sm-4">
                        {index + 1}: First Name:</label>
                    <input
                        className="form-control"
                        id={"firstName" + index} type="text"
                        required
                        value={this.state.booking.passengers[index].firstName}
                        onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor={"lastName" + index}>
                        Last Name:</label>
                    <input
                        className="form-control"
                        id={"lastName" + index} type="text" required
                        value={this.state.booking.passengers[index].lastName}
                        onChange={this.handleChange}/>
                </div>
            </div>
        });
    };

    handleChange = (event) => {
        let booking = this.state.booking;
        let id = event.target.id;
        if (id === "name") {
            booking.reserveeName = event.target.value;
        } else if (id === "phone") {
            booking.reservePhone = event.target.value;
        } else if (id === "email") {
            booking.reserveeEmail = event.target.value;
        }

        booking.passengers.forEach((passenger, index) => {
            if (id === "firstName" + index) {
                booking.passengers[index].firstName = event.target.value;
            } else if (id === "lastName" + index) {
                booking.passengers[index].lastName = event.target.value;
            }
        });

        this.setState({
            booking: booking
        });
    };

    modalContent = () => {
        if (!BookStore.booking) return;
        return <div>
            <h2>Booking Confirmation</h2>
            <p>Flight number: {BookStore.booking.flightNumber} </p>
            <p>Date: {String(new Date(BookStore.booking.date))}</p>
            <p>Tickets: {BookStore.booking.numberOfSeats} </p>
            <p>Travel
                Time: {parseInt(BookStore.booking.flightTime / 60, 10) + "t" + (BookStore.booking.flightTime % 60 ) + "m"} </p>
            <p>From: {BookStore.booking.origin} </p>
            <p>To: {BookStore.booking.destination} </p>
            <p>Reservee Name: {BookStore.booking.reserveeName} </p>
            <p>Passengers: {BookStore.booking.passengers.map((p, idx) => {
                return (idx + 1) + ", " + p.firstName + " " + p.lastName +
                    (idx < BookStore.booking.passengers.length - 1 ? ", " : "");
            })}</p>
            <a style={closeStyle} onClick={this.close}>X</a>
        </div>;
    };

    close = () => {
        this.setState({show: false});
        hashHistory.push('/home');
    };

    book = (event) => {
        event.preventDefault();
        BookStore.postReservation(this.state.booking);
        this.setState({show: true});
    };

    render() {
        return (
            <div className="row">
                {this.displayFlight(this.state.flight)}
                <div className="col-sm-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form className="maxed">
                                <fieldset>
                                    <legend>Contact Info</legend>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Full
                                                    Name:</label>
                                                <input
                                                    className="form-control"
                                                    id="name" type="text"
                                                    required
                                                    value={this.state.booking.reserveeName}
                                                    onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="phone">Phone:</label>
                                                <input
                                                    className="form-control"
                                                    id="phone" type="text"
                                                    required
                                                    value={this.state.booking.reservePhone}
                                                    onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label
                                                    htmlFor="email">Email:</label>
                                                <input
                                                    className="form-control"
                                                    id="email" type="email"
                                                    required
                                                    value={this.state.booking.reserveeEmail}
                                                    onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>Contact Info</legend>
                                    {this.generatePassengerFields()}
                                </fieldset>
                                <button id="book" onClick={this.book}>Book
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.show} onClose={this.close}>
                    {this.modalContent()}
                </Modal>
            </div>
        )
    };
});

export default Booking;