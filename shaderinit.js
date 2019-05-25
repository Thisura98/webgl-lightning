/**
 * Creates a shader of a given type, 
 * uploads the source,
 * and compiles it
 * @param {WebGLRenderingContext} gl The GL Context
 * @param {*} type The type of the Shader Program
 * @param {String} source The source code for the Shader Program
 */
function loadShader(gl, type, source){
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    // Check compile status
    let compileStatus = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!compileStatus){
        outputMessage("Loading shader of type " + type + " failed.");

        // Error log
        console.log("Shader fail log. See console log.");
        console.log(gl.getShaderInfoLog(shaderProgram));

        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

/**
 * Initializes a shader program (vs + fs)
 * and returns it.
 * @param {WebGLRenderingContext} gl The GL Context
 * @param {String} vsSource The source code for the vertex shader
 * @param {String} fsSource The source code for the fragment shader
 */
function initShaderProgram(gl,vsSource, fsSource){
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create shader program (vs + fs)
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Don't know what this actually does
    gl.linkProgram(shaderProgram);

    // Check link status
    let linkStatus = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);

    if (!linkStatus){
        outputMessage("Loading shader program failed. See console log.");

        // Error log
        console.log("Shader Program fail log");
        console.log(gl.getProgramInfoLog(shaderProgram));

        return null;
    }

    return shaderProgram;
}