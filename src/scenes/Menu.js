class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    
    preload() {
      // load audio
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {
      let menuConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 0
    }
    // Texts on Screen
    this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2, 'WASD or Arrow keys to fire and move', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00FF00';
    menuConfig.color = '#000';
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, '←Novice, →Expert, or ↓multiplayer', menuConfig).setOrigin(0.5);
    // Keybinds 
    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // easy mode
        game.settings = {
          spaceshipSpeed: 3,
          spaceship2Speed: 6,
          gameTimer: 60000,
          multiplayer: 0,    
        }
        console.log(game.settings.multiplayer)
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // hard mode
        game.settings = {
          spaceshipSpeed: 2,
          spaceship2Speed: 8,
          gameTimer: 45000,
          multiplayer: 0,    
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
      if (Phaser.Input.Keyboard.JustDown(keyDown)) {
        // Multiplayer
        game.settings = {
          spaceshipSpeed: 3,
          spaceship2Speed: 7,
          gameTimer: 60000,
          multiplayer: 1,    
        }
        console.log(game.settings.multiplayer)
        this.sound.play('sfx_select');
        this.scene.start('playScene');    
      }
    }
  }

