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
            ship.canonsGroup0 = [];
            ship.canonsGroup1 = [];
            ship.canonsGroup2 = [];
            ship.canonsGroup3 = [];
        },
        turn : function () {
            if(this.ship){
                if(this.ship.body.destroyed == true){
                    game.gameOver();
                }else{
                    //this.checkTarget();
                    this.move();
                }
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
        setCanonsGroupState : function (group, state){
            for (var i = 0; i < this.ship["canonsGroup" + group].length; i++){
                this.ship["canonsGroup" + group][i].shoot = state;
            }
        },
        setCanonsState : function (activeGroup){
            for(var i = 0; i < 4; i++){
                if(i == activeGroup){
                    this.setCanonsGroupState(i, true);
                }else{
                    this.setCanonsGroupState(i, false);
                }
            }
        },
        move : function () {
            //console.log("hi");
            var backwardsPower = 0.3;

            if(game.keydown["z"] == true){
                this.setCanonsState(0);
            }else if(game.keydown["x"] == true){
                this.setCanonsState(1);
            }else if(game.keydown["c"] == true){
                this.setCanonsState(2);
            }else if(game.keydown["v"] == true){
                this.setCanonsState(3);
            }else{
                this.setCanonsState(-1);
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