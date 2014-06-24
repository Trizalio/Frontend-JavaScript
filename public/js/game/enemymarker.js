define([
    'classy',
    'game/baseobject'
], function (
    Class,
    BaseObject
){
    var EnemyMarker = BaseObject.$extend ( {
        __init__ : function(enemy) {
            this.enemy = enemy;
            var img;
            img = resourses["gui_enemymarker"];
            this.$super(img);

            this.width = 20;
            this.height = 50;

            game.objects.push(this);
        },
        turn : function () {
            if(this.enemy.todelete == true || this.enemy.body.destroyed){
                this.todelete = true;
            }
            var dx = -game.x - this.enemy.x;
            var dy = -game.y - this.enemy.y;
            var targetAngle = Math.atan(dy/dx) + Math.PI/2;

            if(dx > 0){
                targetAngle += Math.PI;
            }
            this.x = -game.x + Math.sin(targetAngle)*renderer.sceneHeight/3;
            this.y = -game.y - Math.cos(targetAngle)*renderer.sceneHeight/3;
            this.angle = targetAngle;

            var range = Math.sqrt(dx*dx + dy*dy);
            this.alpha = range/renderer.sceneHeight;

            if(this.alpha > 1){
                this.alpha = 1;
            }
            this.alpha -= 0.4;

            if(this.alpha < 0){
                this.alpha = 0;
            }
            
        },
        draw : function () {
            this.$super(Image);
        },
    });
    return EnemyMarker;
});