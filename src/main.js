import {Jokes} from "./joke.js"
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


$(document).ready(function() {
  $('button#start-game').click(function() {
    $('button#start-game').hide();
    $('div#game-body').show();
    let score = 0;
    let delay = 0;

    setInterval(function() {
      delay = 10000;
      let jokes = new Jokes();
      let promise = jokes.getJokes();
      promise.then(function(response){
        const body = JSON.parse(response);
        attachContactListeners(body, score);
        $("#setup").text(body[0].setup);
        $('#punchlines').html(punchlinesHTML(body));
        console.log(body[0]);
      }, function(error){
        $(".showErrors").text(`There was an error processing your request: ${error.message}`);
      })
    }, delay);









  });
});



function punchlinesHTML(body) {
  let newHTML = "";
  let startingIndex = Math.floor(Math.random() * 5);
  console.log(startingIndex);
  for(let i = 0; i < 5; i++) {
    newHTML += `<button id="${body[(startingIndex + i) % 5].id}" type'button'>${body[(startingIndex + i) % 5].punchline}</button>`;
  }
  return newHTML;
}

function attachContactListeners(body, score) {
  $('div#punchlines').on('click', 'button', function(){
    let id = this.id;
      console.log(id);
    if(body[0].id === parseInt(id)){
      $("div#answer").text("That's correct.");
      score += 1;
      $("div#score p").text(`Score: ${score}`);
    }else{
      $("div#answer").text("That's incorrect.");
    }
  });

}
