import { CoreData } from "../../src/db/ModelDecorator";
import { CoreModel } from "../../src/db/CoreModel";

export default class TestObject extends CoreModel {

    collection = "objects";

    @CoreData()
    public dataAttribute1 = "attribute1"

    @CoreData()
    public dataAttribute2 = "attribute2"

    //Test that this does not show up in data fields 
    public localAttribute = "local"
}