import xs from 'xstream';
import isolate from '@cycle/isolate';
import ComponentRouter, {createRedirect} from '../../components/ComponentRouter.tsx'

const routes = {
  '/': createRedirect('/substate2'),
  '/substate': Substate1,
  '/substate2': Substate2,
}

function State(sources) {
  const page = ComponentRouter({router: sources.router, DOM:  sources.DOM, routes: routes})
  const sinks = {
    DOM: page.DOM.map(page =>
      <div>
      <h1>I am the parent state</h1>
      {page}
      <a href={sources.router.createHref('/')}>State</a><br/>
      <a href={sources.router.createHref('/substate')}>Substate 1</a><br/>
      <a href={sources.router.createHref('/substate2')}>Substate 2</a><br/>
      </div>
    ),
    router: page.router
  }
  return sinks;
}

function Substate1(sources) {
  return {
    DOM: xs.of(
      <h1>Substate 1</h1>
    )
  }
}

function Substate2(sources)
{
  return {
    DOM: xs.of(
      <h1>Substate 2</h1>
    )
  }
}

export default sources => isolate(State)(sources);
