
#extension GL_OES_standard_derivatives : enable

#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_position;
varying vec4 v_normal;
varying vec2 v_texcoord;
varying vec4 v_color;

uniform mat4 u_projectionMatrix;
uniform mat4 u_modelViewMatrix;
uniform mat4 u_normalMatrix;
uniform vec2 u_resolution;
uniform float u_time;

#if defined(VERTEX)

// attribute vec4 a_position; // myfolder/myfile.obj
attribute vec4 a_position;
attribute vec4 a_normal;
attribute vec2 a_texcoord;
attribute vec4 a_color;

void main(void) {
	v_position = u_projectionMatrix * u_modelViewMatrix * a_position;
	v_normal = u_normalMatrix * a_normal;
	v_texcoord = a_texcoord;
	v_color = a_color;
	gl_Position = v_position;
}

#else // fragment shader

uniform vec2 u_mouse;
uniform vec2 u_pos;
// uniform sampler2D u_texture; // https://cdn.jsdelivr.net/gh/actarian/plausible-brdf-shader/textures/mars/4096x2048/diffuse.jpg?repeat=true
// uniform vec2 u_textureResolution;

float checker(vec2 uv, float repeats) {
	float cx = floor(repeats * uv.x);
	float cy = floor(repeats * uv.y);
	float result = mod(cx + cy, 2.0);
	return sign(result);
}

void main() {
	vec2 p = v_texcoord;

	vec3 ambient = vec3(0.4);
	vec3 direction = vec3(0.0, 1.0, 1.0);
	vec3 lightColor = vec3(1.0);
	float incidence = max(dot(v_normal.xyz, direction), - 1.0);
	vec3 light = clamp(ambient + lightColor * incidence, 0.0, 1.0);
	   vec2 coord = gl_FragCoord.xy * 1.0 - u_resolution;
 vec3 color = vec3(float(coord.x), sin(u_time/ 5.), 2. * coord / -70.);

  color = vec3(0.0, 0.0, 0.0);

  float angle = atan(-coord.y + 95., coord.x - 9.5) * 0.6;


    float len = length(coord - vec2(- 600, - 650.));
  // len = length(coord.y - vec2(- 0.5, - 0.5));
  // len = length(coord.x - vec2(0.5, - 0.5));

   // color.b+= sin(len * 0.04 + angle * 90.+ u_time);
   color.b+= sin(len * 0.04 + angle - 90.+ u_time);
    color.b+= sin(len * -0.04 + angle - 90.+ u_time);
  color.r+= sin(len * -0.07 + angle * 0.09+ u_time);

    color.r+= sin(len * 0.04 + angle - 0.09+ u_time);

	//vec3 color = (0.2 * checker(p, 8.0) + v_normal.rgb);
	gl_FragColor = vec4(color * light, 1.0);
}

#endif
