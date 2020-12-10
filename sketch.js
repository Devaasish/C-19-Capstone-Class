var PLAY = 1;
var END = 0;
var gameState = PLAY;

var tower, towerImage;
var door, doorImage, doorsGroup;
var climber, climberImage, climbersGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlocksGroup;
var sound1;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  sound1 = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300)
  tower.velocityY = 1;
  tower.y = tower.height;
  tower.addImage("tower", towerImage);
  //sound1.play();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.4;
  ghost.addImage("ghost",ghostImage);
  
  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlocksGroup = new Group();
}

function draw(){
  background(0);
  
    if(gameState === PLAY){

    if(tower.y > 400){
      tower.y = 300;
    }

    if(keyDown("left")){
      ghost.x = ghost.x - 2;
    }

    if(keyDown("right")){
      ghost.x = ghost.x + 2;
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }

    if(invisibleBlocksGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = END;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    spawnDoors();
  }
  
  if(gameState === END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 250, 250);
  }
  
  drawSprites();
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImage);
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.lifetime = 800;
    ghost.depth = door.depth;
    ghost.depth += 1;
    
    doorsGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = door.velocityY;
    climber.lifetime = 800;
    
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = door.velocityY;
    invisibleBlock.lifetime = 800;
    invisibleBlock.visible = true;
    invisibleBlock.debug = true;
    
    invisibleBlocksGroup.add(invisibleBlock);
  }
}

