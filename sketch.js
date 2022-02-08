// creating all of the variables
var background_1,background_img;
var ground,ground_img;
var ball,ball_img;
var good_potion,good_potion_img,good_potion_group;
var bad_potion,bad_potion_img,bad_potion_group;
var brick,bricksGroup;
var gravity=2;
var gamestate="play";
var slab;
var ref,ref2,ref3;
var affects;

function preload ()
{
//   loading all of the images and animations
  background_img=loadImage("background.jpg");
  ground_img=loadImage("ground.png");
  good_potion_img=loadImage("good_potion.png");
  bad_potion_img=loadImage("bad_potion.png");
  ball_img=loadImage("ball.png");
}
function setup() {
  createCanvas(600,400);

//   creating the ground and making it invisible
  ground=createSprite(300,390,600,25);
  ground.visible=false;
// creating the json affects
  affects = {
   poison : {
     checker:false,
     duration:0
  },
   jump_boost : {
     checker:true,
     duration:0
   },
   vertical_slabs : {
     checker:false,
     duration:0
   },
   invinsibility : {
     checker:false,
    duration : 0
   },
   hearts : 50
 }

//   creating the main charecter the ball
  ball=createSprite(200,300);
  ball.addImage(ball_img);
  ball.velocityY=5;
  ball.scale=0.3

//   creating all the groups for the entire game
  good_potion_group = new Group();
  bad_potion_group = new Group();
  bricksGroup = new Group();
  
//   adjusting the frame rate to avoid different frame rates in different objects
 frameRate(30);
 
}

function draw() 
{
  background(50);

//   if the gamestate is play then a certain things should happen
  if (gamestate==="play")
  {
//     applying gravity to the ball and making it bounce 
    ball.bounceOff(ground);
    ball.velocityY=ball.velocityY+gravity;

//     for the movement of the ball 
    if(keyDown("left")&&ball.x>0)
    {
      ball.x-=5;
    }

    if(keyDown("right")&&ball.x<590)
    {
      ball.x+=5;
    }
    
//  to make the ball jump   
    if(keyDown("space"))
  {
    ball.velocityY = -10;
  }
  
//     if the duration of the affects are more than 0 then the checker should be true else false
  if (affects.poison.duration>0)
{
  affects.poison.checker=true;
  affects.poison.duration-=1;
}
else 
{
  affects.poison.checker=false;
}

if (affects.invinsibility.duration>0)
{
  affects.invinsibility.checker=true;
  affects.invinsibility.duration-=1;
}
else 
{
  affects.invinsibility.checker=false;
}
if (affects.vertical_slabs.duration>0)
  {
    affects.vertical_slabs.checker=true;
    affects.vertical_slabs.duration-=1;
  }
  else 
  {
    affects.vertical_slabs.checker=false;
  }
  if (affects.jump_boost.duration>0)
  {
    affects.jump_boost.checker=true;
    affects.jump_boost.duration-=1;
  }
  else 
  {
    affects.jump_boost.checker=false;
  }
// checking wether the ball is touching the bricks and the poison effect is there and invincibility is false
  if(ball.isTouching(bricksGroup)&&affects.poison.checker===true&&affects.invinsibility.checker===false)
  {
    affects.hearts-=2;
  }
// checking wether the ball is touching the bricks and the poison effect is not there and invincibility is false
  if(ball.isTouching(bricksGroup)&&affects.poison.checker===false&&affects.invinsibility.checker===false)
  {
    affects.hearts-=1;
  }
// checking if there are hearts left
  if(affects.hearts<=0)
  {
    gamestate="end";
  }
//   if the ball is touching the good potion then some things should happen
  if(ball.isTouching(good_potion_group))
  {
    ref2=Math.round(random(1,2));
//  it will give you invincibility otherwise jumpboost
    if(ref2===1)
    {
      affects.invinsibility.duration=150;
    }
    if(ref2===2)
    {
      affects.jump_boost.duration=150;
    }
// and destroying the potion you drank
    good_potion_group.destroyEach();

  }
//   if the ball is touching the bad  potion then some things should happen
  if(ball.isTouching(bad_potion_group))
  {
    ref2=Math.round(random(1,2));

//     it can give you poison otherwise vertical slabs
    if(ref2===1)
    {
      affects.poison.duration=150;
    }

    if(ref2===2)
    {
      affects.vertical_slabs.duration=150;
    }
// destroying the potion you just drank
    bad_potion_group.destroyEach();
  }
//   if the ball has bounciness on it then it should increse the bounciness else normal
  if(affects.jump_boost.checker===true)
  {
    ball.bounciness=0.9;
  }

  if(affects.jump_boost.checker===false)
  {
    ball.bounciness=0.5;
  }
   
//     checking if the slabs effect is on
  if(affects.vertical_slabs.checker===true)
  {
    //     this is the function which i declared at 269
    spawnSlabs();
  }

  
// spwning the bricks and the potions
  spawnBricks();
  spawnPotions();
// displaying all of the hearts 
  text("hearts : "+affects.hearts,530,20);
  text("affects",10,20);
  text("invincibility : "+affects.invinsibility.checker,10,35);
  text("jump_boost : "+affects.jump_boost.checker,10,50);
  text("poison : "+affects.poison.checker,10,65);
  text("vertical_slabs : "+affects.vertical_slabs.checker,10,80);
  }
//    if the gamestate is end then a certain things should take place
  if(gamestate==="end")
  {
    bricksGroup.destroyEach();
    ground.destroy();
    ball.destroy();
    ball.velocityY=0;
    textSize(50);
    text("you lost",200,200);
    good_potion_group.destroyEach();
    bad_potion_group.destroyEach();
  }

  
  

  drawSprites();
}

function spawnBricks ()
{
  if(frameCount % 30 === 0){
  brick=createSprite(Math.round(random(10,590)),-20,50,20);
  brick.velocityY=5;
  bricksGroup.add(brick);
    brick.lifeTime=100;
  }
}

function spawnPotions()
{
  if(frameCount%300===0)
  {
    ref=Math.round(random(1,2));
    
    if(ref===1)
    {
      good_potion=createSprite(Math.round(random(10,590)),-50);
      good_potion.addImage(good_potion_img);
      good_potion.scale=0.5;
      good_potion.velocityY=5;
      good_potion_group.add(good_potion);
      
    }

    if(ref===2)
    {
      bad_potion=createSprite(Math.round(random(10,590)),-50);
      bad_potion.addImage(bad_potion_img);
      bad_potion.scale=0.2;
      bad_potion.velocityY=5;
      bad_potion_group.add(bad_potion);
    }

  }
}

function spawnSlabs(){
  if(frameCount%50===0){
  ref3=Math.round(random(1,2));
  if(ref3===1)
  {
    slab=createSprite(650,340,50,15);
    slab.velocityX=-5;
    bricksGroup.add(slab);
  }

  if(ref3===2)
  {
    slab=createSprite(650,380,50,15);
    slab.velocityX=-5;
    bricksGroup.add(slab);
  }
}
}
