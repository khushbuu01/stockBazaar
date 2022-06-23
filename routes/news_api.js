const https = require('https');
url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=c4f6358ae24e42288ff78a0fa939e49e"

const newsApi = (callback) => {
    https.get(url, (res) => {
        let data ="";

        res.on("data", (chunk) => {
            data += chunk;
        })

        res.on("end", () => {
            return callback(data);
        })

    }).on("error", (err) => {
        console.error("Error: " + err.message)
    })
}

module.exports.callNewsAPI = newsApi;