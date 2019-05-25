/**
 * The GL Context
 * Initialized at setupGlCanvas()
 */
var gl = null;

/**
 * Set up the WebGL context and start rendering
 * content.
 */
function setupGlCanvas(){
    let canvas = $("#glCanvas")[0];

     // Initialize GL Context
    gl = canvas.getContext("webgl");

    if (gl === null){
        outputMessage("Your browser is not compatible with WebGL");
        return;
    }

    // Set clear color to Blue, alpha = 1.0
    gl.clearColor(0.0, 0.0, 1.0, 1.0);

    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
}

/**
 * The main function.
 * 
 * Should be called after setupGlCanvas()
 */
function main(){
    // Vertex shader program
    let vsSource = `
        attribute vec4 aVertexPosition;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        void main(){
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
    `;

    // Fragment shader program
    // Give some fixed color for each vertex
    let fsSource = `
        void main(){
            gl_FragColor = vec4(0.5, 0.0, 0.2, 1.0);
        }
    `;

    let shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    
    // Collect all the info needed to use the shader program.
    // Look up which attribute our shader program is using
    // for aVertexPosition and look up uniform locations.
    let programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition')
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
        }
    };

    let buffers = initBuffers(gl);

    drawScene(gl, programInfo, buffers)
}

/**
 * Stuff to do when the document has
 * done loading
 */
$(document).ready(function(){
    setupGlCanvas();
    main();
});