import { DershopUrl } from "@corejam/plugin-dershop/react"
//import { GraphQLClient, } from "@corejam/base"

const Url = ({ seo }) => {
  return <DershopUrl param={JSON.stringify({url: seo})} />
};

/*
export async function getStaticPaths() {
  const paths = [];

  const request = await new GraphQLClient().request('query {getSEOIndex}')
  request.getSEOIndex.map((url) => {
    paths.push({ params: { url } })
  })

  return {
    paths: paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  return {

    props: {
      url: params.url
    }
  }
}*/


Url.getInitialProps = async function ({ query }) {
  return query
};

export default Url;
