var editButton = document.querySelector('.edit');
var playBallButton = document.querySelector('.playball');
var singleButton = document.querySelector('.single');
var doubleButton = document.querySelector('.double');
var tripleButton = document.querySelector('.triple');
var homerunButton = document.querySelector('.homerun');
var scores = document.querySelectorAll('.score');
var swapButton = document.querySelector('.swap');



/* Exercise 0: Warmup! */
/* Create an event listener for the 'edit' button on the title. When you click the edit button, it should:
      1. Prompt the use for a 'name' and save it in a variable.
      2. Replace the text "Person" with the text from that prompt.
*/
editButton.addEventListener('click', changeTitle);

function changeTitle() {
  var name = prompt('Enter a name:');
  document.querySelector('.name span').innerHTML = name;
}





/* Exercise 1 */
/* Write a function that will:
      1. Create a new 'div' with a class and save  to a variable.
      2. Set the class of that variable to '.batter'.
      3. Insert that new div into the element with the class '.grass'.
 */
function addBatter() {
  var newBatter = document.createElement('div');
  newBatter.setAttribute('class', 'batter')
  document.querySelector('.grass').appendChild( newBatter );
}



/* Exercise 2 */
/* Insert Play Ball Event Listener. When you click it, it should do the following:
      1. Reset the scoreboard '.score' elements to say 0.
      2. Set the class of <body> to ONLY either .homeActive or .awayActive
      3. Remove all '.batter' elements from the DOM completely
      4. Call the addBatter() function to insert a new batter on the field.
*/
playBallButton.addEventListener('click', startGame);

function startGame() {
  /* reset scores to 0 */
  for( i=0; i<scores.length; i++ ) {
    scores[i].innerHTML = "0";
  }

  /* Add 'awayActive' class to the body */
  document.querySelector('body').className = "awayActive";

  /* Remove all batter elements from page */
  var batters = document.querySelectorAll('.batter');
  for( i=0; i<batters.length; i++ ) {
    batters[i].parentNode.removeChild(batters[i]);
  }

  /* create new div with ".batter" class, and insert at bottom of ".grass" element */
  addBatter();
}



/* Exercise 3 */
/* Add event observer to 'single' button. When you click it, it should:
      1. Save all '.batter' elements to a variable.
      2. Use a loop to iterate through all those elements and:
          a. if batter has ID 'first', change his ID to 'second'
          b. if batter has ID 'second', change his ID to 'third'
          c. if batter has ID 'third', change his ID to 'home', then remove that batter from DOM using clearBatter function (which we will write next)
          d. if batter has ID 'home', DO NOTHING
          e. if batter HAS NO ID, move him to first.
                    Note: initially the batter has NO ID, we don't add a 'home' ID until we move him from third to home.
      3. Create a new <div> element and give it a class '.batter'.
      4. Append that div at the end of the 'infield' element.
*/
singleButton.addEventListener('click', single);

function single() {
  /* save all '.batters' to a variable */
  var batters = document.querySelectorAll('.batter');

  /* loop through all batters, move them forward by 1 */
  for( i=0; i<batters.length; i++ ) {
    var batter = batters[i];
    /* Move batter on 1st to 2nd */
    if( batter.id.indexOf('first') > -1 ) {
      batter.id = "second";
    /* Move batter on 2nd to 3rd */
    } else if( batter.id.indexOf('second') > -1 ) {
      batter.id = "third";
    /* Move batter on 3st to home, then clear that batter with clearBatter function */
    } else if( batter.id.indexOf('third') > -1 ) {
      batter.id = "home";
      clearBatter( batter );
    /* if on home, do nothing, wait for clearBatter to take care of it */
    } else if( batter.id.indexOf('home') != -1 ) {
      /* do Nothing! */
    /* Move batter on home to 1st */
    } else {
      batter.id = "first";
    }
  }  

  /* Insert next batter */
  addBatter();
}





/* Exercise 4 */
/* Write a function called clearBatter that will:
      1. Accept an HTML element as a parameter.
      2. Use a setTimeout with a timeout of 1 seconds.
      3. Remove the element from the DOM
      4. Increase the score of the 'active' Team by 1, by calling the increaseScore function (which we will write next)

   We can use this function after each hit to clean up or DOM heirarchy. 
*/
function clearBatter( batter ) {
  /* put it in a timeout, so it runs after 1 seconds */
  setTimeout(function() {
    batter.parentNode.removeChild( batter );
    increaseScore();
  }, 1000);  

}





/* Exercise 5 */
/* Write a function called increaseScore that will:
    1. Check the class of the <body> tag to see which team is active.
    2. Increase the '.score' element value for that team by 1.
*/
function increaseScore() {
  var activeTeam = document.querySelector('body').className 
  var score;
  /* if home team was passed, increase home team score */
  if( activeTeam === "homeActive" ) {
    score = document.querySelector('.home .score');
    score.innerHTML = parseInt( score.innerHTML ) + 1;
  /* if away team was passed, increase away team score */
  } else if ( activeTeam === "awayActive" ) {
    score = document.querySelector('.away .score');
    score.innerHTML = parseInt( score.innerHTML ) + 1;
  }
}





/* Exercise 6 */
/* Insert event listener for 'Swap Teams' button that will:
      1. Check the 'class' attribute of the <body> element.
          a. If it is 'awayActive', change it to 'homeActive'.
          b. If it is 'homeActive', change it to 'awayActive'.
      2. Clear all '.batter's on the field
      3. Call "addBatter()" to insert a new batter on the field.
*/
swapButton.addEventListener('click', swapTeams);

function swapTeams() {
  var body = document.querySelector('body');
  var batters = document.querySelectorAll('.batter');

  if( body.className.indexOf('homeActive') > -1 ) {
    body.setAttribute('class', 'awayActive');
  } else if( body.className.indexOf('awayActive') > -1 ) {
    body.setAttribute('class', 'homeActive');
  }

  for( i=0; i<batters.length; i++ ) {
    batters[i].parentNode.removeChild(batters[i]);
  }
  addBatter();
}




/* Exercise 7 */
/* Add event observer to 'double' button. When you click it, it should:
      1. Save all '.batter' elements to a variable.
      2. Use a loop to iterate through all those elements and:
          a. if batter has ID 'first', change his ID to 'third'
          b. if batter has ID 'second', change his ID to 'home', then remove that batter from DOM using clearBatter function
          c. if batter has ID 'third', change his ID to 'home',, then remove that batter from DOM using clearBatter function
          d. if batter has ID 'home', DO NOTHING
          e. if batter HAS NO ID, move him to first.
                    Note: initially the batter has NO ID, we don't add a 'home' ID until we move him from third to home.
      3. Create a new <div> element and give it a class '.batter'.
      4. Append that div at the end of the 'infield' element.
*/
doubleButton.addEventListener('click', double);

function double() {
  /* save all '.batters' to a variable */
  var batters = document.querySelectorAll('.batter');

  /* loop through all batters, move them forward by 1 */
  for( i=0; i<batters.length; i++ ) {
    var batter = batters[i];
    /* Move batter on 1st to 2nd, then to 3rd */
    if( batter.id.indexOf('first') > -1 ) {
      batter.id = "third";
      // setTimeout( function() { batter.id = "third" }, 1000 );
    /* Move batter on 2nd to 3rd, then to home, then remove that batter from DOM using clearBatter function */
    } else if( batter.id.indexOf('second') > -1 ) {
      batter.id = "home";
      // setTimeout( function() { batter.id = "home" }, 1000 );
      clearBatter( batter );
    /* Move batter on 3st to home, then clear that batter with clearBatter function */
    } else if( batter.id.indexOf('third') > -1 ) {
      batter.id = "home";
      clearBatter( batter );
    /* if on home, do nothing, wait for clearBatter to take care of it */
    } else if( batter.id.indexOf('home') != -1 ) {
      /* do Nothing! */
    /* Move batter on home to 1st, then to 2nd */
    } else {
      batter.id = "second";
      // setTimeout( function() { batter.id = "second" }, 1000 );
    }
  }  

  /* Insert next batter */
  addBatter();
}






/* Exercise 8 */
/* Add event observer to 'triple' button. When you click it, it should:
      1. Save all '.batter' elements to a variable.
      2. Use a loop to iterate through all those elements and:
          a. if batter has ID 'first', change his ID to 'third'
          b. if batter has ID 'second', change his ID to 'home', then remove that batter from DOM using clearBatter function
          c. if batter has ID 'third', change his ID to 'home',, then remove that batter from DOM using clearBatter function
          d. if batter has ID 'home', DO NOTHING
          e. if batter HAS NO ID, move him to first.
                    Note: initially the batter has NO ID, we don't add a 'home' ID until we move him from third to home.
      3. Create a new <div> element and give it a class '.batter'.
      4. Append that div at the end of the 'infield' element.
*/
tripleButton.addEventListener('click', triple);

function triple() {
  /* save all '.batters' to a variable */
  var batters = document.querySelectorAll('.batter');

  /* loop through all batters, move them forward by 1 */
  for( i=0; i<batters.length; i++ ) {
    var batter = batters[i];
    /* Move batter on 1st to 2nd, then to 3rd */
    if( batter.id.indexOf('first') > -1 ) {
      batter.id = "home";
      clearBatter( batter );
    /* Move batter on 2nd to 3rd, then to home, then remove that batter from DOM using clearBatter function */
    } else if( batter.id.indexOf('second') > -1 ) {
      batter.id = "home";
      clearBatter( batter );
    /* Move batter on 3st to home, then clear that batter with clearBatter function */
    } else if( batter.id.indexOf('third') > -1 ) {
      batter.id = "home";
      clearBatter( batter );
    /* if on home, do nothing, wait for clearBatter to take care of it */
    } else if( batter.id.indexOf('home') != -1 ) {
      /* do Nothing! */
    /* Move batter on home to 1st, then to 2nd */
    } else {
      batter.id = "third";
    }
  }  

  /* Insert next batter */
  addBatter();
}







/* Exercise 9 */
/* Add event observer to 'homerun' button. When you click it, it should:
      1. Save all '.batter' elements to a variable.
      2. Use a loop to iterate through all those elements and:
          a. if batter has ID 'first', change his ID to 'home', then remove that batter from DOM using clearBatter function
          b. if batter has ID 'second', change his ID to 'home', then remove that batter from DOM using clearBatter function
          c. if batter has ID 'third', change his ID to 'home',, then remove that batter from DOM using clearBatter function
          d. if batter has ID 'home', DO NOTHING
          e. if batter HAS NO ID, change his ID to 'home', then remove that batter from DOM using clearBatter function
                    Note: initially the batter has NO ID, we don't add a 'home' ID until we move him from third to home.
      3. Create a new <div> element and give it a class '.batter'.
      4. Append that div at the end of the 'infield' element.
*/
homerunButton.addEventListener('click', homerun);

function homerun() {
  /* save all '.batters' to a variable */
  var batters = document.querySelectorAll('.batter');

  /* loop through all batters, move them forward by 1 */
  for( i=0; i<batters.length; i++ ) {
    var batter = batters[i];
    /* Move batter on 1st home, then remove that batter from DOM using clearBatter function */
    if( batter.id.indexOf('first') > -1 ) {
      batter.id = "home";
      clearBatter( batter );
    /* Move batter on 2nd to home, then remove that batter from DOM using clearBatter function */
    } else if( batter.id.indexOf('second') > -1 ) {
      batter.id = "home";
      clearBatter( batter );
    /* Move batter on 3st to home, then clear that batter with clearBatter function */
    } else if( batter.id.indexOf('third') > -1 ) {
      batter.id = "home";
      clearBatter( batter );
    /* if on home, do nothing, wait for clearBatter to take care of it */
    } else if( batter.id.indexOf('home') != -1 ) {
      /* do Nothing! */
    /* Move batter on home to home */
    } else {
      batter.id = "home";
      clearBatter( batter );
  }
  }  

  /* Insert next batter */
  addBatter();
}





/* Additional Exercises */
/* If time permits, here's some things we can do to spice up the simulator:
        1. Implement the inning logic.
        2. Implement 'game over' logic.
        2. Have some sort of on screen message for each 'hit' from a batter.
*/





















