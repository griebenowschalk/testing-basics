import { describe } from "vitest";
import { PostWithComment } from "../components/UserInteraction/PostWithComments";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("PostWithComment Test Suite", () => {
  describe("User Interaction", () => {
    const someUser = "John Doe";
    const someContent = "Hello World";

    beforeEach(() => {
        render(<PostWithComment content={someContent} user={someUser} />);
    });

    // Test and it() are the same
    test("User can comment on the post", async() => {
        const user = userEvent.setup(); // userEvent is a global setup for the test to action as a user
        const commentInput = screen.getByTestId("comment-input");
        const commentContent = "This is a comment";

        await user.type(commentInput, commentContent);
        expect(commentInput).toHaveValue(commentContent);
    });

    test("Comment are is cleared after submission", async() => {
        const user = userEvent.setup();
        const commentInput = screen.getByTestId("comment-input");
        const commentContent = "This is a comment";
        await user.type(commentInput, commentContent);
        
        const commentButton = screen.getByRole("button");
        await user.click(commentButton);

        expect(commentInput).toBeEmptyDOMElement();
    })

    test("Comment is added to the post", async() => {
        const user = userEvent.setup();
        const commentInput = screen.getByTestId("comment-input");
        const commentContent = "This is a comment";
        await user.type(commentInput, commentContent);

        const commentButton = screen.getByRole("button");
        await user.click(commentButton);

        const commentContainer = screen.getByTestId("post-comment-container");
        const comments = within(commentContainer).getAllByRole("paragraph");
        expect(comments).toHaveLength(1);
        expect(comments[0]).toHaveTextContent(commentContent);
    })

    test("Multiple comments are added to the post", async() => {
        const commentsToAdd = ["This is a comment", "This is another comment", "This is a third comment"];
        const user = userEvent.setup();
        const commentInput = screen.getByTestId("comment-input");

        for (const comment of commentsToAdd) {
            await user.type(commentInput, comment);
            await user.click(screen.getByRole("button"));
        }

        const commentContainer = screen.getByTestId("post-comment-container");
        const comments = within(commentContainer).getAllByRole("paragraph");
        expect(comments).toHaveLength(commentsToAdd.length);
        commentsToAdd.forEach((comment, index) => {
            expect(comments[index]).toHaveTextContent(comment);
        });
    })
  });
});
