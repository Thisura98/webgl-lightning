### Stuff that I learned, studying WebGL (උගත් පාඩම්) ###

1. Shader Program = Vertex Shader + Frament Shader
2. Most of GL works like assembly - instead of OO. You store stuff in special variables (අසෙම්බ්ලි වල රෙජිස්ටර්ස් වල වගේ) and then GL consumes those variables.
3. To get __one__ object from $(...) you need to get the first element. Because by default jQuery returns an array objects. (I ran into this issue trying to get the context from the canvas object)
4. Vertex shaders get input from a var named `aVertexPosition` (a `vec4`) and multiplies it by 2 4x4 matrices (`uProjectionMatrix` and `uModelViewMatrix` - of type `mat4`) and then stores the result in `gl_Position`.
5. Fragment shaders stores result in `gl_FragColor` (its a `vec4`).
6. GL's `Uniform`s are similar to Javascript Globals.
7. Open GL's gl.FLOAT = 32 bit float integers. I.e.: Float32
8. A measurement `unit` in GL is exactly 0.1.
9. When `gl.drawArray()` uses draw mode `gl.TRIANGLE_STRIP` the position buffer must __not__ contain points in a clockwise manner. Any 3 consecutive set of points must complete a triangle that does not overlap another set.

    Example:
    ```
    let squarePoints = [
        0.1, 0.1,     ----+
        -0.1, 0.1,        | Triangle 1    ------+
        0.1, -0.1,    ----+                     | Triangle 2
        -0.1, -0.1                        ------+
    ];

    // Only this pattern will yield 
    // the expected result.
    ```
10. Varable Qualifiers.
    - `attribute`: Global variables that may change per vertex, that are passed from the OpenGL application to vertex shaders. This qualifier __can only be used in vertex shaders__. Note, this is why we only have `gl.vertexAttribPointer` but not `gl.fragmentAttribPointer`. For the shader this is a read-only variable.
    - `uniform`: Global variables that may change per primitive [...], that are passed from the OpenGL application to the shaders. This qualifier can be used in both vertex and fragment shaders. For the shaders this is a read-only variable.
    - `varying`: Used for interpolated data between a vertex shader and a fragment shader. Available for writing in the vertex shader, and read-only in a fragment shader.  
11. `gl.vertexAttribPointer()` - This method is called after we bind a buffer using `gl.bindBuffer(gl.ARRAY_BUFFER, ...)`, to tell GL about the data that's stored in that buffer, how to read it, and what variable location to feed them to in the vertex shader program. 

The `what variable location` part is figured out using the `gl.getAttribLocation(shader, <string name of the attribute>)`, after the shader has been compiled and linked.