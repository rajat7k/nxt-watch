import React from 'react';
import ReactDOM from 'react-dom';
import {I18nextProvider} from 'react-i18next'
import i18n from './i18n/i18n';
import App from './App';
import { Provider } from 'mobx-react';
import rootStore from './store';

ReactDOM.render(
  <React.StrictMode>
  <I18nextProvider i18n={i18n}>
       <Provider rootStore = {rootStore}>
        <App/>
       </Provider>
    </I18nextProvider>
</React.StrictMode>,
  document.getElementById('root')
);