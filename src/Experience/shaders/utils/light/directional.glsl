
vec3 directionalLight(vec3 lightColor, float lightIntensity,vec3 normal,vec3 lightPosition,vec3 viewDirection, float specularPower ){
    vec3 lightDirection= normalize(lightPosition);
    vec3 lightReflection= reflect(-lightDirection,normal);
    float shading= dot(lightDirection,normal);
    //shading
    shading = max(0.0,shading);
    //specular
    float specular= -dot(viewDirection,lightReflection);
    specular=max(0.0,specular);
    specular=pow(specular,specularPower);
    
    return lightColor*lightIntensity*(shading+specular);
   // return vec3(specular);
}