# What to implement

### In `SplineModel.ts`

- `GetCubicBezierSplineSegmentValueForAlpha`: this function should take a progress parameter and four control points 
- `nBezierSegments`: simple getter that returns the current number of bezier segments defined by the current vertices. This is just to make sure you understand how control points are interpreted as spline segments in a chain.
- `getLinearInterpolationPoint(progress:number)`
- `getCubicBezierInterpolationPoint(progress:number)`


### In `VehicleModel.ts`
- `update(time:number)`
