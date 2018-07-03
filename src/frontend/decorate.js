import React from 'react';
import {List} from 'immutable';

export const store = {
  cachedData: {},
  cacheDataForSnapshot: (snapshotIndex, snapshotRootID, key, data) => {
    store.cachedData[`${snapshotIndex}-${snapshotRootID}-${key}`] = data;
  },
  clearSnapshots: () => {
    store.snapshots = [];
  },
  getCachedDataForSnapshot: (snapshotIndex, snapshotRootID, key) => {
    return store.cachedData[`${snapshotIndex}-${snapshotRootID}-${key}`] || null;
  },
  isRecording: false,
  roots: new List(),
  setIsRecording: isRecording => {
    store.isRecording = isRecording;
  },
  snapshots: [],
  storeSnapshot: snapshot => {
    store.snapshots.push(snapshot);
  }
};

export default function(options, Component) {
  return (props) => {
    const reducedProps = options.props(store, props);
    return <Component {...reducedProps} {...props} />;
  }
}