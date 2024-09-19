import React from "react";
import {Layout} from "./style";
import {A1SceneModel} from "./A1SceneModel";

type A1ComponentProps = {
    model?: A1SceneModel,
    children?: React.ReactNode;
};
export function A1Component(props: A1ComponentProps) {
    return (
        <div>
            <Layout>
                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col-2"}>
                            <img id={"ReferenceRaceCar"} src={"./images/svg/carObjectSpace.svg"}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        {props.children}
                    </div>
                </div>
            </Layout>
        </div>
    );
}
