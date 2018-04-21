import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import '../node_modules/iosselect/src/iosSelect.css'
import '../node_modules/react-image-crop/dist/ReactCrop.css'
import './libs/keact/css/normalize.css'
import './libs/keact/css/flex.css'
import './libs/keact/css/common.css'


import store, { history } from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
			<App />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
