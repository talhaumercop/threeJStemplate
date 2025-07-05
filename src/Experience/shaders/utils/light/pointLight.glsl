
vec3 PointLight(vec3 lightColor, float lightIntensity,vec3 normal,vec3 lightPosition,vec3 viewDirection, float specularPower,vec3 Position,float lightDecay ){
   
    vec3 lightDelta= lightPosition - Position;
    float lightDistance=length(lightDelta);
    vec3 lightDirection= normalize(lightDelta);
    vec3 lightReflection= reflect(-lightDirection,normal);
    float shading= dot(lightDirection,normal);
    //shading
    shading = max(0.0,shading);
    //specular
    float specular= -dot(viewDirection,lightReflection);
    specular=max(0.0,specular);
    specular=pow(specular,specularPower);
    
    //Decay
    float decay=1.0-lightDistance*lightDecay;

    return lightColor*lightIntensity*decay*(shading+specular);
}
