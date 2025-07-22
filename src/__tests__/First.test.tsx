import { First } from "../components/First";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("First", () => {
  it("should render", () => {
    const screen = render(<First />);
    expect(screen).toBeTruthy();

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
