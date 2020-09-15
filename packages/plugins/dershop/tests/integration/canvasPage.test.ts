import { CoreResolver } from "@corejam/base/src";
import { CanvasPage, CanvasPageDB, CanvasPeer } from "@corejam/base/src/typings/Canvas";
import { generateSeo } from "../../server/resolvers/db/faker/Generator";
//@ts-ignore
import { testClient } from "../../src/TestClient";

describe("CanvasPages", () => {
  //Init some singletons in beforeAll()
  let testID, client, models: CoreResolver;

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
    (models = models), ({ models } = client);

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
