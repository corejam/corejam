import { DershopProductList } from "@corejam/plugin-dershop/react"
import { CorejamServer } from "@corejam/base/dist/Server";
import { paginateProductsGQL } from "@corejam/plugin-dershop/dist/shared/graphql/Queries/Product";

const Products = ({ list }) => {
  return <DershopProductList default={true} list={JSON.stringify(list)} />;
};

/**
 * TODO get paginated static paths for this to render through pages. 
 */
export async function getStaticProps() {
  const request = await (await CorejamServer()).executeOperation({
    query: paginateProductsGQL,
    variables: { page: 1, size: 24 }
  })

  return {
    props: {
      list: request.data.paginateProducts
    }
  }
}

export default Products;
