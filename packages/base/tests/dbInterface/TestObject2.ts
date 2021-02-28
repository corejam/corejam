import { Coredata } from "../../src/db/ModelDecorator";
import { CoreModel } from "../../src/db/CoreModel";

export default class TestObject2 extends CoreModel {

    collection = "otherObjects";

    @Coredata()
    otherAttribute = true;
}