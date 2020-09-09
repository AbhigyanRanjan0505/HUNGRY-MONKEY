//creates variables
var bananaImg, obstacleImg, obstacleGroup, backImg, score, monkeyAni, back, monkey, END, ground, fruitsg, obstacleg, bananaImg, banana, stone, stoneImg, PLAY, gamestate, c, g, monkeylImg, gImg;

function preload(){
  //sets a background
  backImg=loadImage("jungle.png");
  
  bananaImg = loadImage("banana.png");
  
  stoneImg = loadImage("stone.png");
  
  //sets animation to the monkey
  monkeyAni=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  
  //sets monkey animation when game is over
  monkeylImg=loadImage("capture (2).png");

  //adds image to game over
  gImg = loadImage("Capture.png");
}

function setup() {
  //creates a canvas
  createCanvas(400, 400);
  
  //creates background and its properties
  back = createSprite(200,200,10,10);
  back.addImage(backImg);
    
  //creates monkey and its properties
  monkey = createSprite(35,394,10,10);
  monkey.addAnimation("m",monkeyAni);
  monkey.scale=0.1;
 
  //creates ground and ist properties
  ground = createSprite(200,394,400,10);
  ground.visible = false;
  
  //creates gameover and ist properties
   g = createSprite(200,200,0,0);
   g.addImage(gImg);
   g.visible = false;
  
  //sets values
  score=0;
  c=0;
  PLAY=1;
  END=0;
  
  //sets gamestate
  gameState=PLAY;
  
  //creates groups
  fruitg = new Group();
  stoneg = new Group();
}

function draw() {
  //creates a background
  background(220);
  
  if(gameState===PLAY){
  //moves the background
  back.velocityX=-6;
  
  if(back.x<0){
    //resets the background
    back.x=back.width/2;
  }
  
  //jumps monkey
  monkey.collide(ground);
  
  if(keyDown("Space")&&monkey.y>335){
  monkey.velocityY=-12;
  }
  
  //adds gravity
  monkey.velocityY=monkey.velocityY+1;
  
  //declears functions
  fruit ();
  rock ();
  
  if(monkey.isTouching(fruitg)){
    //increases score 
    score = score+1;
    fruitg.destroyEach();
     }
  
 
  if(monkey.isTouching(stoneg)){
    //decreases score
    if(score>0){
       score = score-1;
    }
    
    //destroys stones
    stoneg.destroyEach();
    
      //increases c
      c = c+1;
    
    if(monkey.scale > 0.2){
    //decreases the size of monkey
    monkey.scale=monkey.scale - 0.2
    }
    }  
  
  switch(score){
    case 5: monkey.scale=0.12; break;  
    case 10: monkey.scale=0.14; break;
    case 15: monkey.scale=0.16; break;   
    case 20: monkey.scale=0.18; break;
    case 25: monkey.scale=0.2; break;
    default: break;
  }
    
   if(c===2){
    gameState=END;
    }
    
  //draws all the sprites
  drawSprites();
  
  //displays score
  text("Score: "+score,35,50);
  }
  
  if(gameState===END){
    //set velcity of all objects to 0
    back.velocityX = 0;
    monkey.destroy();
    stoneg.setVelocityXEach(0);
    fruitg.setVelocityXEach(0);
    
    //changes monkey and its properties
    monkey.changeAnimation("l",monkeylImg);
    
    //set lifetime of the game objects so that they are never destroyed
    stoneg.setLifetimeEach(-1);
    fruitg.setLifetimeEach(-1);
     
    //displays gameover
    g.visible = true;
    
    if(mousePressedOver(restart)){
       reset();
      }
    
    //draws all the sprites
    drawSprites();
     }
}

function fruit (){
  if(World.frameCount%80===0){
    //creates banana and ist properties
    banana = createSprite(400,290,0,0);
    banana.addImage(bananaImg);
    banana.scale=0.065;
    banana.velocityX=-6;
    
    //adds banana to group
    fruitg.add(banana);
    
    //sets lifetime
    fruitg.setLifetimeEach(100);
  }
}

function rock (){
   if(World.frameCount%100===0){
    stone = createSprite(400,375,0,0);
    stone.addImage(stoneImg);
    stone.scale=0.1;
    stone.velocityX=-6;
    
    stoneg.add(stone);
    
    //sets lifetime
    stoneg.setLifetimeEach(100);
  }
}

function reset(){
 gameState=PLAY;
  
 g.visible = false;
  
 score=0;
  
 fruitg.destroyEach();
 stoneg.destroyEach();
  
 monkey.changeAnimation("m",monkeyAni);
}
