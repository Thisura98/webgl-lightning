/**
 * Set up the WebGL context and start rendering
 * content.
 */
function setupGlCanvas(){
    let canvas = $("#glCanvas")[0];

     // Initialize GL Context
    let gl = canvas.getContext("webgl");

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
 * Stuff to do when the document has
 * done loading
 */
$(document).ready(function(){
    setupGlCanvas();
});