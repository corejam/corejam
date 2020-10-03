import { DershopProductList } from "@corejam/plugin-dershop/react"
import { CorejamServer } from "@corejam/base/dist/Server";
import { paginateProductsGQL } from "@corejam/plugin-dershop/dist/shared/graphql/Queries/Product";

const Products = ({ list }) => {
  return <DershopProductList default={true} list={JSON.stringify(list)} />;
};

export async function getStaticProps({ params }) {
  const request = await (await CorejamServer()).executeOperation({
    query: paginateProductsGQL,
    variables: { page: 1, size: 24 }
  })

  console.log(request)

  return {
    props: {
      list: request.data.paginateProducts
    }
  }
}

export default Products;
