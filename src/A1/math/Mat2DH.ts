import {Mat3, Vec2, Vec3, VectorBase} from "../../anigraph";




function _Vec2DH(x:number, y:number):Vec3{
    return new Vec3(x, y, 0)
    // TODO: Replace the line above with your own code

}
function _Point2DH(x:number, y:number):Vec3{
    return new Vec3(x, y, 1)
}


export class Mat2DH{
    static _Scale2D(scaleX:number, scaleY:number):Mat3{
        return new Mat3(scaleX, 0, 0, 0, scaleY, 0, 0, 0, 1)
        // TODO: Replace the line above with your own code
    }

    static _Translation2D(x:number, y:number):Mat3{
        return new Mat3(1, 0, x, 0, 1, y, 0, 0, 1)
        // TODO: Replace the line above with your own code
    }

    static Rotation2D(radians:number):Mat3{
        return new Mat3(Math.cos(radians), -Math.sin(radians), 0, Math.sin(radians), Math.cos(radians), 0, 0, 0, 1)
        // TODO: Replace the line above with your own code
    }

    static Scale2D(scaleXY:number):Mat3;
    static Scale2D(scaleXY:Vec2):Mat3;
    static Scale2D(scaleXY:number[]):Mat3;
    static Scale2D(scaleX:number, scaleY:number):Mat3;
    static Scale2D(...args:any[]):Mat3{
        if(args[0] instanceof Vec2){
            return Mat2DH._Scale2D(args[0].x, args[0].y);
        }else if(Array.isArray(args[0])) {
            return Mat2DH._Scale2D(args[0][0], args[0][1]);
        }else{
            if(args.length===1){
                return Mat2DH._Scale2D(args[0], args[0]);
            }else {
                return Mat2DH._Scale2D(args[0], args[1]);
            }
        }
    }

    static Translation2D(vecXY:Vec2):Mat3;
    static Translation2D(tx:number, ty:number):Mat3;
    static Translation2D(arrayXY:[number, number]):Mat3;
    static Translation2D(...args:any[]):Mat3{
        if(args[0] instanceof VectorBase) {
            return Mat2DH._Translation2D(args[0].x, args[0].y);
        }else if(Array.isArray(args[0])) {
            return Mat2DH._Translation2D(args[0][0], args[0][1]);
        }else{
            return Mat2DH._Translation2D(args[0], args[1]);
        }
    }

}


export function Vec2DH(x:number, y:number):Vec3;
export function Vec2DH(vec2:Vec2):Vec3;
export function Vec2DH(xy:[number, number]):Vec3
export function Vec2DH(...args:any[]){
    if(args[0] instanceof VectorBase) {
        return _Vec2DH(args[0].x, args[0].y);
    }else if(Array.isArray(args[0])) {
        return _Vec2DH(args[0][0], args[0][1]);
    }else{
        return _Vec2DH(args[0], args[1]);
    }
}

export function Point2DH(x:number, y:number):Vec3;
export function Point2DH(vec2:Vec2):Vec3;
export function Point2DH(xy:[number, number]):Vec3
export function Point2DH(...args:any[]){
    if(args[0] instanceof VectorBase) {
        return _Point2DH(args[0].x, args[0].y);
    }else if(Array.isArray(args[0])) {
        return _Point2DH(args[0][0], args[0][1]);
    }else{
        return _Point2DH(args[0], args[1]);
    }
}
