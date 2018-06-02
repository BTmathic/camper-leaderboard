import React from 'react';
import ReactDOM from 'react-dom';
import CamperLeaderboard from './components/CamperLeaderboard';

import 'normalize.css/normalize.css'; // reset all browser conventions
import './styles/styles.scss';

ReactDOM.render(<CamperLeaderboard />, document.getElementById('app'));