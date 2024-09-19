import { VehicleDriveMode} from "../A1/nodes";
import {Vec3, VertexArray2D} from "../anigraph";
import {TrackModel} from "../A1/nodes/Track/TrackModel";
import {
    ArrayEqualTo,
    ArrayCloseTo,
    MatrixEqual,
    VecEqual,
    VertexArray2DCircToBeCloseTo,
    VertexArray2DToBeCloseTo
} from "./helpers/TestHelpers";

expect.extend(ArrayCloseTo);

const track = new TrackModel();
track.setVerts(new VertexArray2D([
    0, 0, 1,
    0, 1, 1,
    1, 1, 1,
    1, 0, 1,
    1, -1, 1 // last control point
]))

const linearCar = track.addVehicle(undefined, undefined, undefined, VehicleDriveMode.Linear);
const bezierCar = track.addVehicle(undefined, undefined, undefined, VehicleDriveMode.BezierSpline);

describe("Vehicle Model Update Tests", () => {
    const v = new Vec3(1, 0, 1);

    test("Linear vehicle at time 0.0", () => {
        linearCar.update(0);
        const m = linearCar.matrix2DH;
        expect(m.times(v).elements).ArrayCloseTo([0.7, 0, 1]);
    });

    test("Linear vehicle at time 0.2", () => {
        linearCar.update(0.2);
        const m = linearCar.matrix2DH;
        expect(m.times(v).elements).ArrayCloseTo([0.7, 0.6, 1]);
    });

    test("Linear vehicle at time 1.0", () => {
        linearCar.update(1);
        const m = linearCar.matrix2DH;
        expect(m.times(v).elements).ArrayCloseTo([0.7, 0, 1]);
    });

    test("Bezier vehicle at time 0.0", () => {
        bezierCar.update(0);
        const m = bezierCar.matrix2DH;
        expect(m.times(v).elements).ArrayCloseTo([0.7, 0, 1]);
    });

    test("Bezier vehicle at time 0.2", () => {
        bezierCar.update(0.2);
        const m = bezierCar.matrix2DH;
        expect(m.times(v).elements).ArrayCloseTo([0.7216470588235293,0.15058823529411774,1], null, null, [0.01, 0.01, 0.01]);
    });

    test("Bezier vehicle at time 1.0", () => {
        bezierCar.update(1);
        const m = bezierCar.matrix2DH;
        expect(m.times(v).elements).ArrayCloseTo([0.7, 0, 1]);
    });
});

