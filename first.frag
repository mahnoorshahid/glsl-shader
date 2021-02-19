#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circleshape(vec2 position, float radius){
    return step(radius, length(position - vec2(0.5))); ///lenght returns the lenght of a vector. 
}

float rectshape(vec2 position, vec2 scale){
    //width and height, -scale... makes it smaller
    scale = vec2(0.7) - scale * 0.5;
    //L shape on bottom left 
    vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
    return shaper.x * shaper.y;
}


void main(){
    //makes everything larger //minus makes everything smaller by " * 0.2 - "
    vec2 coord = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x , u_resolution.y);
        vec2 position = gl_FragCoord.xy/ u_resolution.xy;

    vec3 color = vec3(0.0,0.0,0.0);
    color += 0.1 * (abs(sin(u_time)) + 0.1) / length(coord);
    //color += sin(coord.x * cos(u_time / 30.0) * 60.0) + sin(coord.y * cos(u_time/ 15.0) * 10.0);

    //default position is 0,0 / bottom left
    //position and radius
    float circle = circleshape(coord / 0.5 + 0.35, 0.7);
   // coord.x += sin(u_time) + 0.5;
     //gradient in color
    color = vec3(circle);
  //  color += length(coord / 0.5 * 0.5);

  //light pulse 
    color += 0.1  * (abs(sin(u_time) + 0.2)) /  length(coord / 0.5 * 0.5);
    
    //darken screen // inverted light with 0.1
    gl_FragColor = vec4(vec3(color), 1.0);
}

   //float rectangle = rectshape(position, vec2(0.06, 0.16));
   // color = vec3(rectangle);
   


