import { ApolloProvider } from '@apollo/client';
import { graphqlClient } from './utils/api'
import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PhonebookBox from "./components/PhonebookBox";
import AddBox from "./components/AddBox";

//const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends Component {
  render() {
    return (
      <ApolloProvider client={graphqlClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PhonebookBox />} />
            <Route path="/add" element={<AddBox />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;