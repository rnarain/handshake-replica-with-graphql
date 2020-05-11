import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {BrowserRouter} from 'react-router-dom';
import backendServer from './webConfig'
// apollo client setup
const client = new ApolloClient({
  uri: `${backendServer}/graphql`
});

//App Component
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
        
          <Main/>
        </div>
      </BrowserRouter>
    </ApolloProvider>

    );
  }
}
//Export the App component so that it can be used in index.js
export default App;