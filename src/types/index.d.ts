export type PostHit = {
    id: string,
    title: string,
    created_at: string, 
    url: string,
    author: string,
    objectID: string
}

export type PostInfo = {
    hits: PostHit[]
}