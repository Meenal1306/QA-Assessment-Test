const data = require('./heartrate.json');

// Initialize the variables
let maxBeats = data[0].beatsPerMinute;
let minBeats = data[0].beatsPerMinute;
let arrBeatsPerMinute = [];
let index = 0;
let latestDate = [];
let medianBeats = 0;
let indexDate = 0;
let latestDateTimestamp = "";
let arrOfDates=[];
let dateIndex=0;
let uniqueDates = [];
let eachDayData = [];
let dataArray =[];
let outputArr = [];



for (let i = 0; i < data.length; i++) {
  arrOfDates[dateIndex] = data[i].timestamps.startTime.split('T')[0];
  dateIndex++;
}

uniqueDates = Array.from(new Set(arrOfDates))

for (let j = 0; j < uniqueDates.length; j++) {
  arrBeatsPerMinute[j] = [];
  latestDate[j] = [];

  //console.log(uniqueDates[j]);
  for (let k = 0; k < data.length; k++) {

    let heartRateDate = data[k].timestamps.startTime.split('T')[0]
    //console.log(data[k].timestamps.startTime);

    if(heartRateDate == uniqueDates[j])
    {
      //console.log(data[k].timestamps.startTime)
      arrBeatsPerMinute[j][index] = data[k].beatsPerMinute
      index++;
      latestDate[j][indexDate] = data[k].timestamps.startTime;
      indexDate++;
    }
    
  }
  
}

//Function for finding Median  
function median(arr) {
  const mid = Math.floor(arr.length / 2);
  const sortedArr = arr.sort((a, b) => a - b);

  if (arr.length % 2 === 0) {
     return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
  } else {
     return sortedArr[mid];
  }
}

//Function to remove Empty Values
function myFilter(elm){
  return (elm != null && elm !== false && elm !== "");
}

//Function to Append Object 
function insertObject(arr, obj) {
  arr.push(obj);
  return arr
}

//Function to find the latest timestamp
function max_date(all_dates) {
  let max_dt = all_dates[0];
  max_dtObj = new Date(all_dates[0]);
  all_dates.forEach(function(dt, index)
    {
      if ( new Date( dt ) > max_dtObj)
        {
          max_dt = dt;
          max_dtObj = new Date(dt);
        }
    });
  return max_dt;
}

for (let a = 0; a < arrBeatsPerMinute.length; a++) {
  
  minBeats = Math.min(...arrBeatsPerMinute[a].filter(myFilter));
  maxBeats = Math.max(...arrBeatsPerMinute[a].filter(myFilter));
  medianBeats = median(arrBeatsPerMinute[a].filter(myFilter));
  latestDateTimestamp= max_date(latestDate[a].filter(myFilter));
  
  console.log("Minimum element is:" + minBeats);
  console.log("Maximum Element is:" + maxBeats);
  console.log("Median is:" + medianBeats);
  console.log("latest TimeStamp:" + latestDateTimestamp);
  console.log("Date:" +uniqueDates[a]);

  eachDayData = 
    {
      "date": uniqueDates[a],
      "min": minBeats,
      "max": maxBeats,
      "median": medianBeats ,
      "latestDataTimestamp": latestDateTimestamp
    }
  
    outputArr = insertObject(dataArray, eachDayData);

}

//Converting Array Of Objects to String
var json = JSON.stringify(outputArr,null," ")

//Writing the data in JSON file
const fs = require('fs')
fs.writeFile('output.json', json, (err) => {
 if (err) throw err;
});