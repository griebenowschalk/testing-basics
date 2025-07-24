import { Post } from "../components/Doubles/Mocks/Post";
import { act, render, screen, within } from "@testing-library/react";
import * as DataService from "../components/Doubles/Mocks/DataService";

describe("Post test suite with mocks", () => {
  vi.mock("../components/Doubles/Mocks/DataService", () => ({
    getCommentsForPost: () => {
      console.log("getCommentsForPost");
      return [
        {
          content: "New comment",
        },
        {
          content: "Another comment",
        },
      ];
    },
  }));

  it("should load comments", async () => {
    // Needs act cause the assertions are made after the component is rendered
    await act(async () => {
      render(<Post content="Hello, world!" user="John Doe" id="1" />);
    });

    const commentContainer = screen.getByTestId("post-comment-container");
    expect(commentContainer).toBeInTheDocument();
    const comments = within(commentContainer).getAllByRole("paragraph");
    expect(comments).toHaveLength(2);
    expect(comments[0]).toHaveTextContent("New comment");
    expect(comments[1]).toHaveTextContent("Another comment");
  });
});

describe("Post test suite with mocks and spies", () => {
  it("should load comments", async () => {
    // Spy on the function and mock the return value
    const getCommentsForPostSpy = vi.spyOn(DataService, "getCommentsForPost");
    getCommentsForPostSpy.mockResolvedValueOnce([
      {
        content: "New comment",
      },
      {
        content: "Another comment",
      },
    ]);
    await act(async () => {
      render(<Post content="Hello, world!" user="John Doe" id="123" />);
    });

    const commentContainer = screen.getByTestId("post-comment-container");
    expect(commentContainer).toBeInTheDocument();
    const comments = within(commentContainer).getAllByRole("paragraph");
    expect(comments).toHaveLength(2);
    expect(comments[0]).toHaveTextContent("New comment");
    expect(comments[1]).toHaveTextContent("Another comment");

    expect(getCommentsForPostSpy).toHaveBeenCalledOnce();
    expect(getCommentsForPostSpy).toHaveBeenCalledWith("123");
  });
});
