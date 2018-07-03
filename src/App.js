import React, { Component, Fragment, unstable_Profiler as Profiler } from 'react';
import PropTypes from 'prop-types';
import { Map as ImmutableMap } from 'immutable';
import { ChromeDark, ChromeDefault } from './frontend/Themes/Themes';
import ProfilerTab from './plugins/Profiler/views/ProfilerTab';

const theme = ChromeDefault;

let renderCount = 0;
let actualDurationTotal = 0;
const onRender = (id, phase, actualDuration) => {
  renderCount++;
  actualDurationTotal += actualDuration;
  //console.log('onRender() renders:', renderCount, 'average:', actualDurationTotal / renderCount, 'current:', actualDuration);
};

class App extends Component {
  static childContextTypes = {
    theme: PropTypes.object.isRequired,
  };

  getChildContext() {
    return { theme };
  }

  render() {
    return (
      <Profiler id="App" onRender={onRender}>
        <div style={{
          backgroundColor: theme.base00,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <ProfilerTab theme={theme} />
        </div>
      </Profiler>
    );
  }
}

export default App;
