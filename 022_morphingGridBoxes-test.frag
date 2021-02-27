
///original: https://github.com/lewlepton/shadertutorialseries/blob/master/022_morphingGridBoxes/022_morphingGridBoxes.frag

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_text0;
uniform vec2 u_mouse;



// random and noise code from https://thebookofshaders.com/11/
float random(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}
 
vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
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
  //REALLY COOL EFFECT
 vec3 color = vec3(float(coord.x), sin(u_time/ 5.), 2. * coord / -70.);
 // vec3 color = vec3(float(coord.x / 0.1), sin(u_time/ 5.), 2. * length(coord + 20.)/10. +cos(u_time/ 5.) -100.);
  // color = vec3(float(coord.x), 5., 2. * length(coord )/10. + u_time/ 80. -60.);
color = vec3(0.0, 0.0, 0.0);

//vec3 grid = abs(cos(coord.x / 20.0) + sin(coord.y / 20.0) - cos(u_time) * sin(u_time/ 0.7)) * 0.6;
//manipulate

  
  float angle = atan(-coord.y + 25., coord.x - 9.5) * 0.6;
    float len = length(coord - vec2(- 600.5, - 600.5));
  // len = length(coord.y - vec2(- 0.5, - 0.5));
  // len = length(coord.x - vec2(0.5, - 0.5));

   // color.b+= sin(len * 0.04 + angle * 90.+ u_time);
   //color.g+= sin(len * 0.04 + angle - 90.+ u_time);
   // color.g+= sin(len * -0.04 + angle - 90.+ u_time);
  color.r+= sin(len * -0.07 + angle * 0.09+ u_time);

   // color.g+= sin(len * 0.04 + angle - 0.09+ u_time);
  //   color.g+= sin(len * -0.04 + angle - 90.+ u_time);
  // color.r+= sin(len * -0.07 + angle * 0.09+ u_time);


  coord = rotate(0.09 * u_time) * coord;
  //multiple with diff number to get a more defined line
  vec2 pos = vec2(coord* 4.);
  //float n = noise(pos + sin(u_time) + cos(u_time));

  float size = (sin(u_time * 0.03) * 0.5 + 0.5) * 0.3;
  size = (noise(vec2(u_time * 0.04)) * 0.5 + 0.5);


//float mouse = (0.7 / sin(coord.y + u_time + muv) / 8., 0.4 / sin(coord.x + u_time + 0.3) + 1.6);


//SHADER TWO - KEEP WITH DIFFERETN PART TWO
//******stage 2 - SHADER********
 color += abs(cos(coord.x / 40.0 + muv.x) + sin(coord.y / 40.0) - cos(u_time) * sin(u_time/ 1.)) *  13.;
  color += abs(cos(coord.y / 20.0 ) + sin(coord.x / 20.0) - cos(u_time / 0.4) * sin(u_time/ 0.5)) * 3. ;
   //color += abs(cos(coord.x / 90.0 ) + sin(coord.y / 60.0) - cos(u_time / 0.4) * sin(u_time/ 0.5)) * 3. ;
  
  
  ///SAHDER ONE KEEP IT - changed size to coord.xy
  //******SHADER********
  // color += abs(cos(size / 9.0 ) + sin(coord.x / 80.0) - cos(size/ 0.4) * sin(size/ 0.5)) * 3. ;
  
  //MOUSE
    //color += abs(cos(coord.x / 10.0) + sin(coord.y / 10.0) - cos(u_time / 0.4) * sin(u_time/ 0.5)) * 3.;
    //******stage one - SHADER********
   // color += abs(cos(coord.x / 20.0 ) + sin(coord.y / 20.0) - cos(u_time / 0.4) * sin(u_time/ 0.5)) * 3.;
    vec3 sm = vec3(smoothstep(0.6,0.196,coord.x));
   //vec2 test = vec2(coord.x / coord.x);
 
    //coord += vec2(0.9 / muv.x * sin(muv.x * coord.y+ u_time + 0.3 * muv.x) + 0.8, 0.4 / muv.x * sin(coord.x + u_time + 0.3 * muv.x) + 1.6) * 3. + muv.y;
     // coord += vec2(5./ coord.y * sin(coord.x * coord.y+ u_time + 0.3 * coord.x) + 0.8, 0.4 * sin(coord.x + u_time + 0.3 * muv.x) + 1.6) * 3. + muv.y;
     //coord += vec2(0.9 / coord.y * sin(coord.x * n + u_time + 0.3 * n) + 0.8, 0.4 * sin(coord.x + u_time + 0.3 * muv.x) + 1.6) * 3. + muv.y;

  
  //RGB
   // color.r += abs(0.1 + length(coord) - 0.1 * abs(sin(u_time * 0.9 / 0.0)));
  
  //KEEP THIS EFFECT PART THREE

  //******stage five -- spiral - SHADER********


  //******stage one - SHADER********
//COOL EFFECT 2
  // color.g += abs(0.1 + length(muv.y) - 0.2 * abs(sin(u_time * 0.9 / 4.0)));
 //  color.r += abs(0.1 + length(muv.y) + 0.6 * abs(sin(u_time * 0.3 / 9.0))) * 0.3;
  //color.g += abs(0.1 + length(coord) - 6. * abs(sin(u_time * 0.5)));
 


vec3 colorA = vec3(1.0, 0.8353, 0.0);
vec3 colorB = vec3(1.0, 0.8353, 0.0);
float pct = abs(sin(u_time)) * 0.6;

// color.g += cos(muv.x / 20.0 ) + sin(muv.y / 20.0) - cos(muv.y ) * sin(u_time/ 1.);

// color = mix(colorA, color - muv.y, pct);
 //mixing = 
//color.r -= 0.1 + length(coord) + 4.;

  //gl_FragColor = vec4( 0.05/color, 1.);

  //full
  //gl_FragColor = texture2D(u_text0,coord);
   vec3 hsbtemp = rgb2hsb(color);
   //******stage 4 - color change --- SHADER********
  ////color = hsb2rgb(vec3(hsbtemp[1], hsbtemp[0]*0.5, hsbtemp[2]*0.5));
 // gl_FragColor += vec4(0.7/color + length(coord.x + 500. )/790. * 0.08 + length(coord.y + 500.)/300. *0.00018, 1.);
  gl_FragColor += vec4(0.9/color + length(coord.x + 500. )/700. * 0.08 + length(coord.y + 500.)/300. *0.00018, 1.);

  //DIAMOND
 // gl_FragColor += vec4(0.1/color + length(coord.x + 550.)/750. * 0.8 + length(coord.y + 250.)/750. * 0.8, 1.);  


 //color = mix(colorB, color, pct);
  //CIRCLE
 //  gl_FragColor = vec4(0.1/color + length(coord+ 500.)/900. * 0.8 + length(coord + 500.) / 400., 1.); 


} 