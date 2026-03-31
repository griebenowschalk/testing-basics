import { render, screen } from "@testing-library/react";
import { routesConfig } from "../components/Router/RoutesConfig";
import { createMemoryRouter, RouterProvider } from "react-router";
import { AppWithRoutes } from "../components/Router/AppWithRoutes";

vi.mock("../components/Router/Routes/Home", () => ({
  Home: () => <div data-testid="HomeMock" />,
}));

vi.mock("../components/Router/Routes/About", () => ({
  About: () => <div data-testid="AboutMock" />,
}));

vi.mock("../components/Router/Routes/Posts", () => ({
  Posts: () => <div data-testid="PostsMock" />,
}));

vi.mock("../components/Router/Routes/PageNotFound", () => ({
  PageNotFound: () => <div data-testid="PageNotFoundMock" />,
}));

vi.mock("../components/Router/Routes/Post", () => ({
  Post: () => <div data-testid="PostMock" />,
}));

describe("RoutesConfig test suite", () => {
  it("should load home page", () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("HomeMock")).toBeInTheDocument();
  });

  it("should load about page", () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/about"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("AboutMock")).toBeInTheDocument();
  });

  it("should load posts page", () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/posts"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("PostsMock")).toBeInTheDocument();
  });

  it("should load post page", () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/post/1"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("PostMock")).toBeInTheDocument();
  });

  it("should load page not found", () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/not-found"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId("PageNotFoundMock")).toBeInTheDocument();
  });

  describe("Navbar navigation tests", () => {
    it("show home page when clicking on home link", async () => {
      render(<AppWithRoutes />);

      const homeButton = screen.getByText("Home");
      expect(homeButton).toHaveAttribute("href", "/");
    });

    it("show about page when clicking on about link", async () => {
      render(<AppWithRoutes />);

      const aboutButton = screen.getByText("About");
      expect(aboutButton).toHaveAttribute("href", "/about");
    });

    it("show posts page when clicking on posts link", async () => {
      render(<AppWithRoutes />);

      const postsButton = screen.getByText("Posts");
      expect(postsButton).toHaveAttribute("href", "/posts");
    });
  });
});
