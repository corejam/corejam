import { Coredata } from "../../src/db/ModelDecorator";
import { CoreModel } from "../../src/db/CoreModel";

export default class TestObject extends CoreModel {

    collection = "objects";

    @Coredata()
    public dataAttribute1 = "attribute1"

    @Coredata()
    public dataAttribute2 = "attribute2"

    @Coredata({ unique: true })
    public uniqueAttribute = "unique-value"

    //Test that this does not show up in data fields 
    public localAttribute = "local"
}