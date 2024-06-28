import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Show from "./pages/Show";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/people/:id" element={<Show />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
};

export default App;
