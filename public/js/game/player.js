define([
    'classy', 
    'game/pilot'
], function (
    Class,
    Pilot
){
    var Player = Pilot.$extend ( {
        __init__ : function(ship, side) {
            this.$super(ship, side);
            ship.canonsGroup1 = [];
            ship.canonsGroup2 = [];
            ship.canonsGroup3 = [];
        },
        turn : function () {
            if(this.ship){
                if(this.ship.body.destroyed == true){
                    game.gameOver();
                }
                this.checkTarget();
                this.move();
                if(this.target){
                    this.attack();
                }
            }else{
                this.todelete = true;
            }
        },
        checkTarget : function () {
            this.$super();
        },
        move : function () {
            //console.log("hi");
            var backwardsPower = 0.3;
            for (var i = 0; i < this.ship.canonsGroup1.length; i++){
                if(game.keydown["x"] == true){
                    this.ship.canonsGroup1[i].shoot = true;
                }else{
                    this.ship.canonsGroup1[i].shoot = false;
                }
            }
            for (var i = 0; i < this.ship.canonsGroup2.length; i++){
                if(game.keydown["c"] == true){
                    this.ship.canonsGroup2[i].shoot = true;
                }else{
                    this.ship.canonsGroup2[i].shoot = false;
                }
            }
            for (var i = 0; i < this.ship.canonsGroup3.length; i++){
                if(game.keydown["v"] == true){
                    this.ship.canonsGroup3[i].shoot = true;
                }else{
                    this.ship.canonsGroup3[i].shoot = false;
                }
            }
            if(game.keydown["w"] == true){
                this.ship.vx += this.ship.velocity*Math.sin(this.ship.angle);
                this.ship.vy -= this.ship.velocity*Math.cos(this.ship.angle);
            }else if(game.keydown["s"] == true){
                this.ship.vx -= this.ship.velocity*Math.sin(this.ship.angle)*backwardsPower;
                this.ship.vy += this.ship.velocity*Math.cos(this.ship.angle)*backwardsPower;
            }
            if(game.keydown["a"] == true){
                this.ship.vangle -= this.ship.angleVelocity;
            }else if(game.keydown["d"] == true){
                this.ship.vangle += this.ship.angleVelocity;
            }

        },
        attack : function () {
            this.$super();
        },

    });
    return Player;
});