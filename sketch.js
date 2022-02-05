var background_1,background_img;
var ground,ground_img;
var ball,ball_img;
var good_potion,good_potion_img,good_potion_group;
var bad_potion,bad_potion_img,bad_potion_group;
var brick,bricksGroup;
var affects;
var gravity=2;
var gamestate="play";
var slab;
var ref,ref2,ref3;

function preload ()
{
  background_img=loadImage("background.jpg");
  ground_img=loadImage("ground.png");
  good_potion_img=loadImage("good_potion.png");
  bad_potion_img=loadImage("bad_potion.png");
  ball_img=loadImage("ball.png");


}
function setup() {
  createCanvas(600,400);

  // background_1=createSprite(300,200);
  // background_1.addImage(background_img);
  // background_1.scale=0.89;


  ground=createSprite(300,390,600,25);
  ground.visible=false;

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

  ball=createSprite(200,300);
  ball.addImage(ball_img);
  ball.velocityY=5;
  ball.scale=0.3

  good_potion_group = new Group();
  bad_potion_group = new Group();
  bricksGroup = new Group();
  
 
frameRate(30);
 
}

function draw() 
{
  background(50);

  if (gamestate==="play")
  {
    ball.bounceOff(ground);
    ball.velocityY=ball.velocityY+gravity;

    if(keyDown("left")&&ball.x>0)
    {
      ball.x-=5;
      

    }

    if(keyDown("right")&&ball.x<590)
    {
      ball.x+=5;
    }
    
    if(keyDown("space"))
  {
    ball.velocityY = -10;
  }
  
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

  if(ball.isTouching(bricksGroup)&&affects.poison.checker===true&&affects.invinsibility.checker===false)
  {
    affects.hearts-=2;
  }

  if(ball.isTouching(bricksGroup)&&affects.poison.checker===false&&affects.invinsibility.checker===false)
  {
    affects.hearts-=1;
  }

  if(affects.hearts<=0)
  {
    gamestate="end";
  }

  if(ball.isTouching(good_potion_group))
  {
    ref2=Math.round(random(1,2));

    if(ref2===1)
    {
      affects.invinsibility.duration=150;
      console.log('it worked')
    }
    if(ref2===2)
    {
      affects.jump_boost.duration=150;
      console.log('it worked');
    }

    good_potion_group.destroyEach();

  }

  if(ball.isTouching(bad_potion_group))
  {
    ref2=Math.round(random(1,2));

    if(ref2===1)
    {
      affects.poison.duration=150;
      console.log("it worked")

    }

    if(ref2===2)
    {
      affects.vertical_slabs.duration=150;
      console.log("it worked")
    }

    bad_potion_group.destroyEach();
  }

  if(affects.jump_boost.checker===true)
  {
    ball.bounciness=0.9;
  }

  if(affects.jump_boost.checker===false)
  {
    ball.bounciness=0.5;
  }

  if(affects.vertical_slabs.checker===true)
  {
    spawnSlabs();
  }

  

  spawnBricks();
  spawnPotions();

  text("hearts : "+affects.hearts,550,20);

  text("affects",10,20);
  text("invinsibility : "+affects.invinsibility.checker,10,35);
  text("jump_boost : "+affects.jump_boost.checker,10,50);
  text("poison : "+affects.poison.checker,10,65);
  text("vertical_slabs : "+affects.vertical_slabs.checker,10,80);
  }

  if(gamestate==="end")
  {
    bricksGroup.destroyEach();
    ground.destroy();
    ball.destroy();
    // background_1.destroy();
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
