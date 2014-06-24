define([
    'classy'
], function (
    Class
){
    var Resourses = Class.$extend ( {

        __init__: function (){
            this.sprite_explosion1 = new Image();
            this.sprite_explosion1.src = 'static/JS-sprite_explosion1.png';
            this.sprite_explosion2 = new Image();
            this.sprite_explosion2.src = 'static/JS-sprite_explosion2.png';
            this.sprite_glow1 = new Image();
            this.sprite_glow1.src = 'static/JS-sprite_glow1.png';
            this.sprite_glow2 = new Image();
            this.sprite_glow2.src = 'static/JS-sprite_glow2.png';
            this.sprite_flame1 = new Image();
            this.sprite_flame1.src = 'static/JS-sprite_flame1.png';
            this.sprite_flame2 = new Image();
            this.sprite_flame2.src = 'static/JS-sprite_flame2.png';

            this.ship_canon_body1 = new Image();
            this.ship_canon_body1.src = 'static/JS-ship_canon_body1.png';
            this.ship_canon_body2 = new Image();
            this.ship_canon_body2.src = 'static/JS-ship_canon_body2.png';
            this.ship_canon_body3 = new Image();
            this.ship_canon_body3.src = 'static/JS-ship_canon_body3.png';
            this.ship_canon_body4 = new Image();
            this.ship_canon_body4.src = 'static/JS-ship_canon_body4.png';
            this.ship_canon_body5 = new Image();
            this.ship_canon_body5.src = 'static/JS-ship_canon_body5.png';
            this.ship_canon_gun1 = new Image();
            this.ship_canon_gun1.src = 'static/JS-ship_canon_gun1.png';
            this.ship_canon_gun2 = new Image();
            this.ship_canon_gun2.src = 'static/JS-ship_canon_gun2.png';
            this.ship_canon_gun3 = new Image();
            this.ship_canon_gun3.src = 'static/JS-ship_canon_gun3.png';
            this.ship_canon_gun4 = new Image();
            this.ship_canon_gun4.src = 'static/JS-ship_canon_gun4.png';
            this.ship_canon_gun5 = new Image();
            this.ship_canon_gun5.src = 'static/JS-ship_canon_gun5.png';
            this.ship_module0 = new Image();
            this.ship_module0.src = 'static/JS-ship_module0.png';
            this.ship_module1 = new Image();
            this.ship_module1.src = 'static/JS-ship_module0.png';
            this.ship_body0 = new Image();
            this.ship_body0.src = 'static/JS-ship_body0.png';
            this.ship_body1 = new Image();
            this.ship_body1.src = 'static/JS-ship_body1.png';
            this.ship_module_destroyed0 = new Image();
            this.ship_module_destroyed0.src = 'static/JS-ship_module_destroyed0.png';
            this.ship_module_destroyed1 = new Image();
            this.ship_module_destroyed1.src = 'static/JS-ship_module_destroyed0.png';
            this.ship_body_destroyed0 = new Image();
            this.ship_body_destroyed0.src = 'static/JS-ship_body_destroyed0.png';
            this.ship_body_destroyed1 = new Image();
            this.ship_body_destroyed1.src = 'static/JS-ship_body_destroyed1.png';

            this.background_star1 = new Image();
            this.background_star1.src = 'static/epic.png';

            this.shot1 = new Image();
            this.shot1.src = 'static/epic.png';

            this.background = new Image();
            this.background.src = 'static/background.png';

            this.shop_screen = new Image();
            this.shop_screen.src = 'static/JS-shop_screen.png';
        },
    });
    return Resourses;
});