import type { SEO } from "../../../typings/Seo";
import type { CanvasPage } from "../../../typings/Canvas";
import type { Config } from "../../../typings/Config";
import type { Image } from "../../../typings/Image";

import { commerce, lorem, random, date, internet } from "faker";

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

export function generateConfig({
  seo = generateSeo(),
  general = {
    admin_email: internet.email(),
  },
} = {}): Config {
  return {
    seo: seo,
    general: general,
    layout: {
      header: {
        name: "/",
        date: 1589462638372,
        items: [
          {
            tag: "dershop-header",
            properties: [
              {
                name: "main-links",
                value: '[{"title":"Home","href":"/"}, {"title":"Categories","href":"/products"}]',
              },
              {
                name: "cart-link",
                value: "/cart",
              },
            ],
          },
        ],
      },
      footer: {
        name: "/",
        date: 1589462666691,
        items: [
          {
            tag: "dershop-footer",
          },
        ],
      },
    },
  };
}

export function generateCanvasPage({
  seo = generateSeo(),
  canvas = {},
  dateCreated = date.past(2).toISOString(),
  dateUpdated = date.past(1).toISOString(),
}): CanvasPage {
  return {
    seo: seo,
    canvas: canvas,
    dateCreated: dateCreated,
    dateUpdated: dateUpdated,
  };
}
