var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render }, false, false);

var player;
var cono;
var coneGroup;
var cursors;

function preload() {
    game.load.image('player', 'res/img/mario.png');
    game.load.image('cono', 'res/img/cono.png');
    game.load.physics('cono_physics', 'res/cono.json');
}

function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    coneGroup = game.add.group();

    //cono
    cono = game.add.sprite(200,200, 'cono');
    game.physics.p2.enable(cono, true);
    cono.body.clearShapes();
    cono.body.static = true;
    cono.body.loadPolygon("cono_physics", 'cono');

    //player
    player = game.add.sprite(220, 150, 'player');
    game.physics.p2.enable(player, true);
    player.body.clearShapes();
    player.body.loadPolygon('cono_physics', 'mario')
    player.body.fixedRotation = true;

    //add to group
    coneGroup.add(cono);
    coneGroup.add(player);


    cursors = game.input.keyboard.createCursorKeys();

    tween();
}

function update() {
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    if (cursors.left.isDown)
    {
        player.body.moveLeft(60);
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(60);
    }
    if (cursors.up.isDown)
    {
        player.body.moveUp(30);
    }
    else if (cursors.down.isDown)
    {
        player.body.moveDown(30);
    }

}

function render() {

    game.debug.body(player, 32, 32);

}


function tween() {
    var tween1 = game.add.tween(coneGroup).to({y: 0}, 1000);
    var tween2 = game.add.tween(coneGroup).to({y: 15}, 1000);

    tween1.onComplete.add(function() {
        tween2.start();
    });
    tween2.onComplete.add(function() {
        tween1.start();
    });

    tween1.start();
}