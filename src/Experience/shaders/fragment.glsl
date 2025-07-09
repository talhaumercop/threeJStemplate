varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

#include "./utils/light/directional.glsl"
#include "./utils/light/ambient.glsl"

void main()
{
    vec3 viewDirection=normalize(vPosition-cameraPosition);
    vec3 normal=normalize(vNormal);

    //light
    vec3 light=vec3(0.0);
    light += directionalLight(
        vec3(1.0),  //color
        1.0,                //intensity
        normal,             //normal
        vec3(-1.0,0.5,0.0),//position
        viewDirection,       //view Direction
        30.0  //specular power (refwcn)
    );
     light+=ambientLight(
        vec3(0.7333, 0.702, 0.702),//color
        1.0 //intensity
    );
    vec3 color=vec3(1.0);
    color*=light;
    gl_FragColor = vec4(vUv,1.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}