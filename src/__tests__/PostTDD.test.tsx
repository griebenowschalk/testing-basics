import { act, render, within, screen } from "@testing-library/react";
import { PostTDD } from "../components/TestDrivenDevelopment/PostTDD";
import * as DataServiceTDD from "../components/TestDrivenDevelopment/DataServiceTDD";
import userEvent from "@testing-library/user-event";

describe("Post test suite with mocks and spies", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should load comments", async () => {
    // Spy on the function and mock the return value
    const getCommentsForPostSpy = vi.spyOn(
      DataServiceTDD,
      "getCommentsForPost"
    );

    const now = new Date().getTime();
    const someComments = [
      {
        content: "New comment",
        date: now,
      },
      {
        content: "Another comment",
        date: now + 2000,
      },
    ];

    getCommentsForPostSpy.mockResolvedValueOnce(someComments);
    await act(async () => {
      render(<PostTDD content="Hello, world!" user="John Doe" id="123" />);
    });

    const commentContainer = screen.getByTestId("post-comment-container");
    expect(commentContainer).toBeInTheDocument();
    const comments = within(commentContainer).getAllByRole("paragraph");

    expect(comments).toHaveLength(2);
    expect(comments[0]).toHaveTextContent("Another comment");
    expect(comments[1]).toHaveTextContent("New comment");

    expect(getCommentsForPostSpy).toHaveBeenCalledOnce();
    expect(getCommentsForPostSpy).toHaveBeenCalledWith("123");
  });

  it("should invoke postComment when the comment is submitted", async () => {
    const postCommentSpy = vi.spyOn(DataServiceTDD, "postComment");
    const time = new Date("2025-07-24T12:00:00Z");
    vi.setSystemTime(time);
    await act(async () => {
      render(<PostTDD content="Hello, world!" user="John Doe" id="123" />);
    });

    const user = userEvent.setup();
    const commentInput = screen.getByTestId("comment-input");
    const commentContent = "This is a comment";
    await user.type(commentInput, commentContent);

    const commentButton = screen.getByRole("button");
    await user.click(commentButton);

    expect(postCommentSpy).toHaveBeenCalledOnce();
    expect(postCommentSpy).toHaveBeenCalledWith(
      "123",
      commentContent,
      time.getTime()
    );
  });
});
