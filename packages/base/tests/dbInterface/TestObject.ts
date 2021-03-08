import { Coredata, Corejam } from "../../src/db/ModelDecorator";
import { CoreModel } from "../../src/db/CoreModel";

export default class TestObject extends CoreModel {

    collection = "objects";

    @Corejam()
    public dataAttribute1: string = "attribute1"

    @Coredata()
    public dataAttribute2: string = "attribute2"

    @Corejam({ unique: true })
    public uniqueAttribute: string = "unique-value"

    @Coredata()
    public intAttribute?: number;

    //Test that this does not show up in data fields 
    public localAttribute = "local"
}