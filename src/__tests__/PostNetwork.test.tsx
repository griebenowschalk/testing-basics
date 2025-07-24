import { Post } from "../components/Doubles/Mocks/PostNetwork";
import axios from "axios";
import { render, screen, act, within } from "@testing-library/react";
import type { Comment } from "../components/Doubles/Mocks/Model";
// import { setupServer } from "msw/node";
// import { http, HttpResponse } from "msw";

const userName = "John Doe";
const someContent = "Hello, world!";
const postId = "1";
const mockComments: Comment[] = [
  {
    content: "New comment",
  },
  {
    content: "Another comment",
  },
];

describe("Post test suite with network mocks", () => {
  it("should load received comments", async () => {
    const axiosSpy = vi.spyOn(axios, "get");
    axiosSpy.mockResolvedValue({ data: mockComments });

    await act(async () => {
      render(<Post content={someContent} user={userName} id={postId} />);
    });

    const commentContainer = screen.getByTestId("post-comment-container");
    expect(commentContainer).toBeInTheDocument();
    const comments = within(commentContainer).getAllByRole("paragraph");
    expect(comments).toHaveLength(2);
    expect(comments[0]).toHaveTextContent(mockComments[0].content);
    expect(comments[1]).toHaveTextContent(mockComments[1].content);
  });

  it("should call service to load comments", async () => {
    const axiosSpy = vi.spyOn(axios, "get");
    axiosSpy.mockResolvedValue({ data: mockComments });

    await act(async () => {
      render(<Post content={someContent} user={userName} id={postId} />);
    });

    expect(axiosSpy).toHaveBeenCalledOnce();
    expect(axiosSpy).toHaveBeenCalledWith("http://localhost:4000/comments/1", {
      params: { id: postId },
    });

    const axiosGetSpyArgs = axiosSpy.mock.calls;
    const axiosGetSpyArgsUrl = axiosGetSpyArgs[0][0];
    expect(axiosGetSpyArgsUrl.endsWith(postId)).toBe(true);
    const axiosGetSpyArgsParams = axiosGetSpyArgs[0][1];
    expect(axiosGetSpyArgsParams?.params?.id).toBe(postId);
  });

  it("should show error message when service fails", async () => {
    const axiosSpy = vi.spyOn(axios, "get");
    axiosSpy.mockRejectedValue(new Error("Service failed"));

    await act(async () => {
      render(<Post content={someContent} user={userName} id={postId} />);
    });

    const errorLabel = screen.getByTestId("error-label");
    expect(errorLabel).toBeInTheDocument();
    expect(errorLabel).toHaveTextContent("Error while getting comments!");
  });
});

// describe("Post test suite with msw", () => {
//   const server = setupServer(
//     http.get("http://localhost:4000/comments/:id", ({ request, params }) => {
//       console.log('MSW intercepted:', request.url);
//       console.log('MSW params:', params);
//       return HttpResponse.json(mockComments);
//     })
//   );

//   // Hooks to start and stop the server
//   beforeAll(() => {
//     server.listen({ onUnhandledRequest: 'warn' });
//     // Reset axios adapter to ensure MSW can intercept
//     delete axios.defaults.adapter;
//   });
//   afterEach(() => server.resetHandlers());
//   afterAll(() => server.close());

//   it("should load received comments with msw", async () => {
//     console.log(server);
//     await act(async () => {
//       render(<Post content={someContent} user={userName} id={postId} />);
//     });

//     const commentContainer = screen.getByTestId("post-comment-container");
//     expect(commentContainer).toBeInTheDocument();
//     console.log(commentContainer);
//     const comments = within(commentContainer).getAllByRole("paragraph");
//     expect(comments).toHaveLength(2);
//     expect(comments[0]).toHaveTextContent(mockComments[0].content);
//     expect(comments[1]).toHaveTextContent(mockComments[1].content);
//   });
// });
