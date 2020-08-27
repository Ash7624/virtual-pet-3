//Create variables here
var dog, happyDog, database;
var foods, foodStock;
var changeState,readState;
var bedroomImg,gardenImg,washroomImg;
function preload()
{
  dog.loadImage(Dog.png);

  
}

function setup() {
  createCanvas(500, 500);
  var dog = createSprite(250,250,10,10);
  
   var db = firebase.database();

   //read gamestate
   readState=database.ref('gameState');
   readState.on("value",function(data){
     gameState=data.val();
   });

  //update Gamestate
  function update(state){
    database.ref('/').update({
      gameState:state
    });
  }

getFoodstock();
  }


function draw() {  
background(46,139,87);

if(keyWentDown(UP_AROW)){

  writeStock(foodS);
dog.addImage(happydog.png);

}

if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);
}

  drawSprites();
 
  //add styles here
  textSize = 30;
  fill("green");
  text("Press Up Arrow To Feed Dog.",50,150);


}

function getFoodstock(){
foodStock = database.ref('food');
foodStock.on("value",readStock);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    food : x
  })
}

function time(){
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if (currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if (currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();
  }
}