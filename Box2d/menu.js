var menu = function (game) { };
var playbtn,stng_btn;
menu.prototype = {
    preload: function () {
        

        playbtn = this.add.sprite(380, 250, "playbtn");
        playbtn.anchor.setTo(0.5, 0.5);
       
        
        stng_btn = this.add.sprite(30, 30, "setting");
        stng_btn.anchor.setTo(0.5, 0.5);
       
        //this.logo = this.add.sprite(380, 90, "logo");
        //this.logo.anchor.setTo(0.5, 0.5);

        //fb_btn = this.add.sprite(680, 470, "fb");
        //fb_btn.anchor.setTo(0.5, 0.5);

        //twitter_btn = this.add.sprite(720, 470, "twitter");
        //twitter_btn.anchor.setTo(0.5, 0.5);

        //instagram_btn = this.add.sprite(760, 470, "insta");
        //instagram_btn.anchor.setTo(0.5, 0.5);

    },
    create: function () {

     
        this.EnableInput();

        var PlayBtnTween = this.add.tween(playbtn.scale).to({ x: 0.8, y: 0.8 }, 2000, Phaser.Easing.Back.Out, true, 0, 2000, -1);
        //var fbTween = this.add.tween(fb_btn.scale).to({ x: 0.8, y: 0.8 }, 1500, Phaser.Easing.Back.Out, true, 0, 2300, -1);
        //var twitterTween = this.add.tween(twitter_btn.scale).to({ x: 0.8, y: 0.8 }, 1500, Phaser.Easing.Back.Out, true, 0, 2300, -1);
        //var instaTween = this.add.tween(instagram_btn.scale).to({ x: 0.8, y: 0.8 }, 1500, Phaser.Easing.Back.Out, true, 0, 2300, -1);

        //this.game.input.keyboard.onDownCallback = function (e) {
        //    if (e.keyCode == 13)
        //    {
        //        //this.game.state.start("Levels");
        //        this.game.state.start("level2");
        //    }
        //}

    },
    update:function(){
        stng_btn.angle += 1;
      
    },
    EnableInput: function () {
        playbtn.inputEnabled = true;
        playbtn.events.onInputDown.add(this.play, this);
        playbtn.events.onInputOver.add(this.inputOver, this);
        playbtn.events.onInputOut.add(this.inputOut, this);

        stng_btn.inputEnabled = true;
        stng_btn.events.onInputDown.add(this.settings, this);
        stng_btn.events.onInputOver.add(this.inputOver, this);
        stng_btn.events.onInputOut.add(this.inputOut, this);

        //fb_btn.inputEnabled = true;
        //fb_btn.events.onInputOver.add(this.inputOver, this);
        //fb_btn.events.onInputOut.add(this.inputOut, this);

        //twitter_btn.inputEnabled = true;
        //twitter_btn.events.onInputOver.add(this.inputOver, this);
        //twitter_btn.events.onInputOut.add(this.inputOut, this);

        //instagram_btn.inputEnabled = true;
        //instagram_btn.events.onInputOver.add(this.inputOver, this);
        //instagram_btn.events.onInputOut.add(this.inputOut, this);

    },
    play: function () {
        this.game.state.start("Level1");
    },
    settings:function(){
        this.state.start("Settings");
    },
    inputOver: function () {
        this.game.canvas.style.cursor ="pointer";
    },
    inputOut: function () {
        this.game.canvas.style.cursor = "default";
    }
}