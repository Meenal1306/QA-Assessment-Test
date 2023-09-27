const data = require('./heartrate.json');

// Initialize the variables
let maxBeats = data[0].beatsPerMinute;
let minBeats = data[0].beatsPerMinute;
let arrBeatsPerMinute = [];
let index = 0;
let latestDate = data[0].timestamps.startTime;
let medianBeats = 0;
let date = "";


for (let i = 0; i < data.length; i++) {

  //Array of beats
  arrBeatsPerMinute[index] = data[i].beatsPerMinute
  index++;

  //Getting Latest data Timestamp
  if (data[i].timestamps.startTime > latestDate) {
    latestDate = data[i].timestamps.startTime;
  }

  //Getting Maximum Beats
  if (data[i].beatsPerMinute > maxBeats) {
    maxBeats = data[i].beatsPerMinute;
  }

  //Getting Minimum Beats
  if (data[i].beatsPerMinute < minBeats) {
    minBeats = data[i].beatsPerMinute;
  }
}
date = latestDate.split('T')[0] 


// Getting Median of the Beats
function median(arr) {
  const mid = Math.floor(arr.length / 2);
  const sortedArr = arr.sort((a, b) => a - b);

  if (arr.length % 2 === 0) {
     return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
  } else {
     return sortedArr[mid];
  }
}
medianBeats = median(arrBeatsPerMinute);


//Creating an object of the data
let outputArr = [
  {
    "date": date,
    "min": minBeats,
    "max": maxBeats,
    "median": medianBeats ,
    "latestDataTimestamp": latestDate
  }
];

//Converting Array Of Objects to String
var json = JSON.stringify(outputArr)

//Writing the data in JSON file
const fs = require('fs')
fs.writeFile('output.json', json, (err) => {
 if (err) throw err;
});


// Display the output
console.log("Median Value:",median(arrBeatsPerMinute))
console.log("Max Value:", maxBeats);
console.log("Min Value:", minBeats);
console.log("Latest date:", latestDate);
console.log("Date:", latestDate.split('T')[0]);

