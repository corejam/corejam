

export const productEditCoreGQL = `
  mutation ProductEditCore($id: String!, $productInput: ProductCoreInput!) {
    productEdit(id: $id, productInput: $productInput) {
      id
      name
      sku
      ean
      manufacturer_number
      description
      active
      promoted
    }
    cacheFlush
  }
`;

export const productEditPriceGQL = `
  mutation ProductEditPrice($id: String!, $priceInput: PriceInput!) {
    productEditPrice(id: $id, priceInput: $priceInput) {
      price {
        tax_rate
        gross
        net
        purchase_price_gross
      }
    }
  }
`;

export const productEditSEOGQL = `
  mutation ProductEditSEO($id: String!, $seoInput: SEOInput!) {
    productEditSEO(id: $id, seoInput: $seoInput) {
      seo {
        metaDescription
        keywords
        metaTitle
        url
      }
    }
  }
`;

export const productEditDeliverabilityGQL = `
  mutation ProductEditDeliverability($id: String!, $deliveryInput: DeliverabilityInput!) {
    productEditDeliverability(id: $id, deliveryInput: $deliveryInput) {
      deliverability {
        stock
        clearance_sale
        delivery_time
        restock_time_days
        free_shipping
        min_order_qty
        max_order_qty
      }
    }
  }
`;

export const productAddGQL = `
  mutation ProductAdd($productInput: ProductCoreInput!) {
    productCreate(productInput: $productInput) {
      id
      name
      sku
      ean
      manufacturer_number
      description
      active
      promoted
    }
  }
`;

export const productAddImageGQL = `
  mutation ProductAddImage($id: String!, $imageInput: ImageInput!) {
    productAddImage(id: $id, imageInput: $imageInput) {
      images {
        src
        public_id
        alt
        dateCreated
        dateUpdated
      }
    }
  }
`;

export const productLinkManufacturer = `
  mutation ProductLinkManufacturer($id: String!, $manufacturerId: String!) {
    productLinkManufacturer(id: $id, manufacturerId: $manufacturerId) {
      result
    }
  }
`
export const productLinkCategory = `
  mutation ProductLinkCategory($id: String!, $categoryId: String!) {
    productLinkCategory(id: $id, categoryId: $categoryId) {
      result
    }
  }
`