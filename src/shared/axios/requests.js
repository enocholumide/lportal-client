import axios from 'axios'

//const DEV = "http://localhost:8080/api"
const PROD = "https://lportal.herokuapp.com/api"

class Networker {
    static getHeader () {
        let auth = ""
        if (localStorage.credentials) {
            let credentials = JSON.parse(localStorage.credentials);
            auth = "" + credentials.tokenType + " " + credentials.accessToken;
        }
    
        return {"Authorization" : auth}
    }

}

const network = axios.create({
    baseURL: PROD,
    timeout: 100000,
    headers: Networker.getHeader()
})



export default network