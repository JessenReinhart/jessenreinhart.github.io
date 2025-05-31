/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './App';
import './styles/main.css';

const root = document.getElementById('app');

if (root) {
  render(() => (
    <Router>
      <App />
    </Router>
  ), root);
}