// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}


// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

void main() {
    
    
    
//     vec2 st = gl_FragCoord.xy/u_resolution.xy;
//     st.x *= u_resolution.x/u_resolution.y;

//     vec3 color = vec3(0.);
//     color = vec3(st.x,st.y,abs(sin(u_time)));
float timeMov = random(vec2(sin(u_time * 0.00003)));
    float change =  sin(u_time);
//     gl_FragColor = vec4(color,1.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec4 color = vec4(0.0);
    
    
     // Divide the space in 4
    st = tile(st,4.);
     
    // color.r += fbm(st*3.0);  
    //     color.g += fbm(st*2.184);    
    //     color.b += fbm(st*3.0);    

    vec2 pos = vec2(0.5)-st;

    float r = length(pos) * 3.736 + sin(u_time);
    float a = atan(pos.y,pos.x);

    float f = cos(a*3.);
     f = abs(cos(a*4.200));
    //f=smoothstep(-.5,1., cos(a*10.864));
    // f = abs(cos(a*2.5))*.5+.3;
     //f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
      f = smoothstep(-0.476,change, cos(a*change/0.127))* 0.624 +- 0.816;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

    
  vec2 pixelSize = vec2(1.0) / u_resolution;
  vec2 offset = pixelSize * 10.0;
    
    
    color.r = random(vec2(offset - 1.480));
    color.g = random( vec2(0.340,0.780));
    color.b = random( vec2(offset));
    
    
    
//    color.r = color - offset;
    //color.g = random( vec2(-0.310,0.260));
   // color.b = random( vec2(0.070,0.500));
    
    
    color = vec4( color-smoothstep(f,f+0.940,r) );
    
    
    /////OFFSETT//////
    
    
    
    
    
    
      // this variable will be used to offset the color channels
  // try changing the 10.0 here to see a bigger or smaller change
  

  // make a vec4 for each color channel (rgb)
  // on the red and blue channels, we will move the texture coordinates just a little
  //vec4 rTex = color.r - offset);
  //vec4 gTex = texture2D(tex0, uv);
 // vec4 bTex = texture2D(tex0, uv + offset);

  // recombine the three texures into a single one for output
  
    
    color = vec4(color.r, color.g, color.b, 1.0);

  gl_FragColor = color;
    
    
    
    /////0FFSETT////

    gl_FragColor = vec4(color);
}