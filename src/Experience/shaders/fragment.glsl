void main()
{
    gl_FragColor = vec4(0.2,0.8, 0.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}