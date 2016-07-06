import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {makeRouterDriver, supportsHistory} from 'cyclic-router';
import {createHistory, createHashHistory} from 'history';
import Main from './pages/Main/main.tsx';

function main(drivers) {
  return Main(drivers);
}

const history = supportsHistory()
  ? [createHistory(), {capture: true}]
  : [createHashHistory(), {capture: false}];

run(main, {
  DOM: makeDOMDriver('#app'),
  router: makeRouterDriver(...history)
});
