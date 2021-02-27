
#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718


// Reference to
// http://thndl.com/square-shaped-shaders.html

// vec2 coord;


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

float circleSDF(){
  return length(gl_FragCoord.xy * 0.02 - u_resolution - 0.05) * 0.001;
}


void main(){
  vec2 coord = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
  //coord.x += sin(u_time) + cos(u_time * 2.1);
 // coord.y += cos(u_time) + sin(u_time * 1.6);


  vec2 translate = vec2(-0.0, -0.0);
  coord += translate;
  //vec3 color2 = 0.0;
  float color = 0.0;
  coord = rotate(0.1 * u_time) * coord;
  color += smoothstep(coord.y, 0., .10);

  coord = rotate(0.2 * u_time) * coord;
 // color += smoothstep(coord.y, 0., .10);

  coord = rotate(0.3 * u_time) * coord;
  color += smoothstep(coord.y, 0., .10);

  //color2.r = sin(-0.07 * 0.09+ u_time);


 color+= floor(0.1 + length(coord) - 0.9 * abs(sin(u_time * 0.9 / 6.0)));
 color+= floor(0.1 + length(coord) - 0.7 * abs(sin(u_time * 5. / 6.0)));

  color += 0.05 * (abs(sin(u_time)) + 0.1) / length(coord);
 
 vec3 color2 = vec3(0.0);


 //vec3 color = vec3(0.0);
  float d = 0.0;

  // Remap the space to -1. to 1.
  coord =  coord *2.-1.;

  // Number of sides of your shape
  int N = 3;

  // Angle and radius from the current pixel
  float a = atan(coord.x,coord.y)+PI;
  float r = TWO_PI/float(N);

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(coord);

  // color = vec3(d);
  coord = rotate(0.3 * -7.) * coord;

  for (int n = 1; n < 8; n++){
    float i = float(n);
    coord += vec2(0.9 / i * sin(i * coord.y + u_time + 0.3 * i) + 0.8, 0.4 / i * sin(coord.x + u_time + 0.3 * i) + 1.6);
      // color2 = vec3(1.0-smoothstep(.4,i*0.00008,d));

   color2 = vec3(1.0-smoothstep(.4,i*0.08,d));
   //color += smootcoordep(coord.y, i, .10);

  }
  color2 = vec3(0.5 * sin(coord.x) + color, 0.5 * sin(coord.y) + 0.5 * color, noise(coord.xy));
    //color.r = 0.03;

  //gl_FragColor = vec4(vec3(color), 1.0);
  gl_FragColor = vec4(color2, 1.0);

}

