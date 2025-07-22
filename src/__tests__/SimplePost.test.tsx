import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SimplePost } from "../components/Simple/SimplePost";

// skip or todo can be applied to the describe or it block

describe("SimplePost Test Suite", () => {
  it("should render in the document - no likes", () => {
    const props = {
      content: "Hello World",
      user: "John Doe",
    };
    render(<SimplePost {...props} />);

    //screen.debug(); can be used to see what is rendered
    const container = screen.getByTestId("post-container");
    expect(container).toBeInTheDocument();

    const user = screen.getByRole("heading", { level: 2 });
    expect(user).toBeInTheDocument();
    expect(user).toHaveTextContent("John Doe");

    const postContent = screen.getByRole("paragraph");
    expect(postContent).toBeInTheDocument();
    expect(postContent).toHaveTextContent("Hello World");

    const likesContainer = screen.queryByTestId("likes-container");
    expect(likesContainer).not.toBeInTheDocument();
  });

  it("should render in the document - with likes", () => {
    const props = {
      content: "Hello World",
      user: "John Doe",
      likesBy: ["Jane Doe", "Jim Doe"],
    };
    render(<SimplePost {...props} />);

    const container = screen.getByTestId("post-container");
    expect(container).toBeInTheDocument();

    const likesContainer = screen.getByTestId("likes-container");
    expect(likesContainer).toBeInTheDocument();

    const likes = within(likesContainer).getAllByRole("listitem");
    expect(likes).toHaveLength(2);
    props.likesBy?.forEach((like, index) => {
      expect(likes[index]).toHaveTextContent(like);
    });
  });

  it.todo("should be implemented", () => {
    expect(true).toBe(true);
  });

  it.skip("should be skipped", () => {
    expect(true).toBe(true);
  });

  describe("Nested Suite", () => {
    it("should render", () => {
      expect(true).toBe(true);
    });
  });


});