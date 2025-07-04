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

---

✨ Keep this cheat sheet open while working with GLSL / TSL shaders to understand how values move, repeat, and interact in space.
