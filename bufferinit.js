/**
 * Creates 'Buffers'.
 * What are they? No idea yet.
 * @param {WebGLRenderingContext} gl The GL Context
 */
function initBuffers(gl){
    let positionBuffer = gl.createBuffer();

    // Lets WebGL know that the 'ARRAY_BUFFER'
    // we'll be referring to from here on,
    // will be 'positionBuffer'.
    //
    // Note that this is not like OO, where we'd
    // normally pass the positionBuffer around.
    //
    // Instead, positionBuffer merely contains
    // a memory address that is assigned an empty
    // buffer after gl.createBuffer().
    //
    // That address is remembered by WebGL
    // after we tell it that it will be the target
    // 'ARRAY_BUFFER', using the following line.

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Array of points for the square
    let squarePoints = [
        0.1, 0.1,
        -0.1, 0.1,
        0.1, -0.1,
        -0.1, -0.1
    ];

    // Fill the ARRAY_BUFFER with the 
    // polygon data
    //
    // Don't know what 
    // gl.STATIC_DRAW means.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squarePoints), gl.STATIC_DRAW);

    return {
        position: positionBuffer
    };

}