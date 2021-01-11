import { updateDates } from "@corejam/base";
import type { Config } from "@corejam/base/dist/typings/Config";
import type { Image } from "@corejam/base/dist/typings/Image";
import type { Deliverability } from "@corejam/base/dist/typings/Utils";
import { generateUser as rootGenerateUser } from "@corejam/plugin-auth/dist/server/resolvers/db/faker/Generator";
import { address, commerce, company, date, finance, internet, lorem, name, random } from "faker";
import type { Address } from "../../../../shared/types/Address";
import type { Category } from "../../../../shared/types/Category";
import type { Manufacturer } from "../../../../shared/types/Manufacturer";
import { Order, OrderItem } from "../../../../shared/types/Order";
import type { Price } from "../../../../shared/types/Price";
import type { Product, ProductDB } from "../../../../shared/types/Product";
import type { SEO } from "../../../../shared/types/Seo";
import { User, UserDB } from "../../../../shared/types/User";

const placeholderImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=60",
  "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&q=60",
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&q=60",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=60",
  "https://images.unsplash.com/photo-1578021046026-483fa99ffad2?w=300&q=60",
  "https://images.unsplash.com/photo-1490633874781-1c63cc424610?w=300&q=60",
];

export function generateSeo({
  url = lorem.slug(3),
  metaTitle = commerce.department(),
  metaDescription = lorem.sentence(),
  keywords = lorem.words(3).split(" "),
} = {}): SEO {
  return {
    url: url,
    metaTitle: metaTitle,
    metaDescription: metaDescription,
    keywords: keywords,
  };
}

export function generatePrice({
  gross = Number.parseFloat(finance.amount(15, 100, 2)),
  net = Number.parseFloat(finance.amount(15, 100, 2)),
  tax_rate = random.number({ max: 21, min: 12 }),
  purchase_price_gross = Number.parseFloat(finance.amount(5, 10, 2)),
} = {}): Price {
  return {
    gross: gross,
    net: net,
    tax_rate: tax_rate,
    purchase_price_gross: purchase_price_gross,
  };
}

export function generateImage({
  src = placeholderImages[random.number(placeholderImages.length - 1)],
  mimetype = "image/jpeg",
  dateCreated = date.past(2).toISOString(),
  dateUpdated = date.past(1).toISOString(),
} = {}): Image {
  return {
    src: src,
    mimetype: mimetype,
    dateCreated: dateCreated,
    dateUpdated: dateUpdated,
  };
}

export function generateCategory({
  active = true,
  name = commerce.department(),
  description = lorem.paragraph(),
  dateCreated = date.past(2).toISOString(),
  dateUpdated = date.past(1).toISOString(),
} = {}): Category {
  return {
    active: active,
    name: name,
    description: description,
    seo: generateSeo(),
    dateCreated: dateCreated,
    dateUpdated: dateUpdated,
  };
}

export function generateManufacturer({
  name = company.companyName(),
  description = lorem.paragraph(),
  website = internet.url(),
  seo = generateSeo(),
} = {}): Manufacturer {
  return {
    name: name,
    description: description,
    seo: seo,
    website: website,
    ...updateDates(),
  };
}

export function generateAddress({
  city = address.city(),
  street = address.streetName(),
  street_2 = address.streetName(),
  zipCode = address.zipCode(),
  state = address.state(),
  country = address.country(),
} = {}): Address {
  return {
    city: city,
    street: street,
    street_2: street_2,
    zipCode: zipCode,
    state: state,
    country: country,
  };
}

export function generateDeliverability({
  stock = random.number({ max: 100, min: 0 }),
  clearance_sale = false,
  delivery_time = random.number({ min: 1, max: 5 }).toString(),
  restock_time_days = random.number({ min: 1, max: 3 }),
  free_shipping = false,
} = {}): Deliverability {
  return {
    stock: stock,
    clearance_sale: clearance_sale,
    delivery_time: delivery_time,
    restock_time_days: restock_time_days,
    free_shipping: free_shipping,
  };
}

export function generateConfig({
  seo = generateSeo(),
  general = {
    admin_email: internet.email(),
  },
} = {}): Config {
  return {
    seo: seo,
    general: general,
  };
}

export function generateProduct({
  active = true,
  promoted = false,
  ean = finance.mask(13),
  manufacturer_number = finance.mask(5),
  sku = lorem.slug(3),
  name = commerce.productName(),
  images = [generateImage(), generateImage(), generateImage(), generateImage()] as Image[],
  description = lorem.paragraph(),
  price = generatePrice(),
  seo = generateSeo(),
  deliverability = generateDeliverability(),
  dateCreated = date.past(2).toISOString(),
  dateUpdated = date.past(1).toISOString(),
} = {}): Product {
  return {
    active: active,
    promoted: promoted,
    ean: ean,
    manufacturer_number: manufacturer_number,
    sku: sku,
    name: name,
    images: images,
    description: description,
    price: price,
    seo: seo,
    deliverability: deliverability,
    dateCreated: dateCreated,
    dateUpdated: dateUpdated,
  };
}

export function generateUser(): User {
  return {
    ...rootGenerateUser(),
    firstName: name.firstName(),
    lastName: name.lastName(),
    addressBilling: generateAddress(),
    addressShipping: generateAddress()
  }
}

/**
 * Generate order items based on products passed in
 * @param products 
 */
export function generateOrderItems(products: ProductDB[]): OrderItem[] {
  const items = [] as OrderItem[];

  for (let index = 0; index < random.number(5); index++) {
    const product = products[Math.floor(Math.random() * products.length)] as ProductDB;
    const qty = random.number(5);

    const gross = Number.parseFloat(finance.amount(15, 100, 2));

    const price = {
      gross: gross * qty,
      net: (gross - 5) * qty,
      tax_rate: random.number({ max: 21, min: 12 }),
    } as Price;

    items.push({
      product: {
        id: product.id,
        name: product.name
      },
      quantity: qty,
      price: price,
    });
  }
  return items;
}

/**
 * Generate orders based on products / users combination
 * @param products 
 * @param users 
 */
export function generateOrder(products: ProductDB[], users: UserDB[]): Order {
  const orderItems = generateOrderItems(products)

  let price = {
    gross: 0.0,
    net: 0.0,
    tax_rate: 4,
  } as Price

  orderItems.map((item) => {
    price = {
      gross: price.gross + item.price.gross,
      net: price.net + item.price.net,
      tax_rate: 4,
    } as Price
  })


  const user = users[Math.floor(Math.random() * users.length)] as UserDB

  return {
    user: user,
    status: 'RECEIVED',
    items: orderItems,
    price: price,
    ...updateDates(),
    addressBilling: generateAddress(),
    addressShipping: generateAddress(),
  }
}