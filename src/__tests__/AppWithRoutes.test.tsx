import { vi } from "vitest";
import { AppWithRoutes } from "../components/Router/AppWithRoutes";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

vi.mock("../components/Router/Routes/Home", () => ({
  Home: () => <div data-testid="HomeMock" />,
}));

vi.mock("../components/Router/Routes/About", () => ({
  About: () => <div data-testid="AboutMock" />,
}));

describe("AppWithRoutes test suite", () => {
  it("should render navigation bar", () => {
    render(<AppWithRoutes />);

    const navbar = screen.getByTestId("NavBar");
    expect(navbar).toBeInTheDocument();
  });

  it("should initially render home page", () => {
    render(<AppWithRoutes />);

    const home = screen.getByTestId("HomeMock");
    expect(home).toBeInTheDocument();
  });

  it.skip("should initially render about page", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <AppWithRoutes />
      </MemoryRouter>
    );

    const about = screen.getByTestId("AboutMock");
    expect(about).toBeInTheDocument();
  });
});
