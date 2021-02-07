import { registerDBProvider } from "@corejam/base/dist/PluginManager"
import { CorejamApplication } from "@corejam/base/dist/typings/Application"
import { FaunaProvider } from "./FaunaProvider"

const application: CorejamApplication = {
    init: () => {
        //Register the provider
        registerDBProvider("DB_FAUNA", new FaunaProvider())
    }
}

export default application