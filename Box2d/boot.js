var boot = function (game) { };
boot.prototype = {
    preload: function () {
        // preload the loading indicator first before anything else
        this.load.image('loadingbar', 'img/box2d/loading.png');
       
    },
    create: function () {

        this.stage.backgroundColor = "#000000"; //"#124184";
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.setScreenSize();
        this.state.start("Preload");
    }
}