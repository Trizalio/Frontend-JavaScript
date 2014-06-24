define([
    'classy',
    'game/bindedobject',
    'game/shot'
], function (
    Class,
    BindedObject,
    Shot
){
    var Canon = BindedObject.$extend ( {
        __init__ : function(baseClass, secondClass, size) {
            this.size = size;
            var baseImg = resourses["ship_canon_body"+baseClass];
            this.$super(baseImg);
            var scale = 0.3;

            var gunImg = resourses["ship_canon_gun"+secondClass];
            this.gun = new BindedObject(gunImg);
            this.gun.bind = this;


            if(baseClass == 1){
                this.width = 13;
                this.height = 18;
            }else if(baseClass == 2){
                this.width = 13;
                this.height = 18;
            }

            if(secondClass == 1){

                this.gun.width = 4;
                this.gun.height = 18;

                this.loaded = 7;
                this.reloadSpeed = 0.2;
                this.side = 0;
                this.ready = false;
                this.damage = 25;
                this.shotSpeed = 4;
                this.shotLifeTime = 150;
                this.shotWidth = this.shotHeight = 5;
                this.shotFriction = 0.995;
                this.shotEnergy = 50;
                this.autoAim = true;
            }else if(secondClass == 2){

                this.gun.width = 4;
                this.gun.height = 18;

                this.loaded = 1;
                this.reloadSpeed = 0.2;
                this.side = 0;
                this.ready = false;
                this.damage = 4;
                this.shotSpeed = 6;
                this.shotLifeTime = 40;
                this.shotEnergy = 20;
                this.shotWidth = this.shotHeight = 3;
                this.shotFriction = 0.999;
                this.autoAim = true;
            }else if(secondClass == 3){

                this.gun.width = 4;
                this.gun.height = 18;

                this.loaded = 1;
                this.reloadSpeed = 0.2;
                this.side = 0;
                this.ready = false;
                this.damage = 4;
                this.shotSpeed = 6;
                this.shotLifeTime = 40;
                this.shotEnergy = 20;
                this.shotWidth = this.shotHeight = 3;
                this.shotFriction = 0.999;
                this.autoAim = false;
            }else if(secondClass == 4){

                this.gun.width = 4;
                this.gun.height = 18;

                this.loaded = 1;
                this.reloadSpeed = 0.2;
                this.side = 0;
                this.ready = false;
                this.damage = 4;
                this.shotSpeed = 6;
                this.shotLifeTime = 40;
                this.shotEnergy = 20;
                this.shotWidth = this.shotHeight = 3;
                this.shotFriction = 0.999;
                this.autoAim = false;
            }else if(secondClass == 5){

                this.gun.width = 8;
                this.gun.height = 25;

                this.loaded = 10;
                this.reloadSpeed = 0.2;
                this.side = 0;
                this.ready = false;
                this.damage = 80;
                this.shotSpeed = 6;
                this.shotLifeTime = 100;
                this.shotWidth = this.shotHeight = 5;
                this.shotFriction = 0.995;
                this.shotEnergy = 50;
                this.autoAim = false;
            }
            this.maxRange = this.shotLifeTime * this.shotSpeed;

            this.charge = 0;
            this.todelete = false;

            this.target = null;
            this.dx = 0;
            this.dy = 0;
            this.targetRange2 = null;
            this.squareRange = null;
            this.targetRange = null;
            this.targetAngle = null;
            this.dangle = null;

            this.shoot = false;
            //this.gun.localy = 0;
        },
        turn : function () {
            this.$super();
            this.gun.turn();
            //console.log(this.bind);
            if(this.bind.destroyed == false && this.bind.turnedOff == false){
                if(this.charge > -this.loaded){
                    this.charge -= this.reloadSpeed;
                    this.gun.localy = this.charge/2-10;;
                }else{
                    this.ready = true;
                }
                if(this.autoAim){
                    this.findEnemy();
                    if(this.target != null){
                        this.attack();
                    }
                }else{
                    if(this.shoot && this.ready == true){
                        this.shot();
                    }
                }
            }
        },
        findEnemy : function () {
            if(this.target && this.target.destroyed == false){
                this.dx = this.target.x - this.x;
                this.dy = this.target.y - this.y;
                this.targetRange2 = Math.abs(this.dx) + Math.abs(this.dy);
            }else{
                this.target = null;
            }
            for (var i = game.ships.length - 1; i >= 0; i--) {
                if(game.ships[i].side != this.side && game.ships[i].body.destroyed == false){
                    var dx = game.ships[i].x - this.x;
                    var dy = game.ships[i].y - this.y;
                    if(this.target == null){
                        this.target = game.ships[i];
                        this.targetRange2 = Math.abs(dx) + Math.abs(dy);
                    }
                    if (Math.abs(dx) + Math.abs(dy) < this.targetRange2) {
                        this.target = game.ships[i];
                        this.targetRange2 = Math.abs(dx) + Math.abs(dy);
                    };
                };
            };
        },
        attack : function(){
            var dx = this.x - this.target.x;
            var dy = this.y - this.target.y;
            var targetAngle = Math.atan(dy/dx) + Math.PI/2;
            if(dx > 0){
                targetAngle += Math.PI;
            }
            this.localangle = targetAngle - this.bind.angle;
            if(this.localangle > Math.PI){
                this.localangle -= 2*Math.PI;
            }else if(this.localangle < -Math.PI){
                this.localangle += 2*Math.PI;
            }
            this.targetRange = Math.sqrt(dx*dx + dy*dy);
            if(this.ready == true && this.bind.energy > this.shotEnergy && 
                this.maxRange > this.targetRange){
                this.shot();
            }
            //console.log(this.localangle);
        },
        shot : function () {
            //console.log(this.target)
            this.ready = false;
            this.bind.energy -= this.shotEnergy;
            this.charge = this.loaded;
            var shot = new Shot(this.side, 1);
            shot.x = this.gun.x;
            shot.y = this.gun.y;
            shot.vx = this.shotSpeed*Math.sin(this.angle);
            shot.vy = -this.shotSpeed*Math.cos(this.angle);
            shot.friction = this.shotFriction;
            shot.maxLifetime = this.shotLifeTime;
            shot.baseWidth = this.shotWidth;
            shot.baseHeight = this.shotHeight;
            shot.damage = this.damage;
            game.addShot(shot);
        },
        draw : function () {
            if(this.bind.destroyed == false){
                this.gun.draw();
                this.$super();
            }
        },
        crush : function () {

        }

    });
    return Canon;
});