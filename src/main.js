let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, KeyUp, keyDown, keyA, keyD, keyW, keyS;

// Gabriel Rivera, Modded Rocket Patrol, 4/17/22, took around 15~ hours overall, 
// New Starship -(20) points
// New Weapon - (20) points
// New Timing/Scoring that adds time to clock (ONLY IN SINGLEPLAYER, Adds 1 second) -(20) points
// simultaneous two-player mode - (30) points
// Display Time in seconds on screen - (10) points
// Control Rocket after fired - (5) points
// Copyright Free background music - (5) points