

export const adminAllProductsGQL = `
  query {
    allProducts {
      items {
        id
        name
        images {
          src
        }
        sku
        price {
          net
          gross
          tax_rate
        }
        deliverability {
          stock
        }
        seo {
          url
        }
      }
      page_last
      page_current
      items_total
    }
  }
`;

export const adminProductByIdGQL = `
  query($id: String!) {
    productById(id: $id) {
      id
      name
      ean
      sku
      description
      active
      promoted
      manufacturer_number
      seo {
        url
        metaTitle
        metaDescription
        keywords
      }
      price {
        net
        gross
        tax_rate
      }
      deliverability {
        stock
        clearance_sale
        delivery_time
        restock_time_days
        max_order_qty
        min_order_qty
      }
      images {
        src
      }
    }
  }
`;
