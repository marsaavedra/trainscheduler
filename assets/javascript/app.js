
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtUAdnQ1-uDp6NpI9hDn5TN52raQRoegk",
    authDomain: "train-scheduler-43302.firebaseapp.com",
    databaseURL: "https://train-scheduler-43302.firebaseio.com",
    projectId: "train-scheduler-43302",
    storageBucket: "train-scheduler-43302.appspot.com",
    messagingSenderId: "740968181245"
  };
  firebase.initializeApp(config);

    var database = firebase.database();



//the submit button for adding thr trains and their preperties
$('.btn').on("click", function(event){
    event.preventDefault();
    
    var trainName = $('#trainName-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var frequency = $('#frequency-input').val().trim(); 
    var firstTrain = moment($('#time-input').val().trim(), "HH:mm").subtract(1, "years").format("X");
    console.log("firstTrain: " + firstTrain);
    
    //connects to firbase (added F at the end to indicate that that property belongs in firebase)
    var newTrain = {
        name : trainName,
        destination : destination,
        frequency : frequency,
        firstTrain : firstTrain
    };


    //pushes new train into the database
    database.ref().push(newTrain);

    //checkpoint for debugging purposes in the console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTrain);
    
    //clear input areas 
    $('#trainName-input').val("");
    $('#destination-input').val("");
    $('#frequency-input').val("");
    $('#time-input').val("");
    
});
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrain;
    
    console.log("tFirstTrain: " + tFirstTrain);

    
    var currentTime = moment();
    
    console.log("current time: "+ moment(currentTime).format("HH:mm"));
    
	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    
    console.log("differenceTime: " + differenceTimes);
    
	var tRemainder = differenceTimes % tFrequency;
    
    console.log("tRemainder: " + tRemainder);
	
    var tMinutes = tFrequency - tRemainder;
    
    console.log("tMinutes: " + tMinutes);
    
	// To calculate the arrival time, add the tMinutes to the currrent time
	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
	
	console.log("Arrival: " + tArrival);


	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});


                 