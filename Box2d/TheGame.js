var LevelIndicator = function (game) { };
var GameOver = function (game) { };
var Level1 = function (game) { };
var Level2 = function (game) { };
var Level3 = function (game) { };
var Level4 = function (game) { };

var keyboard, player, playerSpeed = 400, flagGrp, jumpTimer = 0, onGround = false, MovesTxt, tutorial_txt,
    FlagTxt, Moves = 4, Pointer, JointsGroup = [], clickableArea, restart_txt, JointLine, bod,
    Level = 1, flagCount = 1, GameSettings, GroundSpikesGrp, spikeball, jump_Key = false, StartLevelSec = 2,destinationTeleport;

    Level1.prototype = {
        preload: function () {
            this.load.image("player", "img/box2d/player.png");
            this.load.image("flag", "img/box2d/flag.png");
            this.load.image('bar', 'img/box2d/loading.png');
            this.load.image('spikes', 'img/box2d/spikes1.png');
            this.load.image("emitter", "img/box2d/emitter.png");
            this.load.image('teleportEmitter', 'img/box2d/blue.png');
        },
        create: function () {
            Moves = 4;
            flagCount = 1;
            jump_Key = false;
            jumpTimer = 0;
            Level = 1;
            AddGameSettings(this.game);

            tutorial_txt.text = " click beside the ball to create a rope , try to reach the flag use <-  -> to move,Oops almost forgot be aware of your moves it might finish ";

            this.AddFlag(this.game);
            keyboard = this.input.keyboard.createCursorKeys();
            this.input.onDown.add(function (pointer) {
                Level1.prototype.MouseClicked(pointer, this.game);
            }, this);
        },
        update: function () {
            this.Movements(this.game);
            this.SetGameOver(this.game);
            this.ChangeLevel(this.game);
            //  if(JointLine)
            //       JointLine.fromSprite(player, bod, false);


        },
        render: function () {
            this.game.debug.box2dWorld();
            // this.game.debug.geom(JointLine);
            // this.game.debug.geom(clickableArea,"#FFFFFF");
        },
        CreatePhysics: function (game) {
            game.physics.startSystem(Phaser.Physics.BOX2D);
            game.physics.box2d.debugDraw.joints = true;
            game.physics.box2d.debugDraw.shapes = false;
            game.physics.box2d.gravity.y = 500;
            game.physics.box2d.restitution = 0.8;
            game.physics.box2d.setBoundsToWorld();
        },
        DrawText: function (game) {
            MovesTxt = game.add.text(20, 20, " M O V E S : " + Moves, { font: "12px Arial", fill: "#FFFFFF", align: "center" });
            MovesTxt.fixedToCamera = true;
            FlagTxt = game.add.text(20, 50, " F L A G S : " + flagCount, { font: "12px Arial", fill: "#FFFFFF", align: "center" });
            FlagTxt.fixedToCamera = true;

            tutorial_txt = game.add.text(400, 450, " ", { font: "12px Arial", fill: "#FFFFFF", align: "center" });
            tutorial_txt.anchor.setTo(0.5, 0.5);
            tutorial_txt.fixedToCamera = true;

            game.add.text(700, 20, "L E V E L : " + Level, { font: "12px Arial", fill: "#FFFFFF", align: "center" });

        },
        DrawPlayer: function (game) {
            var bar = game.add.sprite(game.world.centerX - 50, game.world.height - 70, "bar");
            bar.anchor.set(0.5, 0.5);
            game.physics.box2d.enable(bar);
            bar.body.static = true;
            bar.body.setCollisionCategory(4);

            player = game.add.sprite(game.world.centerX - 50, game.world.height - 82, "player");
            player.anchor.set(0.5, 0.5);
            player.debug = false;
            game.physics.box2d.enable(player);

            player.body.name = "player";
            player.checkWorldBounds = true;
            player.body.setCircle(10);


            GroundSpikesGrp = game.add.group();
            GroundSpikesGrp.enableBody = true;
            GroundSpikesGrp.physicsBodyType = Phaser.Physics.BOX2D;
            GroundSpikesGrp.setAll('body.checkWorldBounds', true);
            var y = 490, x = 1;
            for (i = 1; i < 17; i++) {
                if (i == 1) x = 10;
                else x += 50;
                var spike = GroundSpikesGrp.create(x, y, 'spikes');
                spike.body.name = "spike" + i;
                spike.body.setCollisionCategory(3);
                GroundSpikesGrp.add(spike);
                spike.body.static = true;
            }

            player.body.setCategoryContactCallback(2, this.playerCollision, game);// flag
            player.body.setCategoryContactCallback(3, this.playerSpikeCollision, game); // spikes
            player.body.setCategoryContactCallback(4, this.playerBarCollision, game); // bars
            player.body.setCategoryContactCallback(5, this.playerTeleportingDoorCollision, game); // teleporting machine
        },
        ChangeLevel: function (game) {

            if (flagCount == 0) {
                Level = Level + 1;
                game.state.start("LevelIndicator");
            }

        },
        AddFlag: function () {
            flagGrp = this.add.group();
            flagGrp.enableBody = true;
            flagGrp.physicsBodyType = Phaser.Physics.BOX2D;
            flagGrp.setAll('body.checkWorldBounds', true);
            flagGrp.setAll('body.outOfBoundsKill', true);

            var x = this.game.world.centerX - 100,
                y = this.game.world.centerY - 150;
            var flag = flagGrp.create(x, y, 'flag');
            flag.body.setCollisionCategory(2);
            flagGrp.add(flag);
            flag.body.static = true;


        },
        MouseClicked: function (pointer, game) {
            Level1.prototype.DestroyVisibleJoints();

            var MouseX = pointer.positionDown.x;
            var MouseY = pointer.positionDown.y;
            var playerX = player.body.x;
            var playerY = player.body.Y;
            // set a clickabl area around the player
            clickableArea = new Phaser.Rectangle(player.x - 150, player.y - 150, 300, 300)
            var inside = clickableArea.contains(MouseX, MouseY)
            if (!inside) return;

            bod = game.add.sprite(MouseX, MouseY, "player"); //new Phaser.Physics.Box2D.Body(this.game, null, MouseX, MouseY);
            game.physics.box2d.enable(bod);
            bod.anchor.set(0.5, 0.5);
            bod.scale.set(0.2, 0.2);

            bod.enableBody = true;
            bod.body.static = true;
            bod.body.gravityScale = 0;
            bod.body.setCircle(5);
            var joint = game.physics.box2d.ropeJoint(player, bod.body);
            JointsGroup.push(bod);
            if (Moves > 0)
                Moves--;
            MovesTxt.text = "M O V E S : " + Moves;
        },
        DestroyVisibleJoints: function () {
            for (i = 0; i < JointsGroup.length; i++) {
                JointsGroup[i].destroy();
            }
        },
        Movements: function (game) {
            //  player.body.setZeroVelocity(true);
            if (keyboard.left.isDown) {
                player.body.moveLeft(playerSpeed);
            }
            else if (keyboard.right.isDown) {
                player.body.moveRight(playerSpeed);
            }
            if (jump_Key) {
                if (keyboard.up.isDown && game.time.now > jumpTimer && onGround) {
                    jumpTimer = game.time.now + 200;
                    player.body.moveUp(playerSpeed * 2.3);
                }
            }

        },
        playerCollision: function (body1, body2, fixture1, fixture2, begin) {
            if (!begin) {
                return;
            }
            body2.sprite.kill();
            body2.destroy();
            flagCount--;
            FlagTxt.text = "F L A G S : " + flagCount;
        },
        playerSpikeCollision: function (body1, body2, fixture1, fixture2, begin) {
            if (!begin) {
                return;
            }
            body1.sprite.kill();
            body1.destroy();
            Level1.prototype.DieAnimation(game);
            //game.state.start("gameover");
        },
        playerBarCollision: function (body1, body2, fixture1, fixture2, begin) {
            if (!begin) {
                onGround = false;
                return;
            }
            onGround = true;
        },
        playerTeleportingDoorCollision: function (body1, body2, fixture1, fixture2, begin) {
            if (!begin)
            {
                return;
            }
            var x = player.body.x + 50;
            var y = player.body.y;
         var emitter4 = game.add.emitter(x, y, 200);
         emitter4.makeParticles('teleportEmitter');
         emitter4.setRotation(0, 0);
         emitter4.setAlpha(0.3, 0.8);
         emitter4.setScale(0.5, 1);
         emitter4.gravity = -200;
            //emitter.scale.setTo(0.5, 0.5);
         emitter4.start(true, 2000, null, 20);
            player.kill();
            setTimeout(function () {
                player.revive();
                if (Level == 4) {
                    player.body.x = destinationTeleport.body.x + 10;
                    player.body.y = destinationTeleport.body.y;
                }
            }, 1800);
        },
        SetGameOver: function (game) {
            if (Moves == 0) {
                if (flagCount > 0) {
                    Level1.prototype.DieAnimation(game);
                    return;
                }
            }
        },
        DieAnimation: function (game) {
            var x = player.body.x + 50;
            var y = player.body.y;
            emitter = game.add.emitter(x, y, 200);
            emitter.makeParticles('emitter');
            //emitter.scale.setTo(0.5, 0.5);
            emitter.pivot.setTo(0.5, 0.5);
            emitter.start(true, 2000, null, 20);

            setTimeout(function () {
                game.state.start("gameover");
            }, 1500);
        }
    };

Level2.prototype = {
    
    preload: function () { },
    create: function () {
        flagCount = 3;
        Moves = 7;
        AddGameSettings(this.game);
        tutorial_txt.text = " click beside the ball to create a rope , try to reach the flag ";
     //   keyboard = this.input.keyboard.createCursorKeys();
        this.input.onDown.add(function (pointer) {
            Level1.prototype.MouseClicked(pointer, this.game);
        }, this);

        this.DrawObjects();
    },
    update: function () {

        Level1.prototype.Movements(this.game);
        Level1.prototype.SetGameOver(this.game);
        Level1.prototype.ChangeLevel(this.game);
    },
    render: function () {
        this.game.debug.box2dWorld();
    },
    DrawObjects: function () {
       
     //   var bod1 = this.game.add.sprite(180, 370, 'bar'); //new Phaser.Physics.Box2D.Body(this.game, null, 100, 100);
    //    this.game.physics.box2d.enable(bod1);
    //    bod1.body.static = true;

        var bod2 = this.game.add.sprite(450, 250, 'bar'); //new Phaser.Physics.Box2D.Body(this.game, null, 100, 100);
        this.game.physics.box2d.enable(bod2);
        bod2.body.static = true;

  //      var bod3 = new Phaser.Physics.Box2D.Body(this.game, null, 100, 100);
  //      bod3.setRectangle(100, 5, 150, 50);
        
    //    var bod3 = this.game.add.sprite(250, 150, 'bar'); //new Phaser.Physics.Box2D.Body(this.game, null, 100, 100);
   //     this.game.physics.box2d.enable(bod3);
   //     bod3.body.static = true;


        flagGrp = this.add.group();
        flagGrp.enableBody = true;
        flagGrp.physicsBodyType = Phaser.Physics.BOX2D;
        flagGrp.setAll('body.checkWorldBounds', true);
        flagGrp.setAll('body.outOfBoundsKill', true);

        var x1 = 180,
            y1 = 280,
            x2 = 450,
            y2 = 160
            x3 = 250,
            y3 = 80;
        var flag1 = flagGrp.create(x1, y1, 'flag');
        flag1.body.setCollisionCategory(2);
        flagGrp.add(flag1);
        flag1.body.static = true;

        var flag2 = flagGrp.create(x2, y2, 'flag');
        flag2.body.setCollisionCategory(2);
        flagGrp.add(flag2);
        flag2.body.static = true;

        var flag3 = flagGrp.create(x3, y3, 'flag');
        flag3.body.setCollisionCategory(2);
        flagGrp.add(flag3);
        flag3.body.static = true;


    }
};


Level3.prototype ={

    preload: function () {
        this.load.image('spikeball', 'img/box2d/SpikesBall1.png');
    },
    create: function () {
        flagCount = 1;
        Moves = 2;
        playerSpeed = 200;
        jump_Key = true;
        AddGameSettings(this.game);
        tutorial_txt.text = "Use UP-key to jump ";

        spikeball = game.add.sprite(game.world.centerX - 50, 120, "spikeball");
        spikeball.anchor.set(0.5, 0.5);
        spikeball.enableBody = true;
        this.physics.box2d.enable(spikeball);
     //   spikeball.body.moves = false
        spikeball.body.static = true;
        spikeball.body.setCollisionCategory(3);

        this.DrawObjects();
        this.input.onDown.add(function (pointer) {
            Level1.prototype.MouseClicked(pointer, this.game);
        }, this);

      //  keyboard = this.input.keyboard.createCursorKeys();
       // space_Key = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function () {
        spikeball.body.angle++;
        Level1.prototype.Movements(this.game);
        Level1.prototype.SetGameOver(this.game);
        Level1.prototype.ChangeLevel(this.game);

    },
    render: function () {
        this.game.debug.box2dWorld();
    },
    DrawObjects: function () {
        flagGrp = this.add.group();
        flagGrp.enableBody = true;
        flagGrp.physicsBodyType = Phaser.Physics.BOX2D;
        flagGrp.setAll('body.checkWorldBounds', true);
        flagGrp.setAll('body.outOfBoundsKill', true);

        var x1 = 130,
            y1 = 70;
        var flag1 = flagGrp.create(x1, y1, 'flag');
        flag1.body.setCollisionCategory(2);
        flagGrp.add(flag1);
        flag1.body.static = true;

        var bod1 = this.game.add.sprite(480, 270, 'bar'); //new Phaser.Physics.Box2D.Body(this.game, null, 100, 100);
        this.game.physics.box2d.enable(bod1);
        bod1.body.static = true;
        bod1.body.setCollisionCategory(4);


    }

};

Level4.prototype = {
    preload: function () {
        this.load.image('teleport', 'img/box2d/teleport.png');
        
    },
    create: function () {
        this.game.stage.backgroundColor = '#000000';
        flagCount = 1;
        Moves = 2;
        jump_Key = true;
        playerSpeed = 200;
        AddGameSettings(this.game);
        tutorial_txt.text = "Wow what is that a DO-oR !! ";

        this.DrawObjects();
        this.input.onDown.add(function (pointer) {
            Level1.prototype.MouseClicked(pointer, this.game);
        }, this);
    },
    update: function () {
        Level1.prototype.Movements(this.game);
        Level1.prototype.SetGameOver(this.game);
        Level1.prototype.ChangeLevel(this.game);
    },
    render: function () {
        this.game.debug.box2dWorld();
    },
    DrawObjects: function () {

        flagGrp = this.add.group();
        flagGrp.enableBody = true;
        flagGrp.physicsBodyType = Phaser.Physics.BOX2D;
        flagGrp.setAll('body.checkWorldBounds', true);
        flagGrp.setAll('body.outOfBoundsKill', true);

        var x1 = game.world.centerX,
            y1 = 70;
        var flag1 = flagGrp.create(x1, y1, 'flag');
        flag1.body.setCollisionCategory(2);
        flagGrp.add(flag1);
        flag1.body.static = true;

        var bod1 = this.game.add.sprite(130, 140, 'bar'); //new Phaser.Physics.Box2D.Body(this.game, null, 100, 100);
        this.game.physics.box2d.enable(bod1);
        bod1.body.static = true;
        bod1.body.setCollisionCategory(4);

        var teleport1 = this.game.add.sprite(game.world.centerX - 50, game.world.height - 160, 'teleport');
        this.game.physics.box2d.enable(teleport1);
        teleport1.body.static = true;
        teleport1.body.setCollisionCategory(5);

        destinationTeleport = this.game.add.sprite(92, 124, 'teleport');
        this.game.physics.box2d.enable(destinationTeleport);
        destinationTeleport.body.static = true;
    }







};
LevelIndicator.prototype = {
    create: function () {
       // this.add.text(700, 20, "L E V E L : " + Level, { font: "12px Arial", fill: "#FFFFFF", align: "center" });
        this.time.events.repeat(Phaser.Timer.SECOND * StartLevelSec, 1, function () {
            this.game.state.start("Level" + Level);
        }, this);
    },
    render: function () {
        game.debug.text("LEVEL "+Level+" START IN : " + game.time.events.duration.toFixed(0), 250, 250);
    },
};

GameOver.prototype = {
    preload: function () {

    },
    create: function () {

        var txt = this.add.text(350, 200, " G A M E   O V E R ", { font: "30px Arial", fill: "#FFFFFF", align: "center" });
        txt.anchor.setTo(0.5, 0.5);

        var Restxt = this.add.text(350, 280, " R E S T A R T ", { font: "30px Arial", fill: "#FFFFFF", align: "center" });
        Restxt.anchor.setTo(0.5, 0.5);
        this.add.tween(Restxt).to({ angle: 1 }, 500).to({ angle: -1 }, 500).loop().start();
        Restxt.inputEnabled = true;
        Restxt.events.onInputDown.add(function () {
            this.game.state.start("Level1");
        }, this);
        Restxt.events.onInputOver.add(function () {
            this.game.canvas.style.cursor = "pointer";
        }, this);
        Restxt.events.onInputOut.add(function () {
            this.game.canvas.style.cursor = "default";
        }, this);
    }
};

function AddGameSettings(game)
{
    GameSettings = new Level1(game);
    GameSettings.CreatePhysics(game);
    GameSettings.DrawText(game);
    GameSettings.DrawPlayer(game);

}