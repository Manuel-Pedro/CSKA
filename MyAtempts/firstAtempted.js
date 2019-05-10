// ==UserScript==
// @name         Captcha Solver [KissAnime] 
// @author       Ognaiser
// @version      0.0.1
// @icon         http://kissanime.ru/Content/images/favicon.ico
// @description  Saves  responses to KissAnime captcha and auto-selects images if it knows the answer.
// @grant        none
// @include      *://kissanime.ru/Special/AreYouHuman2*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

//Global
//External
var $ = window.jQuery;

/**
 * Function that removes the last answer and clicks element that goes back in to the captcha
 */
function fixWrongAnswer() {
    var knowWords = localStorage.getItem("CSKA-knowWords");
    if (knowWords && knowWords.length > 0) {
        localStorage.removeItem(knowWords[knowWords.length - 1])
        console.log("Deleted the last entry.");
    } else {
        console.log("No entries found.");
    }
    var link = document.getElementsByTagName("a");
    link = link[0];
    console.log("Redirecting page. . . .");
    link.click();
}




function fixVersionMissMatch(textToDisplay, currentVersion) {
    localStorage.removeItem("CSKA-knowWords");
    localStorage.removeItem("helpWord");
    localStorage.setItem("KCS-version", currentVersion);
    console.log(textToDisplay);
}

function clickEvents(clickedItem, clickedImage, imageIndexValue) {
    
    if ($(clickedImage).attr("class") === "imgCapSelect") { //Is the Image Selected ?
        clickedImgs[localStorage.getItem("KCS-helpWord")] = imageIndexValue;
    } else {
        words.forEach(function (word) {
            if (imageIndexValue === clickedImgs[word]) {
                delete clickedImgs[word];
            }
        });
    }

    if (Object.keys(clickedImgs).length === words.length) {
        for (var key in clickedImgs) {
            if (key !== multiImageFlag[0] && key !== multiImageFlag[1]) {
                localStorage.setItem("KCS-" + key, imageObj["image" + clickedImgs[key].toString()]);
            } else {
                var currentSolution = localStorage.getItem(key);
                try {
                    JSON.parse(currentSolution);
                    currentSolution[Object.keys(currentSolution).length] = imageObj["image" + clickedImgs[key].toString()];
                }
                catch (err) {
                    if (PHObjFlag === 0) {
                        placeholderObjOne[0] = currentSolution;
                        placeholderObjOne[1] = imageObj["image" + clickedImgs[key].toString()];
                        currentSolution = placeholderObjOne;
                        PHObjFlag = 1;
                    } else if (PHObjFlag === 1) {
                        placeholderObjTwo[0] = currentSolution;
                        placeholderObjTwo[1] = imageObj["image" + clickedImgs[key].toString()];
                        currentSolution = placeholderObjTwo;
                        PHObjFlag = 2;
                    }
                }
                JSON.stringify(currentSolution);
                localStorage.setItem("KCS-" + key, currentSolution);
            }
        }
        alertBoxText.innerText = "Selections complete.  Loading next page. . . .";
    }

    if (Object.keys(clickedImgs).length < words.length) {
        words.forEach(function (word, index) {
            if (clickedImgs[word] === undefined && askedForHelp === 0) {
                askForHelp(word);
                askedForHelp = 1;
            }
        });
        askedForHelp = 0;
    }

}

function main() {
    //Form that contains all the captcha elements
    var formVerify = document.getElementById("formVerify1");
    //Version Specific
    var currentVersion = "0.0.1"

    if (!formVerify) {
        fixWrongAnswer()
    } else {

        //Manage Version
        var installMessage = "Installed Kiss Anime Captcha Solver by Ognaiser"
        var updateMessage = "Updated Kiss Anime Captcha Solver by Ognaiser"
        localStorageCSKAVersion = localStorage.getItem("KCS-version")
        if (localStorageCSKAVersion === null) { fixVersionMissMatch(installMessage, currentVersion); }
        if (localStorageCSKAVersion !== currentVersion && localStorageCSKAVersion !== null) { fixVersionMissMatch(updateMessage, currentVersion); }

        var imageElements = $("#formVerify1").find("img").toArray();
        imageElements.forEach(function (currentImage, imageIndex) {
            currentImage.onclick = function () {
                //Todo:
                //onClickEvents("image", currentImage, imageIndex); 
            }
        });
    }


}


main();