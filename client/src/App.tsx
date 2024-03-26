import React from "react";
import { client } from "./graphql.link";
import { gql } from "@apollo/client";

const GET_BY_ID_QUERY = gql`
  query getById($id: Int!) {
    getById(id: $id)
  }
`;

function App() {
  const handleClick = async () => {
    try {
      const { data } = await client.query({
        query: GET_BY_ID_QUERY,
        variables: { id: 111 },
        context: {
          contextTest: "ContextTest",
          extensions: {
            credentials: {
              securityHash: "a1b2c3d4",
            },
          },
        },
      });

      console.log(data);
    } catch (error) {
      console.error("Error occurred while running the query:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button style={{ height: "30px", width: "120px" }} onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

export default App;
