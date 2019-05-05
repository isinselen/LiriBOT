require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var fs = require ("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var queryvalue = process.argv[2];
var Search = process.argv.slice(3).join(" ");

function switchFunc(){
switch (queryvalue) {
    case "spotify-this-song":
        song()
        break;

    case "concert-this":
        searchBandsInTown()
        break;

    case "movie-this":
        movie()
        break;

    case "do-what-its-says":
    random()
        console.log("fs response")
}
}

function random(){
    fs.readFile("random.txt", "utf8", function(err, data) {
    
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(err);
        }
      
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        queryvalue = dataArr[0]
        Search = dataArr[1]
        console.log(queryvalue)
        console.log(Search)
        switchFunc()
      
      });
    }
    
switchFunc()
//Spotify query
function song() {

    spotify.search({ type: 'track', query: Search, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(data)
        var songData = data.tracks.items[0];
        // console.log("Data" , data.tracks.items[0])
        console.log("Artist Name: ", songData.album.artists[0].name)
        console.log("Song Name: ", songData.name)
        console.log("Album Name: ", songData.album.name)
    });
};


function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + Search + "&y=&plot=short&apikey=trilogy";

 
    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            // console.log("Rotten Tomatoes rating: " + response.data.tomatoRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

        }
    );
}

function searchBandsInTown() {
        var queryUrl = "https://rest.bandsintown.com/artists/" + Search + "/events?app_id=codingbootcamp";
    
      
        axios.get(queryUrl).then(
            function (response) {
                    console.log("Name: " + response.data[0].venue.name);
                    console.log("Venue: " + response.data[0].venue.city);
                    console.log("Date: " + response.data[0].datetime);

   
            }
        );
    }

