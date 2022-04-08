import React from 'react';
import ReactDOM from 'react-dom';
import './rest.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import Service from './services';
import store from './redux/store';
import ErrorBoundry from './components/errorBoundry';
import ServiceContext from './serviceContext';

const service: any = new Service();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <ServiceContext.Provider value={service}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ServiceContext.Provider>
      </ErrorBoundry>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
