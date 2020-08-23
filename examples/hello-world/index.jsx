import * as etch from '../../dist/index';

class MyComponent {
  constructor(props, children) {
    this.props = props;
    etch.initialize(this);
  }

  render() {
    //  transpile all getter to read from $state
    return <div>{this.$state.props.greeting} World!</div>;
  }

  hello() {
    console.log("hello");
  }

  update(newProps) {
    this.hello();
    if (this.props.greeting !== newProps.greeting) {
      this.props.greeting = newProps.greeting;
    }
  }
}

const instance = new MyComponent({ greeting: "Hello" });

const app = document.getElementById("app");

// using element
app.appendChild(instance.element);

setTimeout(() => {
  instance.update({ greeting: "Hi" });
  console.log("updated");
}, 1000);
