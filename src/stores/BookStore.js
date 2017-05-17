import {computed, observable, action, useStrict} from "mobx";
import fetchHelper from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

useStrict(true);
class BookStore {
    @observable _booking;
    @observable messageFromServer = "";
    @observable errorMessage = "";

    @action
    setErrorMessage = (err) => {
        this.errorMessage = err;
    };

    @action
    postReservation = (booking) => {
        this.errorMessage = "";
        this.messageFromServer = "";
        this._booking = undefined;
        let errorCode = 200;
        const options = fetchHelper.makeOptions("POST", true);
        options.body = JSON.stringify(booking);
        fetch(URL + "api/reservation/" + booking.flightID, options)
            .then((res) => {
                if (res.status > 210 || !res.ok) errorCode = res.status;
                return res.json();
            })
            .then(action((res) => {  //Note the action wrapper to allow for useStrict
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    console.log(res);
                    this._booking = res;
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    };

    @computed get booking() {
        return this._booking;
    }
}

export default new BookStore();
