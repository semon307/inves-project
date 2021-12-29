import axios from "axios";

// const options = {
//     method: 'GET',
//     url: 'https://yh-finance.p.rapidapi.com/auto-complete',
//     params: {q: 'tesla', region: 'US'},
//     headers: {
//         'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
//         'x-rapidapi-key': '146beb05b3msh470b9b2951bdd43p1b99bdjsn01710a27414a'
//     }
// };
const instance = axios.create({
    baseURL: 'https://yh-finance.p.rapidapi.com/',
    headers: {
        'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
        'x-rapidapi-key': '146beb05b3msh470b9b2951bdd43p1b99bdjsn01710a27414a'
    }
})


export const getFinanceData = (ticker: string, region: string = "US") => {
    return instance.get(`stock/v2/get-summary?symbol=${ticker}&region=${region}`)
}

export const getChart = (ticker: string, range: string = "1", interval: string = "1d",  region: string = "US") => {
    return instance.get(`stock/v2/get-chart?interval=${interval}&symbol=${ticker}&range=${range}y&region=${region}`)
        // .then(res => console.log(res.data.chart.result[0].timestamp))
}