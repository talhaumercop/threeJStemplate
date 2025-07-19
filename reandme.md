## 🎨 Shader Math Cheatsheet (Visual + Explained)

---
### `vec3 position`
It is the position of the vertices of a 3D model.  
It is on the **local space** of the model — meaning if the model rotates, these positions also rotate.  
📌 Use this when you want to work directly on the geometry/vertices of the model.

---

### `vec3 modelPosition`
It is the position of the model in the **world space** (i.e., scene).  
This doesn't change with the model’s rotation — it's been transformed using `modelMatrix`.

---

## 📌 `NOTE`
*`You can pass both of these from the vertex shader to the fragment shader to better visualize or compute world-space effects.`*

### 🟡 `normalize(vec3)`

**Purpose:** Converts a vector to a unit vector (length = 1), keeping its direction.

📌 **Use Case:** Used when direction matters more than length (e.g. lighting, normals).

```glsl
normalize(vec3(3.0, 4.0, 0.0))  // ➜ vec3(0.6, 0.8, 0.0)
```

**Visual:**

```
Before: ------------>
After:   -->         (Same direction, shorter size)
```

---
### 🛣️`distance(value,range)`

**Purpose:** Calculates the distance between a value and a range.  
Returns a **float from 0 to 1**.

**Example:**

```glsl
float distance = distance(uv, vec3(0.5));
```

**Visual:**

```
Input:   0 - - - - - 1
Output:  0 --- 1 --- 0
```


---
### 🔵 `pow(x, y)`

**Purpose:** Raises x to the power of y. Warps your gradients or curves.

📌 **Use Case:** Shape control of ramps, transitions, or procedural masks.

```glsl
pow(uv.x, 2.0)  // Skews the 0-1 range, making the gradient steeper
```

**Visual:**

```
Graph:
Input:   0 - - - - - 1
Output:  0 ---\\__ 1
              (steeper curve)
```

---

### 🟣 `mod(x, y)`

**Purpose:** Returns the remainder of `x / y`. Creates repeating patterns.

📌 **Use Case:** For grid effects, tiling, stripe patterns, checkerboards, etc.

```glsl
mod(uv.x * 10.0, 1.0)  // Repeats 0-1 pattern every 0.1 units
```

**Visual:**

```
Stripe effect:
| 0 | 1 | 2 | 3 | 4 | ➜ all remapped 0-1
|██|░░|██|░░|██|
```

---
### 🟤 `clamp(value,rangeX,rangeY)`

**Purpose:** Clamps a value between two ranges.

📌 **Use Case:**

* Limit values to a specific range (e.g., 0-1 for UVs)
* Create smooth transitions between ranges

```glsl
clamp(uv.x * 10.0, 0.0, 1.0)  // Clamps to 0-1 range
```

**Visual:**

```
Input:  0 --- 1 --- 2 --- 3 --- 4

Output: 0 --- 0 --- 0 --- 1 --- 1
```

### 🟠 `min(a,b)`

**Purpose:** Returns the smaller of two values.

📌 **Use Case:**

* Create a **ramp** from `0.0` to `1.0` based on a comparison.

```glsl
min(uv.x * 10.0, 1.0)  // Ramp from 0-10 to 0-1
```

**Visual:**

```
Input:  0 --- 1 --- 2 --- 3 --- 4

Output: 0 --- 0 --- 0 --- 1 --- 1
```

### 🔴 `dot(vecA, vecB)`

**Purpose:** Calculates the cosine of the angle between two vectors.
Gives a **float from -1 to 1**.

📌 **Use Case:**

* Fresnel effect
* Lighting intensity (Lambert)
* Angle comparison

```glsl
float fresnel = dot(normal, viewDirection);
```

**Visual Guide:**

```
If vecA == vecB      ➜ dot = 1.0  (same direction)
If vecA == -vecB     ➜ dot = -1.0 (opposite)
If vecA ⊥ vecB       ➜ dot = 0.0  (perpendicular)
```

**Example with GLSL:**

```glsl
float edgeGlow = 1.0 - dot(vNormal, viewDir);
```

---

## ✨ Fresnel Effect Example

### 🧪 Fragment Shader:

```glsl
vec3 distance = normalize(vPosition - cameraPosition); // Vector from camera to pixel
float fresnel = dot(vNormal, distance);               // Angle between view & normal
fresnel += 1.0;  // Shift range to avoid negative values
```

### 🧱 Vertex Shader:

```glsl
vec4 modelNormal = modelMatrix * vec4(normal, 0.0); // Transform normal to world space
vNormal = modelNormal.xyz;                          // Pass to fragment
vPosition = modelPosition.xyz;                      // Also pass vertex world position
```

💡 **What It Does:**

* Highlights the edges of objects based on angle to camera
* Brighter on grazing angles — perfect for rim light/glow effects

---

## 🟢 `gl_FrontFacing` in Fragment Shader

**Purpose:** Boolean indicating if the current fragment is from the front-facing side of a triangle.

📌 **Use Case:**

* Render different effects for front and back faces (e.g., x-ray shaders, stylized shading).

```glsl
if (!gl_FrontFacing) discard; // Only render front-facing fragments
```

---
### `gl_FragCoord`

**Purpose:** Represents the fragment's position in the window.

📌 **Use Case:**
* Whenever you like to draw something on the screen.
* Accessing pixel coordinates for custom effects.
* Positioning elements in a shader.

```glsl
vec2 uv = gl_FragCoord.xy / uResolution; // Normalized UV coordinates
```

---

## `dot product of normal and a direction`

**Purpose:** Calculates the cosine of the angle between two vectors.

📌 **Use Case:**
* Can be used to draw some pixals or animation differently according to the value(1,0,-1)
* Determines if a surface is facing a certain direction.
* Used in lighting models for shading and reflection.

```glsl
float dotProduct = dot(normal, direction);
```

**Visual Explanation:**

```
If dotProduct > 0 ➜ Surface is facing direction
If dotProduct = 0 ➜ Surface is perpendicular to direction
If dotProduct < 0 ➜ Surface is facing away from direction
```

---
### `🕶️halfton function`
```glsl
vec3 halftone(
    vec3 color,
    float repititions,
    vec3 direction,
    float low,
    float high,
    vec3 pointColor,
    vec3 normal
)
{
    //float intensity
    float intensity=dot(normal,direction);
    intensity=smoothstep(low,high,intensity);
    vec2 uv=mod((gl_FragCoord.xy/uResolution.y)*repititions,1.0);
    float point=distance(uv,vec2(0.5));
    point=1.0-step(point,0.5*intensity);

    return mix(pointColor,color,point);
}
```

## 🟠 `fract(x)`

**Purpose:** Returns only the decimal (fractional) part of a number. Always gives a **positive result** between `0.0` and `1.0`.

📌 **Use Case:** Useful in generating **repeating patterns** without negatives — e.g., UV wrapping, tile maps, or animation loops.

```glsl
fract(0.8)   ➜ 0.8
fract(-0.8)  ➜ 0.2
```

**Visual Explanation:**

```
fract(x) = x - floor(x)

So:
fract(0.8)   = 0.8 - 0   = 0.8
fract(-0.8)  = -0.8 - (-1) = 0.2
```

---

## 🧵 `smoothstep(edge0, edge1, x)`

**Purpose:** Smooth transition from 0.0 to 1.0 between two edges.

📌 **Use Case:** Anti-aliased edges, gradient masks, smoother shapes.

```glsl
smoothstep(0.3, 0.8, value)
```

**Visual:**

```
Input value < 0.3     ➜ Output 0.0
Input value > 0.8     ➜ Output 1.0
Between 0.3 - 0.8     ➜ Smooth curve
```

---

## ✳️ Points Size in Vertex Shader

Add this line at the **end of the vertex shader** to control size of points:

```glsl
gl_PointSize = 1.0; // Set point size for rendering
gl_PointSize *= (1.0 / -viewPosition.z); // Adjust size based on distance from camera
```

---
## ✳️ `remap function`
 Remaps a value from one numeric range to another
 
  @param value - Input value to be remapped
  @param origin - [UNUSED] Original reference point (currently redundant)
  @param originMax - Maximum value of input range
  @param originMin - Minimum value of input range
  @param destinationMin - Minimum value of output range
  @param destinationMax - Maximum value of output range
  @returns Value mapped to new range preserving proportional position
```glsl
float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax)
{
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

```
##  `clamp()`
Clamps a value between a minimum and maximum value.

📌 **Use Case:** Ensures a value stays within a specified range.

```glsl
float value = clamp(value, 0.0, 1.0); // Clamp value between 0 and 1
```

**Visual Explanation:**

```
If value < 0.0   ➜ Output 0.0
If value > 1.0   ➜ Output 1.0
Between 0.0 - 1.0 ➜ Output value
```

## Reverse of Pow()
if you want to get inverse result of power you can do this trick:
```glsl
result=1.0-pow(1.0-value,1.0);
```
---

## ✳️ Points Geometry Setup in Three.js

```js
const positionArray = new Float32Array(count * 3)
for (let i = 0; i < count; i++) {
    let i3 = i * 3
    positionArray[i3] = Math.random() - 0.5
    positionArray[i3 + 1] = Math.random() - 0.5
    positionArray[i3 + 2] = Math.random() - 0.5
}

const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3))

const material = new THREE.PointsMaterial({
    size: 0.1,
    color: 0xff0000,
    transparent: true,
    blending: THREE.AdditiveBlending
})

this.firework = new THREE.Points(geometry, material)
this.firework.position.set(0, 0, 0)
this.firework.scale.set(10, 10, 10)
this.scene.add(this.firework)
```

---

## ✳️ UV in Points Shader

When using `gl.POINTS`, there is **no UV attribute**. Instead, use:

```glsl
gl_PointCoord
```

This gives a `vec2` inside each point (0.0 to 1.0 range).

---

## ✳️ Fixing Texture Flip for Points

Sometimes textures appear flipped. Fix it with:

```js
texture.flipY = false // Flip the texture vertically if needed
```
### lights in glsl:
in fragment.glsl inlcude the light liek directional light and do this:
```glsl
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
        vec3(0.0),//color
        1.0 //intensity
    );
    light += pointLight(
        vec3(1.0),  //color
        10.0,                //intensity
        normal,             //normal
        vec3(0.0,0.25,0.0),//position
        viewDirection,       //view Direction
        30.0,
        vPosition,
        0.95
    );
    vec3 color=vec3(1.0);
    color*=light;
    gl_FragColor = vec4(color, 1.0);
```
varyings you have to do in vertex shaders:
    ```glsl
    vNormal=(modelMatrix*vec4(normal,0.0)).xyz;
    vPosition=modelPosition.xyz;
    ```

### `🔵specular Function to calculat or put the refelction over the object`:
```glsl
float specularReflection(
    vec3 LightDirection,// the direction in which the light is 
    vec3 viewDirection, // calculated in fragment
    vec3 normal //normalss
    )
{
    vec3 reflection=reflect(-LightDirection,normal);
    float specular=-dot(reflection,viewDirection);
    specular=max(specular,0.0);
    specular=pow(specular,30.0);

    return specular;
}
```

### cross(vecA,vecB):
cross product is a vector that is perpendicular to the plane that the two input vectors a and b span.
image:
![cross product](data:image/jpeg;base64,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)

### Neighbors technique for `GRID`:

vertexshader code:
```glsl
 float shift=0.01;    //how far the neighbors are going to be (you can twek this value according to what gives best result )
vec3 modelPositionA=modelPosition.xyz+vec3(shift,0.0,0.0); //this is the first neighbor
vec3 modelPositionB=modelPosition.xyz+vec3(0.0,0.0,-shift);//this is the second neighbor
 
//compute the normals
//if you have done animations on model position then do it below that after the optional part
vec3 toA=normalize(modelPositionA-modelPosition.xyz);
vec3 toB=normalize(modelPositionB-modelPosition.xyz);
vec3 computeNormals=cross(toA,toB);
 ```
 ### optional:
 ```glsl
//applying any animatioin or elevation  if you are doing on modelPosition (side by side so that our naighbr fragment also have same animaiton):
modelPositionA.y+=elevationFunction(modelPositionA);
modelPositionB.y+=elevationFunction(modelPositionB);

```

## `anistropy`
you can improve a texture by increasing anisotrpy 
``` js
earthDay.anisotropy=8
```


### `discard`:
# can have a performance impact
   ```glsl
    vec2 uv=gl_PointCoord;
    float distanceTOcenter=distance(uv,vec2(0.5,0.5));
    distanceTOcenter=1.0-step(0.5,distanceTOcenter);
    if(distanceTOcenter<0.5){
        discard;
    }
```
---

✨ Keep this cheat sheet open while working with GLSL / TSL shaders to understand how values move, repeat, and interact in space.
