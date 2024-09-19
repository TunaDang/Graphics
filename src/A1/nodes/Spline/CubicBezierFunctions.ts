import {Color, Mat4, Vec2, Vec3, Vec4, VectorBase} from "../../../anigraph";

/*
The function below is technically optional, in that we won't grade it directly, but implementing it may save you some repeated effort on other parts.
For the curious, it also provides a convenient way to explore other types of splines.
 */
export function GetSplineSegmentValueForAlphaAndMatrix(alpha: number, matrix: Mat4, p0: VectorBase, p1: VectorBase, p2: VectorBase, p3: VectorBase):Vec2;
export function GetSplineSegmentValueForAlphaAndMatrix(alpha: number, matrix: Mat4, p0: VectorBase, p1: VectorBase, p2: VectorBase, p3: VectorBase):Vec3;
export function GetSplineSegmentValueForAlphaAndMatrix(alpha: number, matrix: Mat4, p0: VectorBase, p1: VectorBase, p2: VectorBase, p3: VectorBase):Color;
export function GetSplineSegmentValueForAlphaAndMatrix(alpha: number, matrix: Mat4, p0: VectorBase, p1: VectorBase, p2: VectorBase, p3: VectorBase):Vec4;
/**
 * Calculates the value of a cubic spline segment at a given parameter alpha using a transformation matrix.
 *
 * This function blends four control points (p0, p1, p2, p3) based on the parameter alpha and a 4x4 matrix.
 * The matrix influences the shape of the spline, allowing for different types of splines like Bezier or Catmull-Rom.
 *
 * @param {number} alpha - A value between 0 and 1 representing the position along the spline segment.
 * @param {Mat4} matrix - A 4x4 transformation matrix that dictates the blending of the control points.
    (Hint: the Mat4 class has many useful helper getters for you to get specific elements of a Matrix.
    e.g. you can get any column or row of a matrix easily)
 * @param {VectorBase} p0 - The first control point of the spline segment.
 * @param {VectorBase} p1 - The second control point of the spline segment.
 * @param {VectorBase} p2 - The third control point of the spline segment.
 * @param {VectorBase} p3 - The fourth control point of the spline segment.
 *
 * @returns {VectorBase} - The calculated position on the spline at the specified alpha.
 *
 * Example:
 * - For alpha = 0, the function returns the position at p0.
 * - For alpha = 1, the function returns the position at p3.
 * - For values between 0 and 1, the function interpolates between the control points based on the matrix configuration.
 */
export function GetSplineSegmentValueForAlphaAndMatrix(alpha:number, matrix:Mat4, p0:VectorBase, p1:VectorBase, p2:VectorBase, p3:VectorBase):VectorBase{
    let alphaV = new Vec4(1, alpha, alpha*alpha, alpha*alpha*alpha);
    let transform = matrix.times(alphaV)
    let c0 = p0.times(transform.elements[0])
    let c1 = p1.times(transform.elements[1])
    let c2 = p2.times(transform.elements[2])
    let c3 = p3.times(transform.elements[3])
    return c0.plus(c1.plus(c2.plus(c3)));
    // let xCoord = p0.elements[0] * transform.x + p1.elements[0] * transform.y + p2.elements[0] * transform.z + p3.elements[0] * transform.h;
    // let yCoord = p0.elements[1] * transform.x + p1.elements[1] * transform.y + p2.elements[1] * transform.z + p3.elements[1] * transform.h;
    // let zCoord = 0;
    // let hCoord = 0;
    // if (p0.nDimensions == 2){
    //     return new VectorBase([xCoord, yCoord]);}
    // else if (p0.nDimensions == 3) {
    //     zCoord = p0.elements[2] * transform.x + p1.elements[2] * transform.y + p2.elements[2] * transform.z + p3.elements[2] * transform.h;
    //     return new VectorBase([xCoord, yCoord, zCoord]);}
    // else {
    //     zCoord = p0.elements[2] * transform.x + p1.elements[2] * transform.y + p2.elements[2] * transform.z + p3.elements[2] * transform.h;
    //     hCoord = p0.elements[3] * transform.x + p1.elements[3] * transform.y + p2.elements[3] * transform.z + p3.elements[3] * transform.h;
    //     return new VectorBase([xCoord, yCoord, zCoord, hCoord]);}
    // TODO: Replace the line above with your own code (technically optional, but suggested)
}



/**
 * This function takes in a progress parameter alpha and four points representing the control points of a Bezier spline segment. Return the point corresponding to alpha along the segment.
 * @param alpha
 * @param p0
 * @param p1
 * @param p2
 * @param p3
 * @returns {VectorBase}
 * @constructor
 */
export function GetCubicBezierSplineSegmentValueForAlpha(alpha:number, p0:Vec2, p1:Vec2, p2:Vec2, p3:Vec2):Vec2;
export function GetCubicBezierSplineSegmentValueForAlpha(alpha:number, p0:Color, p1:Color, p2:Color, p3:Color):Color;
export function GetCubicBezierSplineSegmentValueForAlpha(alpha:number, p0:VectorBase, p1:VectorBase, p2:VectorBase, p3:VectorBase):VectorBase{
    let cubicBezier = new Mat4(1, -3, 3, -1, 0, 3, -6, 3, 0, 0, 3, -3, 0, 0, 0, 1);
    return GetSplineSegmentValueForAlphaAndMatrix(alpha, cubicBezier, p0, p1, p2, p3);    // TODO: Replace the line above with your own code
}

/**
 *
 * @param alpha
 * @param p0
 * @param p1
 * @param p2
 * @param p3
 * @constructor
 */
export function GetCubicBezierSplineSegmentDerivativeForAlpha(alpha:number, p0:Vec2, p1:Vec2, p2:Vec2, p3:Vec2):Vec2;
export function GetCubicBezierSplineSegmentDerivativeForAlpha(alpha:number, p0:VectorBase, p1:VectorBase, p2:VectorBase, p3:VectorBase):VectorBase{
    let c0 = p0.times(-3 + 6*alpha - 3*alpha*alpha);
    let c1 = p1.times(3 - 12*alpha + 9*alpha*alpha);
    let c2 = p2.times(6*alpha - 9*alpha*alpha);
    let c3 = p3.times(3*alpha*alpha);
    return c0.plus(c1.plus(c2.plus(c3)));
    // TODO: Replace the line above with your own code
}
