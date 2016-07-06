import xs from 'xstream';
import isolate from '@cycle/isolate';
import State from '../States/states.tsx';
import ComponentRouter, {createRedirect} from '../../components/ComponentRouter.tsx';

const routes = {
  '/': createRedirect("/state"),
  '/state': State
}

function Main(sources) {
  const page = ComponentRouter({router: sources.router, DOM:  sources.DOM, routes: routes});
  const sinks = {
    DOM: page.DOM,
    router: page.router
  }
  return sinks;
}

export default sources => isolate(Main)(sources)
