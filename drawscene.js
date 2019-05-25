/**
 * Creates the projection matrix and 
 * returns it
 * @param {WebGLRenderingContext} gl The GL Context
 */
function gen_projectionMatrix(gl){
    // Create an empty 4x4 matrix
    let projectionMatrix = mat4.create();

    //        /
    //       /
    //      /   
    // CAM <     <- Angle of the field of view
    //      \   
    //       \
    //        \

    let fieldOfView = (45.0 * Math.PI) / 180.0;

    // Aspect ratio that matches our 
    // canvas's aspect ratio
    
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

    // We only want to see objects between 0.1 units
    // and 100 units away from the camera.
    let zNear = 0.1;
    let zFar = 100.0;

    mat4.perspective(
        projectionMatrix,           // Destination matrix
        fieldOfView,
        aspect,
        zNear,
        zFar  
    );

    return projectionMatrix;
}

/**
 * Creates the model view matrix
 * and returns it
 */
function gen_modelViewMatrix(){
    // Create an empty 4x4 matrix
    let modelViewMatrix = mat4.create();

    // Translate the matrix to where we want to 
    // start drawing the square

    mat4.translate(
        modelViewMatrix,            // Destination matri
        modelViewMatrix,            // Source matrix
        [0.0, 0.0, -0.6]            // Amount to translate
    );

    return modelViewMatrix;
}

/**
 * Draws the scene!!!
 * @param {WebGLRenderingContext} gl The GL Context
 * @param {string: any} programInfo Shader program info
 * @param {any: any} buffers The position buffer
 */
function drawScene(gl, programInfo, buffers){

    // Boiler plate code

    gl.clearColor(0.0, 0.0, 1.0, 1.0);      // Clear to blue, fully opaque
    gl.clearDepth(1.0)                      // Clear everything, wha?
    gl.enable(gl.DEPTH_TEST);               // What is depth testing?
    gl.depthFunc(gl.LEQUAL);                // "Near things obscure far things" - hmm

    // Clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // Matrices
    let projectionMatrix = gen_projectionMatrix(gl);
    let modelViewMatrix = gen_modelViewMatrix();

    let numComponents = 2;                  // Pull out 2 values per iteration from the ARRAY_BUFFER
    let type = gl.FLOAT;                    // The data in the buffer are 32bit floats
    let normalize = false;                  // Don't normalize ???
    let stride = 0;                         // How many bytes to skip between each iteration
    let bufferOffset = 0;                   // Starting offset in bytes, to read the buffer

    // Again, bind the buffers.
    //
    // Remember that in bufferinit.js we put the 
    // buffer data in a key called 'position'

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition, // The vertex attribute location in the shader program
        numComponents,
        type,
        normalize,
        stride,
        bufferOffset
    );
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition // The vertex attribute location in the shader program
    );

    gl.useProgram(programInfo.program);

    // Set shader uniforms ???

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix, // The uniform location in the shader program
        false,
        projectionMatrix
    );

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
    );
    
    // Boiler plate code: End

    // Draw the square using the ARRAY_BUFFER

    const vertexOffset = 0;
    const vertexCount = 4;

    gl.drawArrays(gl.TRIANGLE_STRIP, vertexOffset, vertexCount);

}