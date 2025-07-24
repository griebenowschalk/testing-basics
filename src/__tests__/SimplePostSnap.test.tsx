import { SimplePostSnap } from "../components/Snapshots/SimplePostSnap";
import { render } from "@testing-library/react";

describe("SimplePostSnap snapshot test suite", () => {
  it("initial test", () => {
    //If the snapshot is not updated, the test will fail when the component is updated
    // Normally used when making a big refactor on a component
    const rendered = render(<SimplePostSnap content="Hello" user="John" />);
    expect(rendered.asFragment()).toMatchSnapshot();
  });
});
