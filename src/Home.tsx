import React, { useEffect, useState } from "react";
import {
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { PostHit } from "./types";
import { getPosts } from "./api/postsApi";

const Home = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [posts, setPosts] = useState<PostHit[]>([]);

  const [selectedPost, setSelectedPost] = useState<any>(null);

  useEffect(() => {
    getPosts(pageNumber).then((response) => setPosts([...posts, ...response]));
  }, [pageNumber]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPageNumber((pageNumber) => pageNumber + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);


  const closeHandle = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <Container
        style={{
          height: "100vh",
        }}
        data-testid="main"
      >
        <h1 data-testid="heading">Table</h1>
        <div>
          <DataGrid
            rows={posts}
            autoHeight={true}
            columns={[
              {
                field: "title",
                headerName: "Title",
                width: 400,
              },
              {
                field: "url",
                headerName: "Url",
                width: 400,
              },
              {
                field: "created_at",
                headerName: "Created At",
                width: 200,
              },
              {
                field: "author",
                headerName: "Author",
                width: 200,
              },
            ]}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onRowClick={(params) => setSelectedPost(params.row)}
          />
        </div>
      </Container>
      <Dialog onClose={closeHandle} open={selectedPost !== null}>
        <DialogContent>
          <Typography>{JSON.stringify(selectedPost)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeHandle}
            variant="contained"
            style={{ backgroundColor: "#FF0000", color: "#fff" }}
            data-testid="submit"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
