//Upload picture of you
//Check File Format 1
//Error msg if not correct
//Upload pic of someone else
//Check File format 2
//Click Analyse - on click 
//1. Analyse button will dissapear
//2.Face detect API call to get face ID - 'You' 
//3. Face detect API for photo 2 - face ID
//Face detect API call to get face ID
//create a faceId array list of comparison
//Face similarity API call and get score back
//Display the two pictures
//Display % score 
//Have array of Comments on results
var myKey = "0d93d33add804b55bd80ab113a76ec7c"; //FaceAPI key1
var myKey2 = "fbc6d14b131f44998dc56c4237dba6ca"; //FaceAPI key 2
//GET elements from DOM
var pagecontainer = $("#page-container")[0];
var pageheader = $("#top-message")[0];
var imgSelector1 = $("#my-file-selector1")[0];
var imgSelector2 = $("#my-file-selector2")[0];
var refreshbtn = $("#refresh-btn")[0];
var results = $("#results")[0];
var analysebtn = $("#analyse")[0];
//set up global vars
var file1Selected = false;
var file2Selected = false;
var pic1IsPhoto = false;
var pic2IsPhoto = false;
// Register button listeners
imgSelector1.addEventListener("change", function () {
    file1Selected = true;
    file2Selected = false;
    checkImage(function (file) {
    });
    //Might be a photo or might be some other file
});
imgSelector2.addEventListener("change", function () {
    file2Selected = true;
    file1Selected = false; //We only want to check one file @ a time
    checkImage(function (file) {
    });
});
analysebtn.addEventListener("click", function () {
    if (pic1IsPhoto == true && pic2IsPhoto == true) {
        alert("both files are photos we can proceed");
        var photo1 = imgSelector1.files[0]; //TEST
        var photo2 = imgSelector2.files[0];
        //AJAX for DETECT Face and get Face ID
        /**sendEmotionRequest(file, function (emotionScores) { //here we send the API request and get the response
                    // Find out most dominant emotion
                    currentMood = getCurrMood(emotionScores); //this is where we send out scores to find out the predominant emotion
                    changeUI(); //time to update the web app, with their emotion!
                     loadSong(currentMood);
        
                    //Done!!
                });
            }); */
        sendFaceDetect(photo1, function (faceID) {
        }); //end of Face Detect Call
        sendFaceDetect(photo2, function (faceID) {
        });
    }
    else {
        alert("Please upload two photo files");
    }
});
refreshbtn.addEventListener("click", function () {
    alert("You clicked the Refresh button and it is working");
});
//Function checks if File is an image (png or JPG) file
function checkImage(callback) {
    if (file1Selected == true) {
        var file = imgSelector1.files[0];
    }
    else {
        var file = imgSelector2.files[0];
    }
    var reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file); //used to read the contents of the file
    }
    else {
        console.log("Invalid file");
    }
    reader.onloadend = function () {
        //After loading the file it checks if extension is jpg or png and if it isnt it lets the user know.
        if (!file.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
            if (file1Selected == true) {
                pic1IsPhoto = false; //Resets values if file is not a photo;
            }
            else {
                pic2IsPhoto = false; //Reset value to false as current File not a photo
            }
            pageheader.innerHTML = "Please upload an image file (jpg or png)."; //SPECIFY WHCIH ONE IS THE PROBLEM
        }
        else {
            //if file is photo it sends the file reference back up
            if (file1Selected == true) {
                pic1IsPhoto = true;
            }
            else {
                pic2IsPhoto = true;
            }
            pageheader.innerHTML = ""; // MAKE INVISIBLE INSTEAD PLS
            //TAKE AWAY THE LABEL ON BUTTON PLEASE/INSTRUCTION
            callback(file);
        }
    };
}
//FUNCTION for FACE DETECTION using AJAX
function sendFaceDetect(file, callback) {
    $.ajax({
        url: "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false",
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "0d93d33add804b55bd80ab113a76ec7c");
        },
        type: "POST",
        // Request body
        data: file,
        processData: false
    })
        .done(function (data) {
        alert("success");
        callback(data); //Use data OR result not both - TO DEAL WITH LATER
    })
        .fail(function (error) {
        pageheader.innerHTML = "Sorry, something went wrong. :( Try again in a bit?";
        console.log(error.getAllResponseHeaders());
        alert("error");
    });
}
/**
 * Face
 */
var Face = (function () {
    //id, //age, //gender //you or other
    //picture
    function Face(faceID) {
    }
    return Face;
}());
var Match = (function () {
    function Match() {
    }
    return Match;
}());
