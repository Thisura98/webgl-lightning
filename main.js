// PIXI app
const screenWidth = 640.00;
const screenHeight = 480.00;
const rainBaseSpeed = 27;
const rainMaxSpeed = 30.0;
const rainSpriteCount = 100;
const thunderBaseSegments = 10;
const thunderMaxSegments = 20;
var app = null;
var loadIndex = 0;

// Images
const images = {
    rain_single: './images/rain_single.png'
};

$(document).ready(function(){
    console.log("Lightning Ready!");

    setupPIXI();
    setupScene();
});

function setupPIXI(){

    // Determine graphics mode
    var type = 'WebGL';
    if (!PIXI.utils.isWebGLSupported()){
        type = 'canvas';
    }

    $('#debug-mode').html(type);

    console.log(`Setting up PIXI in ${type} mode`);
    PIXI.utils.sayHello(type);

    // Create app and renderer settings
    app = new PIXI.Application({
        width: screenWidth,
        height: screenHeight,
        antialias: true,
    });
    app.renderer.backgroundColor = 0x0e1e36;
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';
    app.renderer.autoDensity = true;

    const container = document.getElementById('graphics-container');
    container.appendChild(app.view);

    // Resize the rendering canvas on 
    // window resize
    window.addEventListener('resize', function(e){
        scaleToWindow(app.renderer.view, '#000000');
    });
    scaleToWindow(app.renderer.view, '#000000');

}

function setupScene(){
    // Load images
    PIXI.Loader.shared
        .add([
            images.rain_single
        ])
        .load(afterSetupScene);

    // Animations
    app.ticker.add(animate);
}

/**
 * @return number
 */
function getSomeRainSpeed(){
    return rainBaseSpeed + Math.random() * (rainMaxSpeed - rainBaseSpeed)
}

function afterSetupScene(){

    // Setup Sprites

    const spriteContainer = new PIXI.ParticleContainer();

    for (var i = 0; i < rainSpriteCount; i++){
        const rainSprite = new PIXI.Sprite(
            PIXI.Loader.shared.resources[images.rain_single].texture
        );

        const xPos = Math.random() * screenWidth;
        const yPos = Math.random() * screenHeight;
        const speed = getSomeRainSpeed();

        rainSprite.x = xPos;
        rainSprite.y = yPos;
        rainSprite.speed = speed;
        rainSprite.rotation = Math.PI / 2.0;
        rainSprite.height = 1.0
        // rainSprite.width = rainSprite.width / 2.0

        spriteContainer.addChild(rainSprite);
    }

    app.stage.addChild(spriteContainer);

    // Setup Graphics

    const graphicsContainer = new PIXI.Container();
    const graphics = new PIXI.Graphics();    
    const pathMapped = createLightningPath();

    graphics.lineStyle(2, 0xFFFFFF, 1.0);
    for(var i=0; i<pathMapped.length; i += 2){
        const x = pathMapped[i];
        const y = pathMapped[i + 1];

        if (i == 0)
            graphics.moveTo(x, y);
        else
            graphics.lineTo(x, y);
    }

    graphicsContainer.addChild(graphics);

    app.stage.addChild(graphicsContainer);

    loadIndex++;
}

/**
 * @return Array
 */
function createLightningPath(){

    const segs = (thunderBaseSegments + Math.random() * ( thunderMaxSegments - thunderBaseSegments ));
    const centerLine = Math.random() * screenWidth;
    const segHeight = 1.0 / segs;

    var pathRaw = [0.0, 0.0];

    for (var i = 2; i < (segs * 2); i += 2){
        var x = 0.01;
        var y = 0;

        if (Math.max(0, (i - 2)) % 4 == 0){
            x = -x;
        }

        y = i / 2 * segHeight
        
        pathRaw.push(x);
        pathRaw.push(y);
    }

    /*
    const pathRaw = [
        0.0, 0.0,
        -0.01, 0.1,
        0.01, 0.2,
        -0.01, 0.3,
        0.01, 0.4,
        -0.01, 0.5,
        0.01, 0.6,
        -0.01, 0.7,
        0.01, 0.8,
        -0.01, 0.9,
        0.01, 1.0
    ];*/

    const pathMapped = pathRaw.map((c, i, a) => {
        if (i % 2 == 0){
            // x
            return centerLine + (c * screenWidth);
        }
        else{
            // y
            return c * screenHeight;
        }
    });

    console.log(pathRaw, pathMapped);

    return pathMapped;
}

function animate(){
    if (loadIndex != 1)
        return;

    const spriteContainer = app.stage.children[0];

    for (var i = 0; i < spriteContainer.children.length; i++){
        const sprite = spriteContainer.children[i];

        if (sprite.y > screenHeight){
            sprite.y = -sprite.width;
        }
        else{
            sprite.y += sprite.speed;
        }
    }
}