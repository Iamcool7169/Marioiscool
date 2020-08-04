var Mario,Marioimg,ground,groundimg,obsGroup,o1,o2,jump,cloudGroup,cloudimg,enemyGroup,enemyimg,e1,e2,PLAY=1,END=0,gamestate=PLAY
function preload() {
Marioimg=loadAnimation("sprite_mario0.png","sprite_mario1.png","sprite_mario2.png")
o1=loadImage("b1.png")
o2=loadImage("b2.png")
e1=loadAnimation("e1.png","e2.png")
e2=loadAnimation("e5.png","e6.png","e7.png","e8.png")
jump=loadSound("Mario-jump-sound.mp3")
cloudimg=loadImage("sprite_clouds0.png")
}
function setup() {
  createCanvas(1200,400);
  Mario=createSprite(400, 200, 50, 50);
  Mario.addAnimation("m1",Marioimg)
  Mario.scale=0.1
  Mario.frameDelay=2
  ground=createSprite(600,390,1200,10)
  obsGroup=createGroup()
  enemyGroup=createGroup()
  cloudGroup=createGroup()
  
}

function draw() {
  background("black"); 
  drawSprites();
  console.log(Mario.y)
  Mario.collide(ground)

if(gamestate===PLAY)
{
  spawnObs()
  spawnClouds()
  spawnEnemies()
  if(keyDown("space")&&Mario.y>290)
{
Mario.velocityY=-10
jump.play()
}
Mario.velocityY=Mario.velocityY+0.4
Mario.collide(obsGroup)
if(keyDown("left"))
{
Mario.velocityX=-3

}

if(keyDown("right"))
{
Mario.velocityX=3
}

if(Mario.x>1190)
{
Mario.x=10

}
if(Mario.isTouching(enemyGroup))
{
gamestate=END

}


}
if(gamestate===END)
{
  Mario.velocityX=0
  Mario.velocityY=0
  obsGroup.setVelocityXEach(0)
  enemyGroup.setVelocityXEach(0)
  cloudGroup.setVelocityXEach(0)
  

}

}

function spawnObs(){
  if(frameCount%60===0)
{
  var obs=createSprite(1200,350,10,10)
  obs.velocityX=-5
  var r1=Math.round(random(1,2))
  obsGroup.add(obs)
  obs.y=random(300,350)

  switch(r1)
  {
      case 1:  obs.addImage("o1",o1)
      obs.scale=1
      break
      case 2:  obs.addImage("o2",o2)
      obs.scale=1
      break
      default:  break
  }
}
}

function spawnClouds(){
  if(frameCount%60===0)
  {
var cloud=createSprite(1200,100,10,10)
cloud.velocityX=-3
cloud.y=random(100,200)
cloud.scale=0.1
cloud.addImage("c1",cloudimg)
cloudGroup.add(cloud)

  }
}

function spawnEnemies(){
if(frameCount%80===0){
var enemies=createSprite(1200,380,10,10)
enemies.velocityX=-3
var e3=Math.round(random(1,2))
enemyGroup.add(enemies)
switch(e3)
    {
    case 1: enemies.addAnimation("e1",e1)
    enemies.scale=1
    break

    case 2: enemies.addAnimation("e2",e2)
    enemies.scale=1
    break
    default:  break
    }
  }
}
