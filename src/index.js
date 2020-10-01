import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './variables.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./redux/store";
import './assets/fonts/Lato/Lato-Regular.ttf'
// import Firebase from "./firebase";

// const initialState = {
//     user: null,
//     activities: [
//         {id: 123456, name: 'Learn redux', style: {background: '#ebebeb'}},
//         {id: 999, name: 'Read a book', style: {background: 'red'}},
//         {id: 11, name: 'Tell a secret', style: {background: 'black'}}
//     ],
//     hiddenActivityIds: [11],
//     dataLog: {
//         '2010-11-02': {
//             activities: [123456]
//         },
//         '2020-04-15': {
//             activities: [999]
//         },
//         '2020-05-18': {
//             activities: [123456]
//         },
//         '2020-05-20': {
//             activities: [123456, 999]
//         },
//         '2020-05-21': {
//             activities: [123456, 999]
//         }
//     }
// };

// const store = createStore(reducer, initialState, applyMiddleware(thunk));
// const firebase = new Firebase();

console.log('store', store.getState())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
