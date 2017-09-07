// first we are going to get the elements

// chose what you want to grab from the html
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');

// then it is going to be building it on the page


// create a function and when it is called... it will then do ...
// once the function is doing something in the console you have to link it to the html page so it is ready to go
function togglePlay(){

  //using a ternary operator
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();

  // there is only a pause function not a play function
  // if the video is paused is true then play it, otherwise do
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//listening for the event means you don't have to hook into the event
function updateButton (){
  // this is bound to the update
  // if this is true then use the '►' otherwise use the '❚ ❚'
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
  console.log(icon);
  // console.log('Update the button');
}


// skipping function
// how to determine how long they will skip - data-skip
// can put a data-skip on anything

function skip(){
  console.log(this.dataset.skip);
  // remember that the parsefloat will convert it into a number that can be used
  video.currentTime += parseFloat(this.dataset.skip);

}

function handleRangeUpdate(){
  console.log(this.value);
  console.log(this.name);
  // need to get some help understanding this piece of the code
  video[this.name] = this.value;
}

// the progressBar
function handleProgress(){
  // we are going to be updating the flex-basis value. this will correspond to where we are through the video
  const percent = (video.currentTime/ video.duration) * 100;
  // take the progress bar that has been previously selected and pop in what we are doing to do for the change
  progressBar.style.flexBasis = `${percent}%`;
}

// the best way to change the play function is to listen out for the change and then create a function that will trigger

function scrub(e){
  // offset is what we've already used
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}


// let's break down this listener. you are choosing the constant, from the first step. you are getting to 'listen' (this is what jquery does) out for the event that


// hook up the event listeners
// now 'listen out for the event' and then run the function we want to do.
// select from html. listen out for the event. create the function that you want to do to the thing
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

// can go back and have it for the click up and teh click down
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

// let the mousedown false as the flag first
let mousedown = false;
progress.addEventListener('click', scrub);
// we are passing the event through
// when the mousedown is triggered, if the first one is true it move onto the next function
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// figure out how to do the full screen button and add it in
