import React from 'react';
import { hot } from 'react-hot-loader/root';
import 'normalize.css';

/**
 * Components
 */
import Home from './views/Home';

const App = () => <div><Home /></div>;

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (<div><Home /></div>);
//   }
// }

export default hot(App);
