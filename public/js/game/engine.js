

define([
    'classy',
    'game/ship',
    'game/module',
    'game/pilot',
    'game/canon'
], function (
    Class,
    Ship,
    Module,
    Pilot, 
    Canon
){
    var Engine = Class.$extend ( {

        __init__: function (){
            //console.log(renderer);

        },
        moveObjects : function (objects) {
            for (var i = 0; i < objects.length; i++)
            {
                objects[i].turn();
            }
        },
        getRandomCanon : function () {
            var base = 1 + Math.round(Math.random());
            var type = 1 + Math.round(Math.random());
            return new Canon( base, type, 1);

        },
        addEnemy : function (power) {
            var enemyShip = new Ship(1, 1);
            var randomAngle = Math.random()*Math.PI*2;
            var sqrRange = renderer.sceneHeight*renderer.sceneHeight + renderer.sceneWidth*renderer.sceneWidth;
            var range = Math.sqrt(sqrRange);
            enemyShip.x = game.x + range*Math.sin(randomAngle);
            enemyShip.y = game.y + range*Math.cos(randomAngle);
            enemyShip.velocity = 0.06;
            enemyShip.angleVelocity = 0.0005;

            //plasmaCanon = new Canon( 1, 2, 1);
            //enemyShip.attachItem(plasmaCanon, "canon", enemyShip.body.slots[0], enemyShip.body);

            var sidePower = Math.random()*power;
            var backPower = Math.random()*power;
            if(sidePower < 1 && backPower < 0.5){
                backPower = 0.5;
            }else if(sidePower > 2){
                sidePower = 2;
            }else if(backPower > 2){
                backPower = 2;
            }


            enemyShip.velocity -= (sidePower+backPower)/100;
            enemyShip.angleVelocity -= (sidePower+backPower)/10000;

            if(backPower >= 0.25){
                var downModule = new Module(1, 0);
                enemyShip.attachModule(downModule, downModule.connections[0], 0, 
                    enemyShip.body.connections[0], enemyShip.body);

                if(backPower >= 0.5){
                    var plasmaCanon = this.getRandomCanon();
                    enemyShip.attachItem(plasmaCanon, "canon", downModule.slots[0], downModule);

                    if(backPower >= 0.75){
                        var downDownModule = new Module(1, 0);
                        enemyShip.attachModule(downDownModule, downDownModule.connections[0], 0, 
                            downModule.connections[1], downModule);

                        if(backPower >= 1){
                            var plasmaCanon = this.getRandomCanon();
                            enemyShip.attachItem(plasmaCanon, "canon", downDownModule.slots[0], downDownModule);

                            if(backPower >= 1.5){
                                var downDownLeftModule = new Module(1, 0);
                                enemyShip.attachModule(downDownLeftModule, downDownLeftModule.connections[3], 0, 
                                    downDownModule.connections[2], downDownModule);

                                var downDownRightModule = new Module(1, 0);
                                enemyShip.attachModule(downDownRightModule, downDownRightModule.connections[2], 0, 
                                    downDownModule.connections[3], downDownModule);
                                if(backPower >= 2){
                                    var plasmaCanon = this.getRandomCanon();
                                    enemyShip.attachItem(plasmaCanon, "canon", downDownLeftModule.slots[0], downDownLeftModule);

                                    var plasmaCanon = this.getRandomCanon();
                                    enemyShip.attachItem(plasmaCanon, "canon", downDownRightModule.slots[0], downDownRightModule);
                                }
                            }
                        }
                    }
                }
            }
            if(sidePower >= 0.5){
                var leftModule = new Module(1, 0);
                enemyShip.attachModule(leftModule, leftModule.connections[3], 0, 
                    enemyShip.body.connections[2], enemyShip.body);

                var rightModule = new Module(1, 0);
                enemyShip.attachModule(rightModule, rightModule.connections[2], 0, 
                    enemyShip.body.connections[3], enemyShip.body);

                if(sidePower >= 1){
                    var plasmaCanon = this.getRandomCanon();
                    enemyShip.attachItem(plasmaCanon, "canon", leftModule.slots[0], leftModule);

                    var plasmaCanon = this.getRandomCanon();
                    enemyShip.attachItem(plasmaCanon, "canon", rightModule.slots[0], rightModule);

                    if(sidePower >= 1.5){
                        var leftLeftModule = new Module(1, 0);
                        enemyShip.attachModule(leftLeftModule, leftLeftModule.connections[3], 0, 
                            leftModule.connections[2], leftModule);

                        var rightRightModule = new Module(1, 0);
                        enemyShip.attachModule(rightRightModule, rightRightModule.connections[2], 0, 
                            rightModule.connections[3], rightModule);

                        if(sidePower >= 2){
                            var leftLeftCanon = new Canon( 2, 2, 1);
                            enemyShip.attachItem(leftLeftCanon, "canon", leftLeftModule.slots[0], leftLeftModule);

                            var rightRightCanon = new Canon( 2, 2, 1);
                            enemyShip.attachItem(rightRightCanon, "canon", rightRightModule.slots[0], rightRightModule);
                        }

                    }
                }
            }
            enemyPilot = new Pilot(enemyShip, 0);
            game.pilots.push(enemyPilot);

            game.ships.push(enemyShip);

            //console.log(enemyShip.x + ", " + enemyShip.y);
        }
    });
    return Engine;
});