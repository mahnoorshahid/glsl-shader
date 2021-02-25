
///original: https://github.com/lewlepton/shadertutorialseries/blob/master/022_morphingGridBoxes/022_morphingGridBoxes.frag

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_text0;
uniform vec2 u_mouse;
float random(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
 
    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
 
    // Smooth Interpolation
 
    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);
 
    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}


mat2 rotate(float angle){
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}


void main(){
  vec2 coord = gl_FragCoord.xy * 1.0 - u_resolution;
    vec2 muv = u_mouse / u_resolution; 

     float n = noise(coord + sin(u_time) + cos(u_time));


//coord = rotate(0.09 * u_time) * coord;

  //REALLY COOL EFFECT
  //vec3 color = vec3(float(coord.x / 0.1), sin(u_time/ 5.), 2. * coord / -70.);
  ///vec3 color = vec3(float(coord.x / 0.1), sin(u_time/ 5.), 2. * length(coord + 20.)/10. +cos(u_time/ 5.) -100.);
  //vec3 color = vec3(float(coord.x), 5., 2. * length(coord )/10. + u_time/ 80. -60.);
vec3 color = vec3(0.0, 0.0, 0.0);
vec2 translate = vec2(-0.5);

//vec3 grid = abs(cos(coord.x / 20.0) + sin(coord.y / 20.0) - cos(u_time) * sin(u_time/ 0.7)) * 0.6;
//manipulate

  //float len = length(coord - vec2(0.5, 0.25));
  //float angle = atan(-coord.y + 0.7, coord.x- 0.5) * 1.0;
  //multiple with diff number to get a more defined line

  //COOOL EFFECT
  color += abs(cos(coord.x / 70.0) + sin(coord.y / 70.0) - cos(u_time) * sin(u_time/ 1.)) * 10.;
   color += abs(cos(coord.x / 10.0 ) + sin(coord.y / 10.0) - cos(u_time / 0.4) * sin(u_time/ 0.5)) * 3.;
  
  
  
   
  float angle = atan(-coord.y + 25., coord.x - 9.5) * 0.6;
    float len = length(coord - vec2(- 600.5, - 600.5));
  // len = length(coord.y - vec2(- 0.5, - 0.5));
  // len = length(coord.x - vec2(0.5, - 0.5));

//COOL EFFECT one
   // color.b+= sin(len * 0.04 + angle * 90.+ u_time);
   color.g+= sin(len * 0.04 + angle - 90.+ u_time);
    color.g+= sin(len * -0.04 + angle - 90.+ u_time);
  color.r+= sin(len * -0.07 + angle * 0.09+ u_time);

    color.g+= sin(len * 0.04 + angle - 0.09+ u_time);
  //   color.g+= sin(len * -0.04 + angle - 90.+ u_time);
  // color.r+= sin(len * -0.07 + angle * 0.09+ u_time);
  //RGB
   // color.r += abs(0.1 + length(coord) - 0.1 * abs(sin(u_time * 0.9 / 0.0)));
 // color.r+= sin(len * 0.07 + angle * 90.+ u_time);
//color.r+= sin(len * 0.07 + angle * 90.+ u_time);
//COOL EFFECT 2
   //color.g += abs(0.1 + length(coord) - 0.2 * abs(sin(u_time * 0.9 / 4.0)));
  //color += abs(0.1 + length(coord) + 0.6 * abs(sin(u_time * 0.3 / 9.0))) * 0.3;
 // color.g += abs(0.1 + length(coord) - 6. * abs(sin(u_time * 0.5)));

//color.r += abs(0.1 + length(coord) - 0.9 * abs(sin(u_time * 0.9 / 6.0)));//
   // color.g += abs(0.1 + length(coord) - 0.1 * abs(sin(u_time * 0.6 / 4.0)));
    //color.b += abs(0.1 + length(coord) - 0.6 * abs(sin(u_time * 0.3 / 9.0)));


vec3 colorA = vec3(2.0, 1.0, 0.4);
vec3 colorB = vec3(1.0, 0.8353, 0.0);
float pct = abs(sin(u_time)) * 0.6;

 color = mix(colorA, color, pct);
 //mixing = 
//color.r -= 0.1 + length(coord) + 4.;

  //gl_FragColor = vec4( 0.05/color, 1.);

  //full
  //gl_FragColor = texture2D(u_text0,coord);
  gl_FragColor += vec4(0.7/color + length(coord.x + 900. )/900. * 0.08 + length(coord.y + 500.)/500. * 0.08, 1.);

  //DIAMOND
  //gl_FragColor += vec4(0.1/color + length(coord.x + 950.)/950. * 0.8 + length(coord.y + 250.)/350. * 0.8, 1.);  


 //color = mix(colorB, color, pct);
  //CIRCLE
 ///  gl_FragColor = vec4(0.1/color + length(coord+ 500.)/900. * 0.8 + length(coord + 500.) / 400., 1.); 


} 