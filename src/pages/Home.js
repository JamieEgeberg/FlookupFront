import React, {Component} from 'react'
import auth from '../authorization/auth'
import {observer} from "mobx-react";

const Home = observer(class Home extends Component {

    getToday = () => {
        let d = new Date();
        let day = d.getDate();
        let month = d.getMonth() + 1;
        return d.getFullYear() + (month > 9 ? "-" + month : "-0" + month) + (day > 9 ? "-" + day : "-0" + day);
    };

    render() {
        return (
            <div>
                <h3>Welcome to FlookUp, the place to for find the cheapest way for all your flying needs!
                </h3>
                <form className="form-inline">

                    <div className="form-group"><label htmlFor="from"> From:</label><select className="form-control">
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
                    </select></div>

                    <div className="form-group"><label htmlFor="to"> To:</label><select className="form-control" defaultValue="XXX">
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
                    </select></div>

                    <div className="form-group"><label htmlFor="date"> Flight date:</label> <input
                        className="form-control" id="date" type="date"
                        min={this.getToday()}
                        max="2017-12-31"/>
                    </div>
                    <div className="form-group"><label htmlFor="tickets"> Tickets:</label> <input
                        className="form-control"
                        id="tickets"
                        type="number" required
                        min="1" max="25"/>
                    </div>
                    <div className="form-group">
                    <input className="form-control" type="button" value="Find"/>
                    </div>
                </form>
            </div>
        )
    };
});

export default Home;


