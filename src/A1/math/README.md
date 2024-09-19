# Mat2DH

Implement:
- `_Vec2DH(x:number,y:number)` which should create a homogeneous 2D vector (as a `Vec3`) with the x and y coordinate `x` and `y`.
- `_Point2DH(x:number, y:number)` which should return a homogeneous 2D point (as a `Vec3`) with the x and y coordinate `x` and `y`.
- `_Scale2D(scaleX:number, scaleY:number)` which should return a homogeneous scale transformation (as a `Mat3`, which represents a 3x3 matrix) that scales by `x` in the x dimension and `y` in the y dimension.
- `_Translation2D(x:number, y:number):Mat3` which should return a homogeneous translation transformation (as a `Mat3`, which represents a 3x3 matrix) that translates by `x` in the x dimension and `y` in the y dimension.
- `Rotation(radians:number)` which should return a homogeneous rotation transformation (as a `Mat3`, which represents a 3x3 matrix) that rotates by `radians` radians (counter-clockwise in standard coordinates).

Once you have implemented the above, you can use the functions:

- `Vec2DH(...)` overloaded version of `_Vec2DH` to take inputs in different forms
- `Point2DH(...)` overloaded version of `_Point2DH` to take inputs in different forms
- `Mat2DH.Rotation2D`
- `Mat2DH.Translation2D()` overloaded version of `_Translation2D`
- `Mat2DH.Scale2D()` overloaded version of `_Scale2D`
