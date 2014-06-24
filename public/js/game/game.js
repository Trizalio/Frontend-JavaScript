define([
    'classy',
    'game/engine',
    'game/renderer',
    'game/ship',
    'game/player',
    'game/module',
    'game/staticdepthobject',
    'game/pilot',
    'game/canon',
    'game/resourses',
    'game/shop'
], function (
    Class,
    Engine,
    Renderer,
    Ship,
    Player,
    Module,
    StaticDepthObject, 
    Pilot, 
    Canon,
    Resourses,
    Shop
){
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
    var Game = Class.$extend ( {
        clearArray:function(array){
            for (var i = 0; i < array.length;) {
                delete(array[i]);
                array.splice(i, 1);
            };
        },
        clearAll:function(){
            this.clearArray(this.ships);
            this.clearArray(this.shots);
            this.clearArray(this.background);
            this.clearArray(this.objects);
            this.clearArray(this.pilots);
        },

        startNew : function (){
            this.clearAll();

            this.x = 0;
            this.y = 0;

            this.vx = 0;
            this.vy = 0;

            this.addPlayer();
            this.addStars();
            this.addGlows();
            

            
            this.enemyCooldown = 5000;
            this.enemyTimer = this.enemyCooldown;
            this.enemyPower = 1;
            this.score = 0;

            this.lastSeconds = 100;

            this.pause = false;
            this.lost = false;
            this.play = true;
            this.addEnemy();
        },
        start : function (){
            this.play = true;
        },
        stop : function (){
            this.play = false;
        },

        __init__: function (){
            this.ships = [];
            this.shots = [];
            this.background = [];
            this.objects = [];
            this.pilots = [];

            game = this;

            this.renderer = new Renderer();
            renderer = this.renderer;
            this.setSceneSize(800, 600);

            this.engine = new Engine();
            engine = this.engine;

            this.resourses = new Resourses();
            resourses = this.resourses;

            this.shop = new Shop();
            shop = this.shop;

            this.listenToKeyboard();

            this.friction = 0.95;

            this.pause = false;
            this.play = false;
            this.lost = false;

            this.spacePressed = false;

            this.animloop();
        },
        listenToKeyboard : function () {
            var game = this;
            this.keydown = [];
            $(document).bind("keydown", function(event) {
                game.keydown[String.fromCharCode(event.which).toLowerCase()] = true;
            });
             $(document).bind("keyup", function(event) {
                game.keydown[String.fromCharCode(event.which).toLowerCase()] = false;
            });
        },
        checkPause : function () {
            if(this.keydown[" "] == true){
                if(this.spacePressed == false){
                    if(this.pause == false){
                        this.pause = true;
                    }else{
                        this.pause = false;
                    }
                }
                this.spacePressed = true;
            }else{
                this.spacePressed = false;
            }
        },
        addStars : function () {
            for(var i = 0; i < 10; i++){
                var newStar = new StaticDepthObject("star", 1);
            }
        },
        addGlows : function () {
            for(var i = 0; i < 10; i++){
                var newStar = new StaticDepthObject("glow", 1);
            }
        },
        addPlayer : function () {
            this.playerShip = new Ship(1, 1);
            this.playerShip.x = this.renderer.sceneWidth/2;
            this.playerShip.y = this.renderer.sceneHeight/2;
            this.x = -this.playerShip.x;
            this.y = -this.playerShip.y;
            this.playerShip.velocity = 0.12;
            this.playerShip.angleVelocity = 0.003;
            this.ships.push(this.playerShip);

            this.player = new Player(this.playerShip, 1);
            this.pilots.push(this.player);

            var mainCanon = new Canon(6, 6, 1);
            this.playerShip.attachItem(mainCanon, "canon", this.playerShip.body.slots[0], this.playerShip.body);
            mainCanon.autoAim = false;
            this.playerShip.canonsGroup0.push(mainCanon);

            var downModule = new Module(1, 0);
            this.playerShip.attachModule(downModule, downModule.connections[0], 0, 
                this.playerShip.body.connections[0], this.playerShip.body);

            var downDownModule = new Module(1, 0);
            this.playerShip.attachModule(downDownModule, downDownModule.connections[0], 0, 
                downModule.connections[1], downModule);

            var plasmaCanon = new Canon(5, 5, 1);
            this.playerShip.attachItem(plasmaCanon, "canon", downDownModule.slots[0], downDownModule);
            plasmaCanon.autoAim = false;
            this.playerShip.canonsGroup1.push(plasmaCanon);


            var leftModule = new Module(1, 0);
            this.playerShip.attachModule(leftModule, leftModule.connections[3], 0, 
                this.playerShip.body.connections[2], this.playerShip.body);

            var leftCanon = new Canon(3, 3, 1);
            this.playerShip.attachItem(leftCanon, "canon", leftModule.slots[0], leftModule);
            leftCanon.autoAim = false;
            this.playerShip.canonsGroup2.push(leftCanon);

            var leftDownModule = new Module(1, 0);
            this.playerShip.attachModule(leftDownModule, leftDownModule.connections[3], 0, 
                this.playerShip.body.connections[4], this.playerShip.body);


            var leftDownLeftModule = new Module(1, 0);
            this.playerShip.attachModule(leftDownLeftModule, leftDownLeftModule.connections[3], 0, 
                leftDownModule.connections[2], leftDownModule);

            var leftDownLeftCanon = new Canon(4, 4, 1);
            this.playerShip.attachItem(leftDownLeftCanon, "canon", leftDownLeftModule.slots[0], leftDownLeftModule);
            leftDownLeftCanon.autoAim = false;
            this.playerShip.canonsGroup3.push(leftDownLeftCanon);



            var rightModule = new Module(1, 0);
            this.playerShip.attachModule(rightModule, rightModule.connections[2], 0, 
                this.playerShip.body.connections[3], this.playerShip.body);

            var rightCanon = new Canon(3, 3, 1);
            this.playerShip.attachItem(rightCanon, "canon", rightModule.slots[0], rightModule);
            rightCanon.autoAim = false;
            this.playerShip.canonsGroup2.push(rightCanon);

            var rightDownModule = new Module(1, 0);
            this.playerShip.attachModule(rightDownModule, rightDownModule.connections[2], 0, 
                this.playerShip.body.connections[5], this.playerShip.body);


            var rightDownRightModule = new Module(1, 0);
            this.playerShip.attachModule(rightDownRightModule, rightDownRightModule.connections[2], 0, 
                rightDownModule.connections[3], rightDownModule);

            var rightDownRightCanon = new Canon(4, 4, 1);
            this.playerShip.attachItem(rightDownRightCanon, "canon", rightDownRightModule.slots[0], rightDownRightModule);
            rightDownRightCanon.autoAim = false;
            this.playerShip.canonsGroup3.push(rightDownRightCanon);




        },
        addShot : function (shot) {
            this.shots.push(shot);
        },
        setSceneSize : function (x, y) {
            this.renderer.sceneWidth = x;
            this.renderer.sceneHeight = y;

            this.renderer.canvas.width = this.renderer.sceneWidth;
            this.renderer.canvas.height = this.renderer.sceneHeight;
        },
        turnMany : function (objects) {
            for (var i = 0; i < objects.length; )
            {
                objects[i].turn();
                if(objects[i].todelete == true){
                    delete(objects[i]);
                    objects.splice(i, 1);
                }else{
                    i++;
                }
            }
        },
        turnAll : function () {
            this.checkPause();
            if(game.pause == true || this.lost == true){
                return;
            }
            this.turnMany(this.ships);
            this.turnMany(this.shots);
            this.turnMany(this.objects);
            this.turnMany(this.pilots);
            this.turnMany(this.background);
            this.checkBroders();
            this.addEnemiesByTime();
            //this.score++;
        },
        drawMany : function (objects) {
            for (var i = 0; i < objects.length; i++)
            {
                objects[i].draw();
            }
        },
        drawGUI : function () {
            /*if(game.pause == true){
                shop.draw();
                var dx = -this.playerShip.x+(this.renderer.sceneWidth)/2;
                var dy = -this.playerShip.y+(this.renderer.sceneHeight)/2;
                console.log(dx + ", " + dy);
                renderer.setTempShift(dx, dy, 0);
                this.playerShip.draw();
                renderer.resetTempShift();
            }*/
            renderer.drawText(Math.round(this.score*5), 20, 50, 15, "#FFF");
        },
        drawAll : function () {
            this.renderer.clearScene();
            this.renderer.drawBackground();
            this.renderer.setShift(this.x, this.y);
            this.drawMany(this.background);
            this.drawMany(this.ships);
            this.drawMany(this.shots);
            this.drawMany(this.objects);
            this.drawGUI();
        },
        checkBroders : function () {
            this.x += this.vx;
            this.y += this.vy;
            var speedK = 0.01;
            this.vx -= (this.playerShip.x + this.x)*speedK;
            this.vy -= (this.playerShip.y + this.y)*speedK;
            //console.log((this.playerShip.x + this.x) + ", " + (this.playerShip.y + this.y));
            this.vx *= this.friction;
            this.vy *= this.friction;

            var summSpeed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);

            //console.log(renderer.cameraDepth);
            renderer.cameraDepth = 0.5 + summSpeed/3;
        },
        addEnemy : function () {
            //console.log(this.enemyTimer);
            engine.addEnemy(this.enemyPower);
            this.enemyPower += 0.5;
        },
        addEnemiesByTime : function () {
            //console.log(this.enemyTimer);
            this.enemyTimer += 1;
            if(this.enemyTimer > this.enemyCooldown){
                this.enemyTimer = 0;
                engine.addEnemy(this.enemyPower);
                this.enemyPower += 0.5;
            }
        },
        update : function () {
            if(!this.play){
                return;
            }
            this.turnAll();
            this.drawAll();
        },
        animloop : function(){
            var game = this;
            game.update();
            requestAnimFrame(function() {
                game.animloop();
            });
        },
        gameOver :function () {
            this.lastSeconds -= 1;
            if(this.lastSeconds % 20 == 0){
                this.playerShip.body.crush();
            }
            if(this.lastSeconds == 0){
                console.log("Game Over");
                this.play = false;
            }

            
        },
        /*submit : function () {
        },*/

    });
    return Game;
});


document.onkeydown = function (e) {
    e = e || window.event;
    if (32 == e.keyCode){
        console.log("space");
        return false;
    }
}










/*console.time('foo');
for(var i = 0; i < 1000000; i++);
console.timeEnd('foo');*/


/*document.onkeydown = function (e) {
    e = e || window.event;
    if (32 == e.keyCode){
        console.log("space");
        return false;
    }
}

<!DOCTYPE html>
<html>
<body>

<canvas id="myCanvas" width="300" height="150" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.</canvas>
<canvas id="myCanvas2"  width="300" height="150" style="border:1px solid #d3d3d3;">
Your browser does not support the HTML5 canvas tag.</canvas>

<script>
//style="display:none"
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var c2=document.getElementById("myCanvas2");
var ctx2=c2.getContext("2d");
ctx.fillStyle="red";
ctx.fillRect(10,10,50,50);

function copy()
{
var sizex = 50;
var sizey = 50;
var imgData=ctx.getImageData(10,10,sizex,sizey);
for (var i = 0; i < sizex; i += 1){
  for (var j = 0; j < sizey; j += 1){
    var curi = (i + j * sizex) * 4;
    imgData.data[curi+0] *= (i/sizex)/2+(j/sizey)/2;
    imgData.data[curi+1]=0;
    imgData.data[curi+2]=0;
    imgData.data[curi+3]=255;
  }
}
ctx2.putImageData(imgData, 10, 10, 0, 0, 50, 50);
}
function rotate(){
var sizex = 50;//чётное
var sizey = 50;
var imgData=ctx.getImageData(10,10,sizex,sizey);

var buffer = document.createElement('canvas');
buffer.width  = 50;
buffer.height = 50;

var ctxBuffer=buffer.getContext("2d");
ctxBuffer.fillStyle="black";
ctxBuffer.fillRect(0,0,50,50);
ctxBuffer.fillStyle="yellow";
ctxBuffer.fillRect(10,10,30,30);

var newImg = new Image();
newImg.src = buffer.toDataURL();
ctx.drawImage(newImg, 50, 50, 20, 20);
}

</script>
<p>
<button onclick="copy()">Copy</button>
<button onclick="rotate()">Rotate</button>

</body>
</html>*/