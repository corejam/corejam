import { MergedServerContext } from "../../shared/types/PluginResolver"

export default {
    Mutation: {
        userRegister: async (_obj: any, { data }, { models }: MergedServerContext) => {
            return models.userRegister(data)
        }
    }
}