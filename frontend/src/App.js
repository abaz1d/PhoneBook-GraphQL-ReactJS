import PhonebookBox from "./components/PhonebookBox";
import { Component } from "react";
//import { Provider } from 'react-redux';

//const store = createStore(rootReducer, applyMiddleware(thunk))

class App extends Component {
  render() {
    return (
      //<Provider store={store}>
        <PhonebookBox />
      //</Provider>
    );
  }
}

export default App;