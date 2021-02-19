#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);
    vec2 translate = vec2(-0.5);

    //manipulate
    coord += translate;

    //RGB
    color.r += abs(0.1 + length(coord) - 0.9 * abs(sin(u_time * 0.9 / 6.0)));
    color.g += abs(0.1 + length(coord) - 0.1 * abs(sin(u_time * 0.6 / 4.0)));
    color.b += abs(0.1 + length(coord) - 0.6 * abs(sin(u_time * 0.3 / 9.0)));

//0.1/coloor makes the ouutline sharper
    gl_FragColor = vec4 (0.1 /color, 1.0);
}