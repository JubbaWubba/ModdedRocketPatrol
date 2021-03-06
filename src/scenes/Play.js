class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.audio('background', './assets/background.wav');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('missle', './assets/missle.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('spaceship2', './assets/zoomship.png');

        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9})
      }

    create() {
        // background audio, credited to Benjamin Tissot (also known as Bensound) from bensounds.com
        this.backgroundaudio = this.sound.add("background", { loop: true });
        this.backgroundaudio.play();
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        KeyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket',0,keyLEFT, keyRIGHT, KeyUp).setOrigin(0.5, 0);
        //add 2nd player rocket
        if(game.settings.multiplayer == 1) {
            this.p2Rocket = new Rocket(this, game.config.width/2+200, game.config.height - borderUISize - borderPadding, 'rocket',0,keyA, keyD, keyW).setOrigin(0.5, 0);
        }
         // add Missle (p1)
         this.p1missle = new Missle(this, game.config.width/2, game.config.height+10 - borderUISize - borderPadding, 'missle',0,keyDown).setOrigin(0.5, 0);
         if(game.settings.multiplayer == 1) {
         // add Missle (p2)
        this.p2missle = new Missle(this, game.config.width/2+200, game.config.height+10 - borderUISize - borderPadding, 'missle',0,keyS).setOrigin(0.5, 0);
         }
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship2(this, game.config.width, borderUISize*7 + borderPadding*5, 'spaceship2', 0, 40).setOrigin(0,0);
        this.ship1random = Phaser.Math.Between(1, 2);


        //animations 
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        this.p2Score =0;
 
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
  }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        if(game.settings.multiplayer == 1) {
            this.scoreRight = this.add.text(borderUISize + borderPadding+460, borderUISize + borderPadding*2, this.p2Score, scoreConfig);

        }
        //Game Over 
        this.GameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(100, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ??? to Menu', scoreConfig).setOrigin(0.5);
            this.GameOver = true;
        }, null, this)

        // initialize timer
        this.remaining = this.clock.getRemainingSeconds();
        this.timeleft = this.add.text(borderUISize + borderPadding+250, borderUISize + borderPadding*2, this.remaining, scoreConfig);

    }
    update() {
          // check key input for restart
        if(this.GameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.GameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if(!this.GameOver) {
            this.p1Rocket.update();             // update p1
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.p1missle.update();
            if(game.settings.multiplayer == 1) {
            this.p2missle.update();
            this.p2Rocket.update();             // update p2
            }


        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);   
        }
        

        if(this.checkCollision(this.p1missle, this.ship03)) {
            this.p1missle.reset()
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1missle, this.ship02)) {
            this.p1missle.reset()
            this.shipExplode(this.ship02);   
        }
        if (this.checkCollision(this.p1missle, this.ship01)) {
            this.p1missle.reset()
            this.shipExplode(this.ship01);   
        }
        if (this.checkCollision(this.p1missle, this.ship04)) {
            this.p1missle.reset()
            this.shipExplode(this.ship04);   
        }
        if(game.settings.multiplayer ==1){
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode2(this.ship03);   
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode2(this.ship02);   
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode2(this.ship01);   
            }
            if (this.checkCollision(this.p2Rocket, this.ship04)) {
                this.p2Rocket.reset();
                this.shipExplode2(this.ship04);   
            }
            
    
            if(this.checkCollision(this.p2missle, this.ship03)) {
                this.p2missle.reset()
                this.shipExplode2(this.ship03);   
            }
            if (this.checkCollision(this.p2missle, this.ship02)) {
                this.p2missle.reset()
                this.shipExplode2(this.ship02);   
            }
            if (this.checkCollision(this.p2missle, this.ship01)) {
                this.p2missle.reset()
                this.shipExplode2(this.ship01);   
            }
            if (this.checkCollision(this.p2missle, this.ship04)) {
                this.p2missle.reset()
                this.shipExplode2(this.ship04);   
            } 
        }
        this.timeupdate()
      }
    
      checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        }); 
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        if(game.settings.multiplayer == 0){

         this.clock.delay += 1000}
        this.sound.play('sfx_explosion');
      }

      shipExplode2(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        }); 
        // score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
        if(game.settings.multiplayer == 0){

         this.clock.delay += 1000}
        this.sound.play('sfx_explosion');
      }

    timeupdate() {
        this.remaining = this.clock.getOverallRemainingSeconds(); 
        this.timeleft.text =Math.floor(this.remaining * 1);
    }
  }

