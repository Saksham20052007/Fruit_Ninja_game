var sword ;
var fruit, fruitGroup;
var monster, enemyGroup;
var PLAY = 0;
var END = 1;
var gameState = 0;
var score = 0;
var edges;

function preload(){
 createCanvas(1200, 1200);
  swar_image = loadImage("sword.png");
  fruit_1 = loadImage("fruit1.png");
  fruit_2 = loadImage("fruit2.png");
  fruit_3 = loadImage("fruit3.png");
  fruit_4 = loadImage("fruit4.png");
  gameOver = loadImage("gameover.png")
  
  monster_1 = loadImage("alien1.png");
  monster_2 = loadImage("alien2.png");
  
  gameOver_sound = loadSound("gameover.mp3");
  cutting_sound = loadSound("knifeSwooshSound.mp3");
  
  
  fruitGroup = new Group();
  enemyGroup = new Group();

 
}
function setup(){
  gameState = 0;
   sword = createSprite(200, 200, 30, 30);
  sword.addImage( swar_image);
 sword.scale = 0.5;

}



function draw(){
  background("cyan");
  edges = createEdgeSprites();
  
  if(gameState === 0){
  fruits();
  enemys();
  
  sword.x = World.mouseX;
  sword.y = World.mouseY;
    if(sword.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      score = score + 2;
      cutting_sound.play();
    } else if(sword.isTouching(enemyGroup)){
      gameState = 1;
      gameOver_sound.play();
      
    }
      
  
  } else if(gameState === 1){
    enemyGroup.destroyEach();
      enemyGroup.velocityX = 0;
      fruitGroup.destroyEach();
      fruitGroup.velocityX = 0;
    sword.addImage(gameOver)
    sword.x = 200;
    sword.y = 200;
    sword.scale = 2;
  
  }
  
 
  
  drawSprites();
  text(mouseX+", "+mouseY, 50, 50);
  text("Score is = " + score, 30, 20);
}
 function fruits(){
   if(frameCount%60===0){
     fruit = createSprite(195, 340, 20, 20);
     var fruit_rand= Math.round(random(1, 4));
     switch(fruit_rand){
       case 1 : fruit.addImage(fruit_1);
        break;
        case 2 : fruit.addImage(fruit_2);
         break;
         case 3 : fruit.addImage(fruit_3);
         break; 
         case 4 : fruit.addImage(fruit_4);
         break;  
         default:break;
     }
     var fruit2_rand = Math.round(random(1, 2));
     switch(fruit2_rand){
       case 1 : fruit.y = 35;
        fruit.velocityY = 7+score/4;
         break;
         case 2 : fruit.y = 365;
         fruit.velocityY = -(7+score/4);
              break;
      default: break;
}    
     fruit.lifetime = 58;
     fruit.scale = 0.2;
     fruit.x = Math.round(random(50, 350));
     fruit.bounceOff(edges)
    fruitGroup.add(fruit);
   }
 }
function enemys(){
  if(frameCount%100===0){
    monster=createSprite(195, 340, 20, 20);
    var monster_rand = Math.round(random(1, 2));
    switch(monster_rand){
      case 1 : monster.addImage(monster_1);
        break;
        case 2 : monster.addImage(monster_2);
        break;
        default:break;
    }
    monster2_rand = Math.round(random(1, 2));
     switch(monster2_rand){
       case 1 : monster.y = 15;
        monster.velocityY = 7+score/4;
         break;
         case 2 : monster.y = 385;
         monster.velocityY = -(7+score/4);
              break;
      default: break;
}  

    monster.lifetime = 58;
    monster.x = Math.round(random(50, 350));
    enemyGroup.add(monster);

  }
  
}

