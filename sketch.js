//Create variables here
var dogImg, happyDogImg, database, foodS, foodStock,dog,happyDog,feed,addFood,foodObj,fedTime,lastFed;

function preload()
{
   dogImg= loadImage("images/dogImg.png");
   happyDogImg = loadImage("images/dogImg1.png");
     }

function setup() {
  	createCanvas(900, 900);
    database = firebase.database();

    foodObj = new Food();

  dog = createSprite(380,400,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.5;

   foodStock = database.ref('Food');
   foodStock.on("value",readStock,showerror);

   feed = createButton("Feed the Dog");
   feed.position(700,95);
   feed.mousePressed(feedDog);

   addFood = createButton("Add Food");
   addFood.position(800,95);
   addFood.mousePressed(addFoods);
}

function draw() {  
background(46, 139, 87);
foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
});

fill("black");
textSize(22);
        if(lastFed>=12){
            text("Last Feed: " + lastFed%12 + "PM" ,350,30);
        }else if(lastFed === 0){
           text("Last Feed : 12 AM" ,350,30);
        }else{
            text("Last Feed :" + lastFed + "AM" ,350,30);
        }

drawSprites();
  }


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function showerror(){
  console.log("error");
}

function feedDog(){
dog.addImage(happyDogImg);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

