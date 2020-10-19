import { getServerContext } from "@corejam/base/dist/Server";
import { generateManufacturer, generateCategory, generateProduct, generateOrder, generateUser } from "../server/resolvers/db/faker/Generator";
import { CategoryDB } from "../shared/types/Category";
import { ManufacturerDB } from "../shared/types/Manufacturer";
import { OrderDB } from "../shared/types/Order";
import { MergedServerContext } from "../shared/types/PluginResolver";
import { ProductDB } from "../shared/types/Product";
import { UserDB } from "../shared/types/User";

declare type fakerData = {
    products: Array<ProductDB>,
    users: Array<UserDB>,
    manufacturers: Array<ManufacturerDB>,
    categories: Array<CategoryDB>,
    orders: Array<OrderDB>,
}

/**
 * Static faker generator 
 */
export default async () => {

    const { models } = await getServerContext({ req: { headers: {} }, res: {} }) as MergedServerContext

    const data: fakerData = {
        products: [],
        users: [],
        manufacturers: [],
        categories: [],
        orders: []
    }

    for (let i = 0; i <= 5; i++) {
        const manufacturer = await models.manufacturerCreate(generateManufacturer())
        data.manufacturers.push(manufacturer);
    }

    for (let i = 0; i < 2; i++) {
        const category = await models.categoryCreate(generateCategory());
        data.categories.push(category);
    }

    for (let i = 0; i <= 20; i++) {
        const product = await models.productCreate(generateProduct()).catch((e) => console.log(e)) as ProductDB;
        const manufacturer = data.manufacturers[Math.floor(Math.random() * data.manufacturers.length)];
        const category = data.categories[Math.floor(Math.random() * data.categories.length)];

        data.products.push(product)

        await models.productLinkManufacturer(product.id, manufacturer.id)
        await models.productLinkCategory(product.id, category.id)
    }

    for (let i = 0; i <= 5; i++) {
        const user = await models.userCreate(generateUser()) as UserDB
        data.users.push(user);
    }
    for (let i = 0; i <= 5; i++) {
        const order = generateOrder(data.products, data.users);
        const createdOrder = await models.orderCreate(order, order.user) as OrderDB
        data.orders.push(createdOrder);
    }

    data.users.push(await models.userRegister({
        firstName: "Test",
        lastName: "Account",
        email: "test@test.com",
        password: "valid123Password@",
        passwordConfirm: "valid123Password@",
    }))

    return data
}