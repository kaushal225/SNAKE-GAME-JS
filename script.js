'use strict'

let snake=[{x:0,y:0}]; //positions of snake body element
let food={x:3,y:3}; //position of food
let direction={x:0,y:0};
let pretime=0;
let score=0;
let b=document.getElementById('score');
let is_pause=false;
const pause_button=document.getElementById("pause");
const cont_button=document.getElementById("continue");
const start_page=document.getElementById('startf');
let speed=2;
const start_btn=start_page['start'];
let run=Array.from(document.getElementsByClassName('running'));
let strt=Array.from(document.getElementsByClassName('beg'));
 //---------------------------------------------------------------


function game_start(){
    run.forEach(element => {
        element.classList.remove('hidden');
    });
    strt.forEach(element => {
        element.style.display='none';
    });
    speed=parseInt(start_page['level'].value);
    console.log(speed);
    window.requestAnimationFrame(main);
   
}

function handle_cont(){
    pause_button.classList.remove("hidden");
    cont_button.classList.add("hidden");
    is_pause=false;
    main();

}

function handle_pause(){
      pause_button.classList.add('hidden');
      cont_button.classList.remove('hidden');
}




function main(ctime){
    
    if(!is_pause)
         requestAnimationFrame(main);
    else{
         handle_pause();
    }
    
    //console.log((ctime-pretime));
    if(((ctime-pretime)/1000)<(1/speed))
     return;
    pretime=ctime;
    //console.log(ctime);
    gameEngine();
}


//--------------------------------------------------------------------

function isCollide(snake){
    for(let i=1;i<snake.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
           return true;
    }
    return false;
}


//------------------------------------------------------------------------


function gameEngine(){

    //when snake collides
    
    if(isCollide(snake)){
      alert("Game over press any key to start again");
      snake=[{x:10,y:10}];
      food={x:3,y:3};
      direction={x:0,y:0};
      score=0;
      b.innerHTML="score:"+score;

    }
    //console.log(food.x,snake[0].x,food.y,snake[0].y);
    //Eat the food
    if(food.x===snake[0].x && food.y===snake[0].y){
        //console.log("eaten");
        snake.unshift({x:snake[0].x+direction.x,y:snake[0].y+direction.y});
        food.x=Math.round(2+14*Math.random());
        food.y=Math.round(2+14*Math.random());
        score++;
        b.innerHTML="score:"+score;

    }
     //console.log(snake[0].x,snake[0].y);
    //moving the snake
    for(let i=snake.length-2;i>=0;i--){
        snake[i+1].x=snake[i].x;
        snake[i+1].y=snake[i].y;
        //snake[i+1]={...snake[i]};//destructuring doing the same thing as 65 and 66 combined
    }
    snake[0].x=(snake[0].x+direction.x);//used 
    snake[0].y=(snake[0].y+direction.y);
    if(snake[0].x>18)
      snake[0].x=1;
    if(snake[0].x<1)
      snake[0].x=18;
    if(snake[0].y>18)
      snake[0].y=1;
      if(snake[0].y<1)
    snake[0].y=18;



    //displaying snake and food
    let a=document.getElementsByClassName('game-screen')[0];
    a.innerHTML="";
    snake.forEach((element,index) => {
        let snake_element=document.createElement('div');
        snake_element.style.gridRowStart=element.y;
        snake_element.style.gridColumnStart=element.x;
        if(index===0)
          snake_element.classList.add('head');
        else
          snake_element.classList.add('snake');
        a.appendChild(snake_element);
        
    });

    let f=document.createElement('div');
    f.style.gridColumnStart=food.x;
    f.style.gridRowStart=food.y;
    f.classList.add('food');
    a.appendChild(f);


}


//------------------------------------------------------------------

window.addEventListener("keydown",(ev)=>{
    //is_pause=true;
    //direction={x:0,y:1};
    if(is_pause&&ev.key!=" ")
      return ;
    switch(ev.key){
        case "ArrowUp":
            direction.x=0;
            direction.y=-1;
            break;
        case "ArrowDown":
            direction.x=0;
            direction.y=1;
            break;
        case "ArrowLeft":
            direction.x=-1;
            direction.y=0;
            break;
        case "ArrowRight":
            direction.x=1;
            direction.y=0;
            break;
        case " ":
            console.log(is_pause);
            is_pause=!is_pause;
            if(!is_pause)
               handle_cont();

    }
})


//------------------------------------------------------------------------

cont_button.addEventListener('click',()=>{
    console.log('efgh');
    handle_cont();
})

pause_button.addEventListener('click',()=>{
    console.log("abcd");
    is_pause=true;
    handle_pause();

})

start_btn.addEventListener('click',()=>{
  game_start();
})

start_page.addEventListener('submit',(e)=>{
    e.preventDefault();
})
