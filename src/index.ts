import { createState } from "solid-js";

// etch.initialize
export function initialize(component) {
  const $originUpdate = component.update;
  const [$state, setState] = createState(component);
  function update() {
    setState((s) => {
      $originUpdate.call(s, ...arguments);
    });
  }

  // a proxy that handles getting object properties
  const handler = {
    get(target, property) {
      if (property === "update") {
        return update;
      } else if (property === "element") {
        return component.render();
      } else {
        return $state[property];
      }
    }
  };
  const proxyComponent = new Proxy(component, handler);
  return proxyComponent;
}
