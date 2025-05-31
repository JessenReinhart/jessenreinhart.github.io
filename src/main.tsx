/* @refresh reload */
import { render } from 'solid-js/web';
import { HashRouter } from '@solidjs/router';
import App from './App';
import './styles/main.css';

const root = document.getElementById('root');

if (root) {
  render(() => (
    <HashRouter>
      <App />
    </HashRouter>
  ), root);
}