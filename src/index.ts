import { createState } from "solid-js";

// etch.initialize
export function initialize(component) {

  const $originUpdate = component.update;

  // handle the changes in the states
  let dispose;
  const d = Object.getOwnPropertyDescriptors(component.__proto__);
  const [$state, setState] = createState(
    Object.assign(Object.create(Object.prototype, d), component)
  );

  // handle updating
  function update() {
    setState((s) => {
      $originUpdate.call(s, ...arguments);
    });
  }

  // add update and states properties
  Object.assign(component, { $state, update });

  // element property
  Object.defineProperty(component, "element", {
    get: function () {
      return component.render();
    }
  });
}
