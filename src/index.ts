import { createState, createRoot, produce } from "solid-js"

type EtchSolidElement = any
interface EtchSolidComponent {
  element: EtchSolidElement
  render: () => any
  update: (...args: any[]) => void
  destroy: () => void
  __proto__: any
}

// etch.initialize
export function initialize(component: EtchSolidComponent) {
  const $originUpdate = component.update,
    $originDestroy = component.destroy

  // handle the changes in the states
  let dispose: () => void
  const d = Object.getOwnPropertyDescriptors(component.__proto__)
  const [$state, setState] = createState(Object.assign(Object.create(Object.prototype, d), component))

  // handle updating
  function update(...args: any[]) {
    setState(produce((s) => $originUpdate.call(s, ...args)))
  }

  // handle destroying
  function destroy() {
    $originDestroy && $originDestroy.call($state)
    dispose()
  }

  // add update, destroy, and setState to the component
  Object.assign(component, { update, destroy, setState })

  // element property
  createRoot((disposer) => {
    dispose = disposer
    component.element = component.render.call($state)
  })
}
