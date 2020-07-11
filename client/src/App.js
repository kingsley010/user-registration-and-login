import React, { Component } from 'react';
import AppNavbar from './Components/AppNavbar';
import NoteList from './Components/NoteList';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import ItemModal from './Components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <NoteList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
