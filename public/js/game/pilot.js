define([
    'classy'
], function (
    Class
){
    var Pilot = Class.$extend ( {
        __init__ : function(ship, side) {
            this.ship = ship;
            this.ship.side = side;
            this.side = side;
            this.todelete = false;

            this.target = null;
            this.targetRange2 = null;
            this.dx = null;
            this.dy = null;
            this.squareRange = null;
            this.targetRange = null;
            this.targetAngle = null;
            this.dangle = null;
            this.cash = 0;
        },
        turn : function () {
            this.move();
            if(this.ship){
                if(this.ship.body.destroyed == true){
                    console.log("destroyed");
                    if(this.side == 0){
                        game.score *= 1.5;
                        game.addEnemy();
                    }
                    this.todelete = true;
                }
                if(this.ship.todelete == false){
                    this.checkTarget();
                    if(this.target){
                        this.move();
                        this.attack();
                    }
                }else{
                    delete(this.ship)
                }
            }
        },
        checkTarget : function () {
            if(this.target && this.target.todelete == false){
                this.dx = this.target.x - this.ship.x;
                this.dy = this.target.y - this.ship.y;
                this.targetRange2 = Math.abs(this.dx) + Math.abs(this.dy);
            }else{
                this.target = null;
            }
            for (var i = game.ships.length - 1; i >= 0; i--) {
                if(game.ships[i].side != this.side){
                    var dx = game.ships[i].x - this.ship.x;
                    var dy = game.ships[i].y - this.ship.y;
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
        move : function () {
            //console.log("move");
            //console.log("test");
            this.squareRange = (this.dx * this.dx) + (this.dy * this.dy);
            this.targetRange = Math.sqrt(this.squareRange);
            this.targetAngle = Math.atan(this.dy/this.dx) - Math.PI/2;
            if(this.dx > 0){
                this.targetAngle += Math.PI;
            }
            this.dangle = this.ship.body.angle - this.targetAngle;
            //console.log(this.ship.angle+"/"+this.targetAngle+"/"+this.dangle);
            
            if(this.dangle > Math.PI){
                this.dangle -= 2*Math.PI;
            }else if(this.dangle < -Math.PI){
                this.dangle += 2*Math.PI;
            }
            if(this.dangle > 0){
                this.ship.vangle -= this.ship.angleVelocity;
            }else if(this.dangle < 0){
                this.ship.vangle += this.ship.angleVelocity;
            }
            this.ship.vx += this.ship.velocity*Math.sin(this.ship.angle);
            this.ship.vy -= this.ship.velocity*Math.cos(this.ship.angle);
        },
        attack : function () {
            //this.ship.attack(this.target.x, this.target.y);
        },

    });
    return Pilot;
});