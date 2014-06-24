define([
    'classy',
    'game/bindedobject',
    'game/sprite',
    'game/connection',
    'game/slot'
], function (
    Class,
    BindedObject,
    Sprite,
    Connection,
    Slot
){
    var Module = BindedObject.$extend ( {
        __init__ : function(type, number) {
            this.energyCapacity = 0;
            this.energyGeneration = 0;
            this.energy = 0;
            this.energyBalance = 0;

            this.curHealth = 0;
            this.maxHealth = 0;

            this.mainImage = null;
            this.secondryImage = null;

            this.turnedOff = false;

            if(type == 0 || type == "hull"){
                this.mainImage = resourses["ship_body"+type];
                this.secondryImage = resourses["ship_body_destroyed"+type];
            }else if(type == 1 || type == "module"){
                this.mainImage = resourses["ship_module"+type];
                this.secondryImage = resourses["ship_module_destroyed"+type];
            }
            this.$super(this.mainImage);

            //this.cracks = [];
            this.item = null;
            this.connections = [];
            this.slots = [];
            this.destroyed == false;

            if(type == 0 && number == 0){

                this.energyCapacity = 5000;
                this.energyGeneration = 50;

                this.maxHealth = 500;
                this.width = 20;
                this.height = 60;
                //this.mass = 10;
                this.addSlot(2, 0, 0);
                this.addConnection(2, 0, 30, 0);
                this.addConnection(2, 0, -30, Math.PI);
                this.addConnection(2, -10, 0, Math.PI/2);
                this.addConnection(2, 10, 0, -Math.PI/2);
                this.addConnection(2, -10, 20, Math.PI/2);
                this.addConnection(2, 10, 20, -Math.PI/2);
            }else if(type == 1 && number == 0){
                this.energyCapacity = 2000;
                this.energyGeneration = 10;

                this.maxHealth = 100;
                this.width = 20;
                this.height = 20;
                //this.mass = 10;
                this.addSlot(1, 0, 0);
                this.addConnection(2, 0, -10, Math.PI);
                this.addConnection(2, 0, 10, 0);
                this.addConnection(2, -10, 0, Math.PI/2);
                this.addConnection(2, 10, 0, -Math.PI/2);
            }
            this.curHealth = this.maxHealth;
            this.todelete = false;
            this.destroyed = false;

            this.burnTimer = 0;
            this.burnPeriod = 3;
            this.oldX = 0;
            this.oldY = 0;
        },
        tradeEnergy : function () {
            this.energy += this.energyGeneration;
            if(this.energy > this.energyCapacity){
                this.energy = this.energyCapacity;
            }
            this.energyBalance = this.energy/this.energyCapacity;
            this.alpha = 0.5 + this.energyBalance / 2;
            for (var i = 0; i < this.connections.length;i++){
                if(this.connections[i].status != "open"){
                    if(this.energyBalance > this.connections[i].target.energyBalance){
                        this.energy -= this.connections[i].energyTransition;
                        this.connections[i].target.energy += this.connections[i].energyTransition;
                    }
                }
            }
        },
        turn : function () {
            if(this.bind.destroyed == true || this.bind.turnedOff == true){
                this.turnedOff = true;
            }
            if(this.destroyed == false){
                if(this.curHealth < this.maxHealth/2){
                    this.burn();
                }
                this.tradeEnergy();
            }else{
                this.energyBalance = 2;
                this.burnPeriod += 0.001;
            }
            this.oldX = this.x;
            this.oldY = this.y;
            this.$super();
            
            for (var i = 0; i < this.connections.length;i++){
                //console.log(i);
                if(this.connections[i].status == "connector"){
                    this.connections[i].target.turn();
                }
            }
            
            for (var i = 0; i < this.slots.length;i++){
                //console.log(i);
                if(this.slots[i].status == "connector"){
                    this.slots[i].target.turn();
                }
            }
            /*for (var i = this.cracks.length - 1; i >= 0; i--) {
                //console.log(i);
                this.cracks[i].turn();
            };*/
        },
        addSlot : function (size, x, y) {
            var newSlot = new Slot (size, x, y);
            this.slots.push(newSlot);
            //console.log(this.slots);
        },
        addConnection : function (size, x, y, angle) {
            var newConnection = new Connection (size, x, y, angle);
            this.connections.push(newConnection);
        },
        draw : function () {
            this.$super();
            /*for (var i = this.cracks.length - 1; i >= 0; i--) {
                this.cracks[i].draw();
            };*/
            for (var i = 0; i < this.connections.length;i++){
                if(this.connections[i].status == "connector"){
                    this.connections[i].target.draw();
                }
            }
            for (var i = 0; i < this.slots.length;i++){
                if(this.slots[i].status == "connector"){
                    this.slots[i].target.draw();
                }
            }
        },
        clear : function () {
            /*for (var i = this.cracks.length - 1; i >= 0; i--) {
                delete(this.cracks[i]);
                this.cracks.splice(i, 1);
            };*/
            if(this.item){
                this.item.todelete = true;
                delete(this.item);
            }
        },
        takeDamage : function (damage) {
            //console.log(damage);
            if(this.side == 0){
                if(damage < this.curHealth){
                    game.score += damage;
                }else{
                    game.score += this.curHealth;
                }
            }
            this.curHealth -= damage;
            if(this.curHealth <= 0){
                this.destroy();
                return true;
            }
            return false;
            /*var img = new Image();
            img.src = 'static/JS-crack.png';
            var crack = new BindedObject(img, this);
            crack.height = this.height/2;
            crack.width = this.width/2;
            crack.localy = this.height/2;

            this.cracks.push(crack);*/
        },
        destroy : function () {
            if(this.side == 0){
                game.score += this.maxHealth;
            }

                this.destroyed = true;
                //this.todelete = true;
                this.clear();
                this.crush();
                this.img = this.secondryImage;
                this.width = this.width*1.4;
                this.height = this.height*1.4;
        },
        
        burn : function () {
            if(this.burnTimer++ > this.burnPeriod){
                this.burnTimer = 0;
                var flame;
                if(Math.random > 0.5){
                    flame = new Sprite("flame", 1);
                }else{
                    flame = new Sprite("flame", 2);
                }
                var minSize = Math.min(this.height, this.width)/2;
                flame.x = this.x + (0.5 - Math.random()) * minSize;
                flame.y = this.y + (0.5 - Math.random()) * minSize;
                var dx = this.x - this.oldX;
                var dy = this.y - this.oldY;
                this.totalSpeed = Math.sqrt(dx*dx + dy*dy);
                this.moveAngle = Math.atan(dy/dx) + Math.PI/2;
                if(dx > 0){
                    this.moveAngle += Math.PI;
                }
                flame.angle = this.moveAngle;
                flame.baseHeight = flame.img.width/2+this.totalSpeed*10;
                flame.baseWidth = flame.img.width/2;
                game.objects.push(flame);

                /*if(this.destroyed){
                    flame.maxLifetime = 40;
                }*/
                //console.log("burn");
            }
        },
        crush : function () {
           // console.log("crush");
            var maxTime = 50;
            var explosionsAmount = 2 + Math.random()*4;
            var pulsesAmount = 2 + Math.random()*4;
            var newSprite;
            for(var i = 0; i < explosionsAmount; i++){
                newSprite = new Sprite(1, 2);
                newSprite.x = this.x + (0.5 - Math.random()) * this.width / 2;
                newSprite.y = this.y + (0.5 - Math.random()) * this.height / 2;
                newSprite.waitTime = Math.random()*25;
                game.objects.push(newSprite);
                //newSprite.baseHeight = 100;
                //newSprite.baseWidth = 100;
                //console.log(newSprite);
            }

            for(var i = 0; i < pulsesAmount; i++){
                newSprite = new Sprite(2, 2);
                newSprite.x = this.x + (0.5 - Math.random()) * this.width / 2;
                newSprite.y = this.y + (0.5 - Math.random()) * this.height / 2;
                newSprite.waitTime = Math.random()*25;
                game.objects.push(newSprite);
            }
        },
    });
    return Module;
});