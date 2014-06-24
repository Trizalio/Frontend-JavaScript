define([
    'classy',
    'game/baseobject'
], function (
    Class,
    BaseObject
){
    var StaticDepthObject = BaseObject.$extend ( {
        __init__ : function(type, number) {
            var img;
            if(type == 1 || type == "star"){
                img = resourses["background_star"+number];
            }
            if(type == 2 || type == "glow"){
                img = resourses["background_star"+number];
            }
            this.$super(img);


            var dispersion = 10000;
            if(type == 1 || type == "star"){
                this.x = (Math.random()-0.5)*dispersion;
                this.y = (Math.random()-0.5)*dispersion;
                this.angle = Math.random()*Math.PI*2;
                this.width = this.height = 150*(Math.random()+1);
                this.depth = 10*(Math.random()+1);
                game.background.push(this);
            }
            if(type == 2 || type == "glow"){
                this.x = (Math.random()-0.5)*dispersion;
                this.y = (Math.random()-0.5)*dispersion;
                this.angle = Math.random()*Math.PI*2;
                this.width = this.height = 1500*(Math.random()*4+1);
                this.alpha = Math.random()*0.1+0.02;
                this.depth = 10*(Math.random()+1);
                game.background.push(this);
            }
        },
        turn : function () {
            
        },
        draw : function () {
            this.$super(Image);
        },
    });
    return StaticDepthObject;
});