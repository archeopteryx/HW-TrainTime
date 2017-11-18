// initialize firebase
var config = {
	apiKey: "AIzaSyDlsaT02twkrDLQHh6V7kwVGQS4PJ1SxUA",
	authDomain: "myintrotodatabases.firebaseapp.com",
	databaseURL: "https://myintrotodatabases.firebaseio.com",
	projectId: "myintrotodatabases",
	storageBucket: "myintrotodatabases.appspot.com",
	messagingSenderId: "834216684806"
};
firebase.initializeApp(config);

var database = firebase.database();

  // submit button functionality
  $("#submitButton").on("click", function (event) {
  	event.preventDefault();

  	// assigns the user inputs as variables
  	var trainName = $("#nameInput").val().trim();
  	var trainDestination = $("#destinationInput").val().trim();
  	var trainFrequency = moment($("#frequencyInput").val().trim(), "mm").format("mm")
  	var trainStart = moment($("#startInput").val().trim(), "HH:mm").format("HH:mm");
  	var trainEnd = moment($("#endInput").val().trim(), "HH:mm").format("HH:mm");

  	// train object with all of these as attributes
  	var newTrain = {
  		name: trainName,
  		destination: trainDestination,
  		frequencyTime: trainFrequency,
  		startTime: trainStart,
  		endTime: trainEnd
  	};

  	// push the new object to firebase
  	database.ref().push(newTrain);

  	// console log to check it 
  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.frequencyTime);
  	console.log(newTrain.startTime);
  	console.log(newTrain.endTime);

  	// alert the user that the train has been added
  	alert("New Train Added to Database!");

  	// confirmed working up to this point

  	// clears the text boxes upon entry
  	$("#nameInput").val(" ");
  	$("#destinationInput").val(" ");
  	$("#frequencyInput").val(" ");
  	$("#startInput").val(" ");
  	$("#endInput").val(" ");
  });

  // firebase event to load current trains into existing table space
  database.ref().on("child_added", function(childSnapshot,prevChildKey) {

  	// check what the childSnapshot pulls from firebase (it pulls everything - clean up my firebase before submitting or make a new project for it to dump into)
  	console.log(childSnapshot.val());

  	// sort the snapshot data into variables
  	var dbTrainName = childSnapshot.val().name;
  	var dbTrainDestination = childSnapshot.val().destination;
  	var dbTrainFrequency = childSnapshot.val().frequencyTime;
  	var dbTrainStart = childSnapshot.val().startTime;
  	var dbTrainEnd = childSnapshot.val().endTime;

  	// console log it to check existing data
  	console.log(dbTrainName);
  	console.log(dbTrainDestination);
  	console.log(dbTrainFrequency);
  	console.log(dbTrainStart);
  	console.log(dbTrainEnd);

  	//confirmed working to this point

  	// calculate estimated train schedule
  	// var trainRunning = dbTrainEnd - dbTrainStart;

  	// for (var i=dbTrainStart; i<dbTrainEnd; i+dbTrainFrequency) {
  		// var trainSched = trainRunning[i]
  	// };

  	// calculate next arrival
  	var now = moment();

  // 	var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);
  var nextArrival = "";

  // calculate distance to next arrival
  var minutesTo = "";

  // append all data to table 
  $("#currentTrains > tbody").append("<tr><td>" + dbTrainName + "</td><td>" + dbTrainDestination + "</td><td>" + dbTrainFrequency + "</td><td>" + dbTrainStart + "</td><td>" + dbTrainEnd + "</td><td>" + nextArrival + "</td><td>" + minutesTo + "</td></tr>");


});