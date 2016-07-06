import isolate from '@cycle/isolate';
import xs, {Stream} from 'xstream';
import {DOMSource} from '@cycle/dom';

interface ComponentRouterSources {
  routes: any
  router: any
  DOM: DOMSource
}

const callComponent = function(sources: ComponentRouterSources) {
  return ({path, value}) =>
    value(Object.assign({}, sources, {router: sources.router.path(path)}));
}

function propOrNever(key: string, x: Object) {
  if (x.hasOwnProperty(key)){
    return x[key];
  }
  return xs.never();
}

function flattenByKey(key: string, stream: Stream<any>) {
    return stream.map(x => propOrNever(key, x)).flatten();
}

function ComponentRouter (sources: ComponentRouterSources) {
  const component$ = sources.router.define(sources.routes)
    .map(route => callComponent(sources)(route));
  const pluck = key => flattenByKey(key, component$);
  const sinks = {
    pluck: pluck,
    DOM: pluck('DOM'),
    router: pluck('router')
  }
  return sinks;
}

export function createRedirect (path) {
  const redirect = (sources) => {
    const vTree = xs.of(<div>Redirecting...</div>);
    const redirect$ = xs.of(sources.router.createHref(path));
    return {
      DOM: vTree,
      router: redirect$
    }
  }
  return sources => isolate(redirect)(sources);
}

export default sources => isolate(ComponentRouter)(sources);
