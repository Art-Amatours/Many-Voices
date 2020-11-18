import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { configureStore } from './store';
import ArtworkScreen from './screens/Artwork/ArtworkScreen';
import CreateNewArtworkScreen from './screens/CreateNewArtwork/CreateNewArtworkScreen';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ArtworkScreen} />
          <Route exact path="/new" component={CreateNewArtworkScreen} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
