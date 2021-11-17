import { getPosts } from "../postsApi"
import postMockResponse from "./__mocks__/postApi.json"
import fetchMock from 'fetch-mock'


describe("Post API", () => {
    beforeEach(() => {
        fetchMock.restore();
    }) 
    it("should fetch post details by page number", async () => {
        // Given
        const pageNumber = 1;
        fetchMock.get("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1", postMockResponse)

        // When
        const posts = await getPosts(pageNumber);

        // Then
        expect(posts).not.toBeNull();
        expect(posts).toStrictEqual(postMockResponse.hits);
        
    })

    it("should return null for post details in case of error (not 2xx)", async () => {
        // Given
        const pageNumber = 1;
        fetchMock.get("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1",  {status: 404})

        // When
        const posts = await getPosts(pageNumber);

        // Then
        expect(posts).toStrictEqual([]);
    })

})