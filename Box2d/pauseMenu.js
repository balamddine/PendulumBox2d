var pauseMenu = function (game) { };
var pausebtn;
pauseMenu.prototype = {
    preload: function () {
        //this.load.image('replybtn', 'img/box2d/Restart_btn.png');
   
    },
    create: function () {
        //pausebtn = this.add.sprite(380, 250, "replybtn");
        //pausebtn.anchor.setTo(0.5, 0.5);

        //this.EnableInput();

        //var PlayBtnTween = this.add.tween(pausebtn.scale).to({ x: 0.8, y: 0.8 }, 2000, Phaser.Easing.Back.Out, true, 0, 2000, -1);
    },
    EnableInput: function ()
    {
        //pausebtn.inputEnabled = true;
        //pausebtn.events.onInputDown.add(this.play, this);
        //pausebtn.events.onInputOver.add(this.inputOver, this);
        //pausebtn.events.onInputOut.add(this.inputOut, this);
    },
    play: function () {
        this.game.state.start("TheGame");
    },
    inputOver: function () {
        this.game.canvas.style.cursor = "pointer";
    },
    inputOut: function () {
        this.game.canvas.style.cursor = "default";
    }
}