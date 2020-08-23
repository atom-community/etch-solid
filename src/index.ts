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
  Object.assign(component, { $state, update });

  // element property
  Object.defineProperty(component, "element", {
    get: function () {
      return component.render();
    }
  });
}
