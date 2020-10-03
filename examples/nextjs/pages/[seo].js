import { DershopUrl } from "@corejam/plugin-dershop/react"
import { getServerContext } from "@corejam/base/dist/Server";

export async function getStaticPaths() {
  const serverContext = await getServerContext({})

  const paths = [];

  (await serverContext.models.getSEOIndex()).map((url) => {
    paths.push({ params: { seo: url } })
  })

  return {
    paths: paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const serverContext = await getServerContext({})
  const seoObject = await serverContext.models.objectFromURL(params.seo);
  Object.keys(seoObject).forEach(key => seoObject[key] === undefined ? delete seoObject[key] : {});

  return {
    props: {
      seo: params.seo,
      seoObject: seoObject
    }
  }
}

const Url = ({seo, seoObject}) => {
  return <DershopUrl param={JSON.stringify({url: seo})} object={JSON.stringify(seoObject)} />
};

export default Url;
