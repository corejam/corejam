import { DershopUrl } from "@corejam/plugin-dershop/react"
import { getServerContext } from "@corejam/base/dist/Server";

/**
 * Get all currently available urls from 
 * our SEO index and pass them to our DershopUrl component for rendering.
 */
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
  return {
    props: {
      seo: params.seo,
    }
  }
}

const Url = ({seo }) => {
  return <DershopUrl param={JSON.stringify({url: seo})} />
};

export default Url;
