#ifdef GL_ES
precision mediump float;
#endif
 
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
 
vec2 createGrid( in vec2 st, in vec2 grid, out vec2 indices ){
 
// multiply by the number of cells
// [0,1] range => [0,10] (for example)
st *= grid;
 
// get the cell indices

// for example, in a grid of 10x10:
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
indices = floor(st);
 
// use fract to get the fractional amount of st
// 9.5 => 0.5
// shows the xy coordinate in each cell
st = fract(st);
 
return st;
}
 
float drawCircle (vec2 st, vec2 pos, float size){
float result = distance (st, pos);
result=1.-step(size,result);
 
 
return result;
}
 
void main() {
 
vec2 st = gl_FragCoord.xy/u_resolution.xy;
st.x *= u_resolution.x/u_resolution.y;
 
// good practice to take a copy of the original st
// before you change it
vec2 st0 = st;
 
vec2 indices;
 
// This divides the result of the sin function, changing the final size of the circle
float size = 4.;
 
// This changes the period of the sin function, changing the speed at which the circles animate
float speed = 5.;
 
// Create grid for circles
st = createGrid( st, vec2(5., 5.), indices);
 
// Set bg colour
vec3 color = vec3(0.995,0.764,0.451);
// Change the colour and sin function of each column
if(indices.x == 0.){
float r = drawCircle(st, vec2(0.5), sin(u_time*speed)/size);
color = mix( color, vec3(0.683,0.289,1.000), r);
}else if(indices.x == 1.){
float r = drawCircle(st, vec2(0.5), sin(u_time*speed+1.)/size);
color = mix( color, vec3(1.000,0.243,0.831), r);
}
else if(indices.x == 2.){
float r = drawCircle(st, vec2(0.5), sin(u_time*speed+2.)/size);
color = mix( color, vec3(1.000,0.118,0.380), r);
}
else if(indices.x == 3.){
float r = drawCircle(st, vec2(0.5), sin(u_time*speed+3.)/size);
color = mix( color, vec3(1.000,0.188,0.236), r);
}
else if(indices.x == 4.){
float r = drawCircle(st, vec2(0.5), sin(u_time*speed+4.)/size);
color = mix( color, vec3(1.000,0.237,0.122), r);
}
 
gl_FragColor = vec4(color,1.0);
}