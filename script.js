var game_data;
var current_state;

var stim = 0;
var points = 0;

let currentSound = null;

function playBackAudio(givenAudio) {
  
  if (currentSound != null) { // checking to see if a sound is playing becuase its for background so if they choose another one we stop the current one and play the new one
      currentSound.pause();
  }

  
  currentSound = new Audio(givenAudio);
  currentSound.play();
}

function playAudio(givenAudio){
    
  let sound = new Audio(givenAudio)
  sound.play();
}



$(document).ready(function() {
  /*
  setTimeout(function() {
    $('#splash').hide();
    $('#main').show();

    
  }, 10000);
  */
  setTimeout(function(){
    $('#splash').hide();
    $('#splashy').show();
    $('#music_buttons').hide();
   
        setTimeout(function(){
                
                $('#splashy').hide();
                $('#main').show();
            },10000);

    }, 13000);
  

  $.getJSON("game.json", function(data) {
    game_data = data;
    current_state = data['start_state'];
    $('#game_text').html(game_data['states'][data['start_state']]['text']);


    $("#game_img").html(game_data['states'][current_state]['image_change']);

  });

  

  $('#but_a').click(function() {
    key_input('A');
  });

  $('#but_b').click(function() {
    key_input('B');
  });

 



});





function next_state(state) {
  console.log("Current State = " + current_state + " --> New State= " + state);
  current_state = state;

  if (game_data['states'][ current_state ]['play_sound'] != null){
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', game_data['states'][ current_state ]['play_sound']);
    audioElement.play();
  }
  if (game_data['states'][current_state]['text'] != null) {
    $('#game_text').html(game_data['states'][current_state]['text']);
    
    
  } else {
    console.log("no text");
    
    if (game_data['states'][ current_state ]['restart_cmd'] != null){
      location.reload();
    }
    if (game_data['states'][ current_state ]['end_cmd'] != null){
      window.close();
    }
    next_state(game_data['states'][current_state]['next_state'])
  }

  if (game_data['states'][current_state]['image_change'] != null) {
    // the image was not working because I had it in the else however I put the img src in the same state so i needed to check for both the text and image then the else would move forward in states 
    //console.log("hellopasdada")
    $("#game_img").html(game_data['states'][current_state]['image_change']);
  }
  
}

function pick_a_winner( input_array ) {
  return  input_array[(Math.floor(Math.random() * input_array.length))];
}

function key_input(what_key) {

  /*
  for (i = 0; i < game_data['states'][current_state]['next_state'].length; i++) {
    if (what_key == game_data['states'][current_state]['next_state'][i]['key_input']) {
      next_state(game_data['states'][current_state]['next_state'][i]['state_name'])
    }
  }
  */
  for(i=0; i< game_data['states'][current_state]['next_state'].length; i++){
    if( what_key == game_data['states'][current_state]['next_state'][i]['key_input']) {
      if ( typeof game_data['states'][current_state]['next_state'][i]['state_name'] == "string"){
        next_state(game_data['states'][current_state]['next_state'][i]['state_name'])
      }else{
        next_state(pick_a_winner(game_data['states'][current_state]['next_state'][i]['state_name']) )
          }
      } 
  }

  console.log(what_key);
}
