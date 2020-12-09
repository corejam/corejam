import { CanvasPage, CanvasPageDB, CanvasPeer } from "../../shared/types/Canvas";
import { generateSeo } from "@corejam/base/src/resolvers/db/faker/Generator";
import { testClient } from "@corejam/base/src/TestClient";
import { PluginResolver } from "../../shared/types/PluginResolver"

describe("CanvasPages", () => {
  //Init some singletons in beforeAll()
  let testID, client, models: PluginResolver;

  const testValues = {
    seo: generateSeo(),
    canvas: {
      name: "/",
      date: 1588764707637,
      items: [
        {
          tag: "dershop-ui-box",
          properties: [
            {
              name: "p",
              value: "12",
            },
          ],
          items: [
            {
              tag: "dershop-ui-box",
              properties: [
                {
                  name: "p",
                  value: "12",
                },
              ],
            },
            {
              tag: "dershop-ui-box",
              properties: [
                {
                  name: "mt",
                  value: "12",
                },
                {
                  name: "p",
                  value: "12",
                },
              ],
            },
          ],
        },
      ],
    },
  } as CanvasPage;

  //Bootstrap
  beforeAll(async () => {
    client = await testClient();
    models = client.models;

    const insertedResponse = (await models.canvasPageCreate(testValues)) as CanvasPageDB;
    expect(insertedResponse).toMatchObject(testValues);
    testID = insertedResponse.id;
    //testUrl = insertedResponse.seo?.url;
  });

  it("getCanvasPageById", async () => {
    //Test that we can retrieve the same values back
    const returnedCanvasPageById = await models.canvasPageById(testID);
    expect(returnedCanvasPageById).toEqual(expect.objectContaining(testValues));
  });

  it("getCanvasPageByUrl", async () => {
    //Test that we can retrieve the same values back
    const returnedCanvasPageById = await models.canvasPageByUrl(testValues.seo?.url as string);
    expect(returnedCanvasPageById).toEqual(expect.objectContaining(testValues));
  });

  it("allCanvasPages", async () => {
    const returnedPagination: CanvasPageDB[] = await models.allCanvasPages();

    expect(returnedPagination.length).toBeGreaterThan(0);
    returnedPagination.map((item) => {
      if (item.id === testID) {
        expect(item).toEqual(expect.objectContaining(testValues));
      }
    });
  });

  it("updateCanvasPage", async () => {
    const newValues = {
      seo: testValues.seo,
      canvas: {
        name: "blabla",
        date: 1588764727637,
        items: [],
      },
    } as CanvasPageDB;

    const editResult = await models.canvasPageEdit(testID, newValues);

    expect(editResult).toEqual(expect.objectContaining(newValues));
  });

  it("canvasPeers", async () => {
    const initiator = {
      hash: "1223",
      offer: { type: "offer", bla: true },
    } as CanvasPeer;

    const openCanvasPeersResult = await models.canvasOpenPeers(testID, initiator);

    expect(openCanvasPeersResult.peers).toEqual(
      expect.objectContaining([initiator]) //Returns an array
    );

    //Poll
    const canvasPollPeersResult = await models.canvasPollPeers(testID);
    expect(canvasPollPeersResult).toEqual(openCanvasPeersResult);

    //Clear
    const canvasClosePeersResult = await models.canvasClosePeers(testID);
    expect(canvasClosePeersResult.peers).toEqual(undefined);
  });
});
