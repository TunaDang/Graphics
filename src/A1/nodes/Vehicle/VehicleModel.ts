import {
    AObject, AObjectState,
    ASerializable,
    ASVGModel,
    Color,
    Mat3,
    Mat4,
    NodeTransform3D,
    SVGAsset, V2,
    Vec2, Vec3
} from "../../../anigraph";
import {Mat2DH, Point2DH, Vec2DH} from "../../math";
import {TrackModel} from "../Track/TrackModel";

export enum VehicleDriveMode{
    Linear="Linear",
    BezierSpline="BezierSpline",
}

@ASerializable("VehicleModel")
export class VehicleModel extends ASVGModel{
    static DriveModes=VehicleDriveMode;
    driveMode!:VehicleDriveMode;

    /**
     * We will measure speed in bezier segments traveled per second.
     */
    speed:number=1;

    /**
     * Here we declare a an attribute `matrix2DH` that is a 3x3 matrix representing a 2D homogeneous transformation
     * ("2D Homogeneous"). `matrix2DH` itself is comprised of a getter and setter that wrap access to the underlying
     * protected attribute, `_matrix2DH`. This pattern of writing a getter and setter for a protected attribute lets us
     * implement specific code to be called whenever the attribute is read or written. In this case, we will signal a
     * geometry update any time the setter is called.
     */
    protected _matrix2DH:Mat3;
    get matrix2DH(){
        return this._matrix2DH;
    }
    set matrix2DH(m:Mat3){
        this._matrix2DH = m;
        this.signalGeometryUpdate();
    }

    startTime!:number;
    _color!:Color;
    scale:number=0.7;


    /** Get set color */
    set color(value){this._color = value;}
    get color(){return this._color;}


    get track():TrackModel{
        return this.parent as TrackModel;
    }

    constructor(svgAsset?:SVGAsset, startTime?:number, driveMode?:VehicleDriveMode, speed?:number) {
        super(svgAsset);
        this._matrix2DH = new Mat3();
        this.startTime = startTime??0;
        this.driveMode=driveMode??VehicleModel.DriveModes.Linear;;
        this.speed = speed??1.0;
    }


    setColor(color:Color){
        this._color = color;
        this.signalGeometryUpdate();
    }


    getPositionForTime(t:number){
        let progress = this.getLapProgressForTime(t);
        switch (this.driveMode){
            case VehicleModel.DriveModes.Linear:
                return this.track.getLinearInterpolationPoint(progress);
            case VehicleModel.DriveModes.BezierSpline:
                return this.track.getCubicBezierInterpolationPoint(progress);
            default:
                throw new Error(`Unrecognized drive mode ${this.driveMode}`);
        }
    }

    getVelocityForTime(t:number){
        let progress = this.getLapProgressForTime(t);
        switch (this.driveMode){
            case VehicleModel.DriveModes.Linear:
                return this.track.getLinearInterpolationVelocity(progress+0.001);
            case VehicleModel.DriveModes.BezierSpline:
                return this.track.getCubicBezierVelocityVector(progress);
            default:
                throw new Error(`Unrecognized drive mode ${this.driveMode}`);
        }
    }

    getLapProgressForTime(t:number){
        let age = t-this.startTime;
        let timePerLap = (this.track.nBezierSegments/this.speed);
        let timeOnCurrentLap = age%timePerLap;
        return timeOnCurrentLap/timePerLap;
    }

    /**
     * You should set the `this.matrix2DH` property of the vehicle model to position, scale, and orient the vehicle
     * correctly in space. Its position should be the value returned by
     * returned from `this.getPositionForTime(currentTime)` and oriented so that the front of the car is facing toward
     * the vector returned by `this.getDirectionForTime(currentTime)`.
     * @param time
     */
    update(currentTime:number){


        /**
         * Possibly useful debugging task:
         * Think about what the behavior of each of these should be, and compare it to what you see on screen
         */
        this.matrix2DH = new Mat3();
        // this.matrix2DH = Mat2DH.Rotation2D(currentTime);
        // this.matrix2DH = Mat2DH.Translation2D(V2(Math.cos(currentTime), Math.sin(currentTime)));
        // this.matrix2DH = Mat2DH.Scale2D(1+0.2*Math.cos(currentTime),1+0.2*Math.sin(currentTime));
        let angle = Math.atan2(this.getVelocityForTime(currentTime).y, this.getVelocityForTime(currentTime).x);
        this.matrix2DH = Mat2DH.Translation2D(this.getPositionForTime(currentTime)).times(Mat2DH.Rotation2D(angle-Math.PI/2).times(Mat2DH.Scale2D(this.scale,this.scale)));
        // TODO:(Replace with your code when not debugging)


        this.signalGeometryUpdate()

    }
}
