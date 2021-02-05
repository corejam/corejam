# @corejam/canvas-plugin

The Visual Canvas CMS plugin allows you to create dynamic "canvas" pages inside your corejam application using the `<corejam-canvas>` element.

In short, this package gives you a static site builder that works directly inside your browser and deploys directly to a CDN (currently only supports S3, more coming soon)

It currently supports the following data connectors:

- FaunaDB
- S3 Bucket

## Getting Started

Install:

```bash
//yarn
yarn install @corejam/plugin-canvas

// npm
npm i @corejam/plugin-canvas
```

## How does it work?

When you create a new canvas page everything happens on the client side. The app is already bootstrapped and we take the `<corejam-run-router>` innerHTML and post it to your corejam API which includes the following endpoints:

```graphql
type CanvasPage implements Timestamp @cacheControl(maxAge: 300) {
  id: ID!
  canvas: String!
  seo: SEO!
  peers: CanvasPeers
  dateCreated: String!
  dateUpdated: String!
}

extend type Mutation {
  canvasPageCreate(canvasPageInput: CanvasPageInput!): CanvasPage
  canvasPageEditSEO(id: ID!, seoInput: SEOInput!): CanvasPage
  canvasPageEdit(id: ID!, canvasPage: CanvasPageInput!): CanvasPage
  canvasOpenPeers(id: ID!, peerInput: CanvasPeerInput!): CanvasPeers
  canvasPollPeers(id: ID!): CanvasPeers
  canvasClosePeers(id: ID!): CanvasPage
}

extend type Query {
  allCanvasPages: [CanvasPage]
  paginateCanvasPages(page: Int!, size: Int!): CanvasPageList
  canvasPageById(id: ID!): CanvasPage
  canvasPollPeers(id: ID!): CanvasPeers
}
```

The `CanvasPage` object contains a `canvas: String!` attribute which is the `<corejam-run-router>` outerHTML contents.

Creating a new canvas page:

```graphql
mutation createCanvas($canvasPageInput: CanvasPageInput!) {
  canvasPageCreate(canvasPageInput: $canvasPageInput) {
    id
    seo {
      url
    }
    canvas
  }
}
```

## Canvas Peers

\*\* This is work in progress

The canvas has the ability to open a peer to peer connection with another user for realtime collaboriation.

TODO more
