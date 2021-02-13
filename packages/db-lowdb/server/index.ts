import { registerDBProvider } from "@corejam/base/dist/PluginManager"
import { CorejamApplication } from "@corejam/base/dist/typings/Application"
import { LowdbProvider } from "./LowdbProvider"

const application: CorejamApplication = {
    init: () => {
        //Register the provider
        registerDBProvider("DB_LOWDB", new LowdbProvider())
    }
}

export default application