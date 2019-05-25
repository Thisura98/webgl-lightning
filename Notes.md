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