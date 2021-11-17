import { PostInfo } from "../types";

const baseUrl = "https://hn.algolia.com/api/v1";

export const getPosts = async (pageNumber: number) => {
  const result = await fetch(
    `${baseUrl}/search_by_date?tags=story&page=${pageNumber}`
  );

  if (!result.ok) {
    console.log("Error while hitting API", result);
    return [];
  }
  const post: PostInfo = await result.json();
  const hits = post.hits.map(hit => {
      return {
          ...hit,
          id: hit.objectID
      }
  })
  return hits;
};
