var ball;
var position
var database;

function setup(){
    database=firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //ref () will refer to a location on the database
    var ballPosition=database.ref('ball/position');
    //on() will keep on listening to the changes in database
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+5);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data){
    position=data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function writePosition(x,y){
         database.ref('ball/position').set({
             'x': position.x+x,
             'y': position.y+y
         });
}

function showError(){
    console.log("error");
}
