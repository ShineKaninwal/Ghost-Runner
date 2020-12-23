var gameState="play";
var tower,towerImage
var door,doorImage,doorsGroup
var climber,climberImage,climberGroup
var ghost,ghostImage
var invisibleBlock,invisibleGroup
var spookySound

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  
  climberGroup=new Group();
  
  invisibleGroup=new Group();
}

function draw(){
  background(0);
  
  if(gameState==="play"){
   
    if(tower.y>400){
    tower.y=300;
  }
    
    spawnDoors();
  
  if(keyDown("left_Arrow")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right_Arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }

  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
    drawSprites();

  }
    
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",220,250);
  }
  
  
}

function spawnDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50);
    door.addImage(doorImage);
    var climber=createSprite(200,10);
    climber.addImage(climberImage);
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;
    invisibleBlock.debug=true;
    ghost.depth=door.depth;
    ghost.depth+=1;
    doorsGroup.add(door);
    climberGroup.add(climber);
    invisibleGroup.add(invisibleBlock);
  }
}








