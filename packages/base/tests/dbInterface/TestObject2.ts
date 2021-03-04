import { CoreModel } from "../../src/db/CoreModel";
import { Coredata } from "../../src/db/ModelDecorator";
import TestObject from "./TestObject";

export default class TestObject2 extends CoreModel {

    collection = "otherObjects";

    @Coredata()
    otherAttribute: Boolean = true;

    @Coredata()
    optionalAttribute?: TestObject;
}