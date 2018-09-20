import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store'
import ToastManager from './ToastManager';

ReactDOM.render(
  <ReduxProvider store={store}>
    <ToastManager />
  </ReduxProvider>,
  document.getElementById('root') as HTMLElement
)