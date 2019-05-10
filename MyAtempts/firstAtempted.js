// ==UserScript==
// @name         Captcha Solver [KissAnime] 
// @author       Ognaiser
// @version      2019.5.10
// @icon         http://kissanime.ru/Content/images/favicon.ico
// @description  Saves  responses to KissAnime captcha and auto-selects images if it knows the answer.
// @grant        none
// @include      *://kissanime.ru/Special/AreYouHuman2*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

/**
 * Function that removes the last answer and clicks element that goes back in to the captcha
 */
function wrongAnswer() {
    var link = document.getElementsByTagName("a");
    link = link[0];
    link.click();
}


function main() {

    var $ = window.jQuery;
    var formVerify = document.getElementById("formVerify1"); //Form that contains all the captcha elements




}


main();