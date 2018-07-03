import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { List, Map as ImmutableMap } from 'immutable';
import {store} from './frontend/decorate';

fetch('/data.json')
  .then(response => response.json())
  .then(snapshots => {
    const roots = new Set();

    // Convert to Immutable JS to mimic React DevTools
    snapshots.forEach(snapshot => {
      snapshot.nodes = new ImmutableMap(snapshot.nodes).map(node => ImmutableMap(node))
      roots.add(snapshot.root);
    });

    // Save in fake store
    store.roots = new List(Array.from(roots.values()));
    store.selectedRoot = store.roots.get(0);
    store.snapshots = snapshots;

    ReactDOM.render(<App snapshots={snapshots} />, document.getElementById('root'));

    registerServiceWorker();
  });