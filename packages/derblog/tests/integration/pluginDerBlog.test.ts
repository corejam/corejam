import { BlogArticleDB } from "../../shared/types/Blog"
import { testClient } from "@corejam/base/dist/TestClient"

describe("Test DerBlog", () => {
  //This is the document ID we use to run various tests against instead of reading in every test
  let client, models;


  //Bootstrap
  beforeAll(async () => {
    client = await testClient();
    models = client.models;

    console.log(models)
  });

  it("get all blog posts", async () => {
    const returnedPagination: BlogArticleDB[] = await models.getAllBlogPosts();

    expect(returnedPagination.length).toBeGreaterThan(0);
  });

});
