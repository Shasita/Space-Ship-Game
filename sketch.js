var bg, bg_img;
var spaceShip, spaceShip_img;
var missile1_img, missile2_img, missile3_img;
var alien1_img, alien2_img, alien3_img;
var aliensGrp, missilesGrp;
var gameState = 'play';
var gameOver_img, reset_button, reset_button_img;
var score = 0;
var gameOver_snd, replay_snd, start_snd;

function preload(){
  //background
 bg_img = loadImage("Images/spaceBg.jpeg");

//space ship
 spaceShip_img = loadImage("Images/spaceship.png");

  //missiles
 missile1_img = loadImage("Images/misile1.png");
 missile2_img = loadImage("Images/misile2.png");
 missile3_img = loadImage("Images/misile3.png");

 //aliens
 alien1_img = loadImage("Images/alien1.png");
 alien2_img = loadImage("Images/alien2.png");
 alien3_img = loadImage("Images/alien3.png");

 //gameOver
 gameOver_img = loadImage("Images/gameOver.png");

 //reset
 reset_button_img = loadImage("Images/replay button.png");

 //loading the sounds
  gameOver_snd = loadSound("Sounds/game over.wav");
  replay_snd = loadSound("Sounds/replay.wav");
  start_snd = loadSound("Sounds/start.wav");
 
}

function setup() {

  createCanvas(windowWidth, windowHeight);

//creating the background
  bg =  createSprite(width/2, height/2);
  bg.addImage(bg_img);
  bg.velocityY = 3;
  bg.scale = 2;

//creating the spaceShip
  spaceShip = createSprite(width/2, 550, 100, 100);
  spaceShip.addImage(spaceShip_img);
  spaceShip.scale = 0.3;
  spaceShip.debug = false;
  spaceShip.setCollider('circle', 0, 0, 150)

  reset_button = createSprite(width/2, height/2);
  reset_button.addImage(reset_button_img);
  reset_button.scale = 0.8;
  reset_button.visible = false;

  aliensGrp = new Group ();
  missilesGrp = new Group ();

  start_snd.play();
}

function draw() {
  background("peachpuff"); 

  if(gameState === 'play'){

    //making the background infinite
  if(bg.y >= height){
    bg.y = height/2;
  }

//moving the space ship left and right
  if(keyDown(LEFT_ARROW)){
    spaceShip.x = spaceShip.x - 5;
  }

  if(keyDown(RIGHT_ARROW)){
    spaceShip.x = spaceShip.x + 5;
  }

//shooting the missiles after pressing the space button
  if(keyDown('space')){
    spawnMissiles();
  }

  //destroying the monsters when the missiles touches them
  if(aliensGrp.isTouching(missilesGrp)){
    aliensGrp.destroyEach();
    missilesGrp.destroyEach();
    score ++;
  }

//calling the user defined function
  spawnAliens();

  if(aliensGrp.isTouching(spaceShip)){
    gameState = 'end';
   gameOver_snd.play();
  }
}

  else if(gameState == 'end'){
    console.log('touched')
    bg.velocityY = 0;
    missilesGrp.setVelocityYEach(0);
    aliensGrp.setVelocityYEach(0);

    bg.x = width/2;
    bg.y = height/2;
    bg.addImage(gameOver_img);
    bg.scale = 0.7;

    reset_button.visible = true;
   
    if(mousePressedOver(reset_button)){
      restart();
      replay_snd.play();
    }
  
}


  drawSprites();
  textSize(40);
  fill ("white");
  textAlign (CENTER);
  text (score, width-200, 100);
}

function restart(){

  gameState = 'play';

  bg.velocityY = 3;
  bg.addImage(bg_img);
  bg.scale = 2;

  reset_button.visible = false;

  score = 0;
  aliensGrp.destroyEach();
  console.log('restart');

}

function spawnMissiles(){

//creating the sprite
    var missiles = createSprite(spaceShip.x, spaceShip.y - 50, 100, 100);
    missiles.velocityY = -2;

    var rand = Math.round(random(1,3));

//assigning random images to missiles
    switch(rand){
      case 1 : missiles.addImage(missile1_img);
      break;
      case 2 : missiles.addImage(missile2_img);
      break;
      case 3 : missiles.addImage(missile3_img);
      break;
      default : break;
    }

//assigning the scale
    missiles.scale = 0.2;
    missiles.lifetime = -height/missiles.velocityY;
    missilesGrp.add(missiles);
}

function spawnAliens(){

  if(frameCount % 60 === 0){

//creating the sprite
    var aliens = createSprite(Math.round(random(100, width-100)), 0, 50, 50);
    aliens.velocityY = 2;

    var rand = Math.round(random(1,3));
    
//assigning random images to the aliens
    switch(rand){
      case 1 : aliens.addImage(alien1_img);
      break;
      case 2 : aliens.addImage(alien2_img);
      break;
      case 3 : aliens.addImage(alien3_img);
      break;
      default : break;
    }

//assigning the scale
    aliens.scale = 0.2;

    aliens.lifetime = -height/aliens.velocityY;
    aliensGrp.add(aliens);

  }
}