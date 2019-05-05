require("dotenv").config();
var fs = require('fs');
var Spotify = require('Node-Spotify-API');
var keys = require('./keys.js');
var axios = require("axios");
var Spotify = new Spotify(keys.spotify);

var defaultSong = require("The Sign");
var defaultMovie = "Mr. Nobody";

function getSongs(songName) {

    if (songName === "") {
        songName = "The Sign";
    }

    spotify.search({ type: 'track', query: songName }, function (error, data) {
        if (error) {
            return console.log("Ace of Base: ' + 'The Sign");
        }
        else {
            console.log("Error!")

            console.log(JSON.stringify(data));

            //Artist(s)
            console.log("Artists: ", data.tracks.items[0].album.artists[0].name)
            // The album 
            console.log("Album Name: ", data.tracks.items[0].album.name)
            // A preview link 
            console.log("Preview Link: ", data.tracks.items[0].preview_url)

        };
    }
    )
    function getMovies(movieName) {
       
        axios.get("https://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=e850b422")
            .then(function (data) {

                var results = `
            Title: ${data.data.Title}
            Year: ${data.data.Year}
            IMDB Rating: ${data.data.Rated}
            Rotten Tomatoes Rating: ${data.data.Ratings[1].Value}
            Country: ${data.data.Country}
            Language: ${data.data.Language}
            Plot: ${data.data.Plot}
            Actors: ${data.data.Actors}`;
                console.log(results)

            })

            .catch(function (error) {
                console.log(error);
            });

        if (movieName === "Mr. Nobody") {
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
        };
    }
    function getBands(artist) {
      
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log("Name:", response.data[0].venue.name);
                console.log("Location:", response.data[0].venue.city);
                console.log("Date:", eventDate);
                var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function doWhatItSays() {
        fs.readFile("random.txt", "utf8", function (error, data) {
            data = data.split(",");
            var action = data[0]
            var value = data[1]

            switch (action) {
                case "spotify-this-song":
                    getSongs(value)
                    break;
                case "concert-this":
                    getBands(value)
                    break;
                case "movie-this":
                    getMovies(value)
                    break;
                default:
                    break;
            }
        });
    }
}

    switch (action) {
        case "concert-this":
            getBands(value)
            break;
        case "spotify-this-song":

            if (value === "") {
                value = defaultSong;
            }
            getSongs(value)
            break;
        case "movie-this":

            if (value == "") {
                value = defaultMovie;
            }
            getMovies(value)
            break;
        case "do-what-it-says":
            doWhatItSays()
            break;
        default:
            break;
    }

   
var action = process.argv[2];
var value = process.argv[3];


