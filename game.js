var textChoices = ["advil has a candy coating. it's delicious. and it says right on the bottle 'do not have more than two.' well then do not put a candy coating around it.", "i had a job interview at an insurance company once and the lady said 'where do you see yourself in five years.' i said 'celebrating the fifth year anniversary of you asking me this question.'", "i used to live here in los angeles, on sierra bonita, and i had an apartment, and i had a neighbor. and whenever he would knock on my wall, i knew he wanted me to turn my music down. and that made me angry, cause i like loud music. so when he knocked on the wall, i'd mess with his head. i'd say, 'go around. i cannot open the wall. i don't know if you have a doorknob on the other side, but over here there's nothing... it's just flat.", "as an adult, i'm not supposed to go down slides. so if i end up at the top of a slide, i have to act like i got there accidentally. 'how'd i get up here, god damnit. i guess i have to slide down.'"];
//var textChoices = ["apple", "pie", "delicious", "bro", "cats", "awesome", "love", "some", "chocolate", "cake"]

var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

var textToType;
var textTyped;
var textTypedIndexCount;
var mistypes = 0;
var wins = 0;
var displayErrorSuccess = document.querySelector('#displayErrorSuccess');
var displayTextToType = document.querySelector('#displayTextToType');
var displayTextTheyTyped = document.querySelector('#displayTextTheyTyped');
var displayWins = document.querySelector('#displayWins');
var displayMistypes = document.querySelector('#displayMistypes');

function initializeGame(){
  displayTextTheyTyped.innerHTML = "";
  textToType = textChoices[Math.floor(Math.random()*textChoices.length)];
  textTyped = "";
  textTypedIndexCount = 0;
}

function showText(){
  displayTextToType.innerHTML = "Type this text:<br> " + textToType;
}

function removeErrorSuccess(){
  displayErrorSuccess.classList.remove('error');
  displayErrorSuccess.classList.remove('success');
  displayErrorSuccess.classList.remove('won');
  displayErrorSuccess.innerHTML = "";
}

function showError(l){
  displayErrorSuccess.classList.add('error');
  displayErrorSuccess.innerHTML = "<span>" + l + "</span> is not the current key :(";
}

function showSuccess(){
  displayErrorSuccess.classList.add('success');
  displayErrorSuccess.innerHTML = "Boom! Good job!!!";
}

function showYouWon(){
  displayErrorSuccess.classList.add('won');
  displayErrorSuccess.innerHTML = "YOU DID IT YOU ROCK STAR! Let's play again!";
}

function showWins(){
  displayWins.innerHTML = "wins: " + wins;
}

function showMistypes(){
  displayMistypes.innerHTML = "mistypes: " + mistypes;
}

initializeGame();
showText();
showWins();
showMistypes();

document.onkeyup = function(event){
  if (textTypedIndexCount < textToType.length){
    var key = event.key;

    if (key == textToType[textTypedIndexCount]){
      removeErrorSuccess();
      showSuccess();

      textTypedIndexCount++;

      displayTextReplace = textToType.substr(textTypedIndexCount);

      if (displayTextReplace[0] == " "){
        //if first character is a space then
        displayTextReplace = "<span>&nbsp;</span>" + displayTextReplace.substr(1);
      }

      displayTextToType.innerHTML = "<p>" + displayTextReplace + "</p>";

      if (key == " "){
         textTyped += "<span>&nbsp;</span>"
      }else{
        textTyped += key;
      }

      displayTextTheyTyped.innerHTML = "You typed: " + textTyped;

      //check if won
      if (textTypedIndexCount == textToType.length){
        wins++;
        showWins();

        //display you won
        removeErrorSuccess();
        showYouWon();

        //reset game
        initializeGame();
        showText();
      }
    }else{
      mistypes++;
      showMistypes();

      removeErrorSuccess();
      showError(key);
    }
  }
}
