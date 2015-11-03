var preload = function (game) { };
preload.prototype = {
    preload: function () {
        this.load.image('playbtn', 'img/box2d/Play_btn.png');
        //this.load.image('logo', 'img/FastLim/logo.png');
        this.load.image('setting', 'img/box2d/stng.png');
     
    
        this.loadingBar = this.add.sprite(380, 240, "loadingbar");
        this.loadingBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.loadingBar);

    },
    create: function () {

       
        this.state.start("Menu");
      
    }
}