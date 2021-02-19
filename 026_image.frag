#ifdef GL_ES
precision mediump float;
#endif

////https://www.shadertoy.com/view/4ljBRK
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
//
uniform sampler2D u_text0;

//get texture coordinates from vert shader
//varying vec2 vTexCoord;

float circleShape(vec2 position, float radius){
  return step(radius, length(position - vec2(0.5)));
}

void main(){
  vec2 coord = gl_FragCoord.xy / u_resolution;
    vec2 muv = u_mouse / u_resolution; 
  vec3 color = vec3(0.0);
 
vec3 colorA = vec3(2.0, 1.0, 0.4);
vec3 colorB = vec3(1.0, 0.8353, 0.0);

  //vec2 uv = vTexCoord;
  
  //texture is loaded upside down and backwards by default, so flip it
 // coord.y = 0.7/coord.y;
   //coord.y = abs(cos(coord.x / 20.0) + sin(coord.y / 20.0) - cos(u_time) * sin(u_time/ 1.));
  //coord.x += abs(cos(coord.x / 20.0) + sin(coord.y / 20.0) - cos(u_time) * sin(u_time/ 1.));
  
  
  //color += abs(cos(coord.x / 20.0) + sin(coord.y / 20.0) - cos(u_time) * sin(u_time/ 1.)) * 3.;
  //vec2 image = vec3(0.);
 // image += abs(cos(coord.x / 20.0) + sin(coord.y / 20.0) - cos(u_time) * sin(u_time/ 1.)) * 3.;
//vec4 image = vec4(0.0);
    vec4 stateValues = vec4(texture2D(u_text0, coord));

  vec4 image = texture2D(u_text0, coord);
  image.rgb += sin(coord.x * 5.0);
   image.rgb += cos(coord.y * 5.0);
   ////
    // image.r += cos(muv.x / 90.0 ) + sin(muv.y / 20.0) - cos(u_time) * sin(u_time/ 1.);
    // image.b += cos(muv.y / 10.0 ) + sin(muv.y * 20.0) - cos(u_time) * sin(ud_time/ 1.);


    ///
 image.g += cos(muv.x / 20.0 ) + sin(muv.y / 20.0) - cos(muv.y ) * sin(u_time/ 1.);
   image.b += cos(muv.y / 20.0 ) + sin(muv.y * 20.0) - cos(muv.y ) * sin(u_time * 1.) * 5.;

  //R Affected 2 times, then there are dots
  // image.r += cos(coord.y * 90.0);
 // image.g += cos(coord.y * 90.0);
    // Lerp from background -> gradient 1 -> gradient 2.
    if (stateValues.x < 0.5) {
        color = mix(colorA, colorB, stateValues.x);
    } 

 color = mix(color, image.rgb, 1.0);
   gl_FragColor += vec4(0.2/color + length(coord.x + 50. )/40. * 0.08 + length(coord.y + 500.)/500. * 0.08, 1.);

  //gl_FragColor = vec4(color, 1.0);
}