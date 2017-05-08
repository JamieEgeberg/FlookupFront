/**
 * Created by Jamie on 04-05-2017.
 */
import {computed, observable, action, useStrict} from "mobx";
import fetchHelper from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

useStrict(true);
class Search {
    @observable _airlines = [];
    @observable messageFromServer = "";
    @observable errorMessage = "";
    @observable _gettingData = false;

    @action
    setErrorMessage = (err) => {
        this.errorMessage = err;
    };

    @action
    getData = (searchParams) => {
        this._gettingData = true;
        let tempDate=searchParams.date+" 00:00:00";
        let date=new Date(tempDate.replace(/-/g,"/"));
        this.errorMessage = "";
        this.messageFromServer = "";
        this._airlines = [];
        let errorCode = 200;
        let sp="/";
        sp+=searchParams.from+"/";
        if(searchParams.to!=="XXX" && searchParams.to)sp+=searchParams.to+"/";
        sp+=date.toISOString()+"/";
        sp+=searchParams.tickets;
        const options = fetchHelper.makeOptions("GET", true);
        fetch(URL + "api/flights"+sp, options)
            .then((res) => {
                if (res.status > 210 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then(action((res) => {  //Note the action wrapper to allow for useStrict
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    this._airlines = res;
                    console.log(this._airlines);
                    this._gettingData = false;
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    };

    @computed get airlineCount() {
        return this._airlines.length;
    }

    @computed get airlines() {
        return this._airlines;
    }

    @computed get gettingData() {
        return this._gettingData;
    }

    @action addBook(airline) {
        this.errorMessage = "";
        this.messageFromServer = "";
        let errorCode = 200;
        let options = fetchHelper.makeOptions("POST", true);

        options.body = JSON.stringify(airline);
        fetch(URL + "api/airline", options)
            .then((res) => {
                if (res.status > 210 || !res.ok) {
                    errorCode = res.status;
                }
                return res.json();
            })
            .then(action((res) => {  //Note the action wrapper to allow for useStrict
                if (errorCode !== 200) {
                    throw new Error(`${res.error.message} (${res.error.code})`);
                }
                else {
                    console.log(res);
                    this._airlines.push(res);
                    console.log(this._airlines);
                }
            })).catch(err => {
            //This is the only way (I have found) to verify server is not running
            this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
        })
    }
}

export default new Search();