var bg1,bg2;
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  bg1=loadImage("jungle.png");
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  //groundImg=loadImage("ground.png");
}



function setup() {
  createCanvas(600,500);
  bg2=createSprite(300,0,600,700);
  bg2.addImage("background",bg1);
  bg2.scale=1.8;            
  bg2.velocityX=-2;
  
  ground = createSprite(400,495,900,1);
 
  //ground.velocityX=-4;
  ground.scale=1.2;
  ground.visible=false;
  
  //ground.x=ground.width/2;
  //console.log(ground.x)

  
  //creating monkey
   monkey=createSprite(80,390,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.18;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background("teal");
  
    
  if(bg2.x<0) {
    bg2.x=bg2.width/2;
  }
  
  
   
  if(keyDown("space") && monkey.y>=120 ) {
    monkey.velocityY = -12;
    console.log(monkey.y);
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);   
  spawnFood();
  spawnObstacles();
 
  drawSprites();
         
  
  if(FoodGroup.isTouching(monkey)) {
    score=score+2;
    FoodGroup.destroyEach();
    switch(score){
      case 10: monkey.scale=0.2;
        break;
        case 20: monkey.scale=0.22;
        break;
        case 30: monkey.scale=0.24;
        break;
        case 40: monkey.scale=0.26;
        break;
        default: break;
        
    }
  }
    if(obstaclesGroup.isTouching(monkey)){
        monkey.scale=0.1;
    
    }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,150); 
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    
    banana.lifetime = 300;
    banana .depth = monkey.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.15;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,465,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.25;
      
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
  }
}
