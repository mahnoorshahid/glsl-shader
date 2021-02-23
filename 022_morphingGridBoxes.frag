
///original: https://github.com/lewlepton/shadertutorialseries/blob/master/022_morphingGridBoxes/022_morphingGridBoxes.frag

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_text0;
uniform vec2 u_mouse;


mat2 rotate(float angle){
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}


void main(){
  vec2 coord = gl_FragCoord.xy * 1.0 - u_resolution;
    vec2 muv = u_mouse / u_resolution; 

     // coord = rotate(0.09 * u_time) * coord;
  //REALLY COOL EFFECT
  //vec3 color = vec3(float(coord.x / 0.1), sin(u_time/ 5.), 2. * coord / -70.);
  ///vec3 color = vec3(float(coord.x / 0.1), sin(u_time/ 5.), 2. * length(coord + 20.)/10. +cos(u_time/ 5.) -100.);
  //vec3 color = vec3(float(coord.x), 5., 2. * length(coord )/10. + u_time/ 80. -60.);
vec3 color = vec3(0.0, 0.0, 0.0);
vec2 translate = vec2(-0.5);

//vec3 grid = abs(cos(coord.x / 20.0) + sin(coord.y / 20.0) - cos(u_time) * sin(u_time/ 0.7)) * 0.6;
//manipulate

  float len = length(coord - vec2(0.5, 0.25));
  float angle = atan(-coord.y + 0.7, coord.x- 0.5) * 1.0;
  //multiple with diff number to get a more defined line
  color += abs(cos(coord.x / 20.0) + sin(coord.y / 20.0) - cos(u_time) * sin(u_time/ 1.)) * 10.;
   color += abs(cos(coord.x / 10.0 ) + sin(coord.y / 10.0) - cos(u_time / 0.4) * sin(u_time/ 0.5)) * 3.;
  
  
  
  //RGB
   // color.r += abs(0.1 + length(coord) - 0.1 * abs(sin(u_time * 0.9 / 0.0)));
  color.r+= sin(len * 0.07 + angle * 90.+ u_time);
color.r+= sin(len * 0.07 + angle * 90.+ u_time);
//COOL EFFECT 2
  // color.g += abs(0.1 + length(coord) - 0.2 * abs(sin(u_time * 0.9 / 4.0)));
  //color += abs(0.1 + length(coord) + 0.6 * abs(sin(u_time * 0.3 / 9.0))) * 0.3;
  //color.g += abs(0.1 + length(coord) - 6. * abs(sin(u_time * 0.5)));


vec3 colorA = vec3(2.0, 1.0, 0.4);
vec3 colorB = vec3(1.0, 0.8353, 0.0);
float pct = abs(sin(u_time)) * 0.6;

 color = mix(colorA, color, pct);
 //mixing = 
//color.r -= 0.1 + length(coord) + 4.;

  //gl_FragColor = vec4( 0.05/color, 1.);

  //full
  //gl_FragColor = texture2D(u_text0,coord);
  gl_FragColor += vec4(0.7/color + length(coord.x + 500. )/500. * 0.08 + length(coord.y + 500.)/500. * 0.08, 1.);

  //DIAMOND
  gl_FragColor += vec4(0.1/color + length(coord.x + 250.)/250. * 0.8 + length(coord.y + 250.)/350. * 0.8, 1.);  


 //color = mix(colorB, color, pct);
  //CIRCLE
 ///  gl_FragColor = vec4(0.1/color + length(coord+ 500.)/900. * 0.8 + length(coord + 500.) / 400., 1.); 


} 