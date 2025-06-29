## 🎨 Shader Math Cheatsheet (Visual + Explained)

---

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

### 🟢 `smoothstep(edge0, edge1, x)`

**Purpose:** Interpolates smoothly between 0 and 1 as `x` moves from `edge0` to `edge1`.

📌 **Use Case:** For soft transitions, masking, blending effects.

```glsl
smoothstep(0.3, 0.8, value)  // 0 before 0.3, 1 after 0.8, smooth in-between
```

**Visual:**

```
Input:   0 --- 0.3 ~~~ 0.8 --- 1
Output:  0 --- 0   ~~~  1 --- 1
                  (smooth blend)
```

## 🟠 `fract(x)`

**Purpose:** Returns only the decimal (fractional) part of a number. Always gives a **positive result** between `0.0` and `1.0`.

📌 **Use Case:** Useful in generating **repeating patterns** without negatives — e.g., UV wrapping, tile maps, or animation loops.

```glsl
fract(0.8)   ➜ 0.8
fract(-0.8)  ➜ 0.2
fract(x) = x - floor(x)

So:
fract(0.8)   = 0.8 - 0   = 0.8
fract(-0.8)  = -0.8 - (-1) = 0.2
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

### 🟢 `gl_FrontFacing` (Fragment Shader)

**Purpose:** Tells whether the current fragment belongs to the front side of the geometry.

📌 **Use Case:** You can use this to render front and back faces differently.

```glsl
if (gl_FrontFacing) {
  color = vec3(1.0, 1.0, 1.0); // Front side — white
} else {
  color = vec3(1.0, 0.0, 0.0); // Back side — red
}
```

**Type:** `bool`

**Visual Hint:**

```
Front Side ➜ true
Back Side  ➜ false
```

---

✨ Keep this cheat sheet open while working with GLSL / TSL shaders to understand how values move, repeat, and interact in space.
