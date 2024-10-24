import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../src/routes/routes";

// Mock the useAwpData hook
vi.mock("../useAwpData", () => ({
  default: () => ({
    data: {
      // Mock some AWP data structure that matches what your component expects
      industrialGrade: [
        {
          image: "test-image-url",
          rarity: { name: "Industrial Grade" },
        },
      ],
    },
    error: null,
    loading: false,
  }),
}));

describe("QuickBuy Component", () => {
  it("increases cart amount on click", async () => {
    const user = userEvent.setup();

    // Use your existing routes configuration
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"], // Start at the home route where QuickBuy is rendered
    });

    render(<RouterProvider router={router} />);

    // Wait for the component to load and render
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addToCartButton);

    // The cart count should be updated in the Navbar
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});

describe("Store navbar link", () => {
  it("correctly switches from home page to store page", async () => {
    const user = userEvent.setup();

    // Use your existing routes configuration
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"], // Start at the home route where QuickBuy is rendered
    });

    render(<RouterProvider router={router} />);

    const storePageLink = screen.getByRole("link", { name: /store/i });

    await user.click(storePageLink);

    expect(screen.getByRole("button", { name: /mil-spec/i })).toBeInTheDocument;
  });
  it("correctly switches from store page to home page", async () => {
    const user = userEvent.setup();

    // Use your existing routes configuration
    const router = createMemoryRouter(routes, {
      initialEntries: ["/store"], // Start at the home route where QuickBuy is rendered
    });

    render(<RouterProvider router={router} />);

    const homePageLink = screen.getByRole("link", { name: /home/i });

    await user.click(homePageLink);

    expect(screen.getByRole("heading", { name: /quick buy/i }))
      .toBeInTheDocument;
  });
});

describe("Home page main element", () => {
  it("switches color when toggled"),
    async () => {
      const user = userEvent.setup();

      // Use your existing routes configuration
      const router = createMemoryRouter(routes, {
        initialEntries: ["/"], // Start at the home route where QuickBuy is rendered
      });

      render(<RouterProvider router={router} />);

      const mainElement = screen.getByRole("main");
      const mainElementStyles = window.getComputedStyle(mainElement);
      const themeToggleButton = screen.getByRole("button", {
        name: /toggle theme/i,
      });

      expect(mainElementStyles.backgroundColor).toBe("rgb(243, 246, 244)");

      await user.click(themeToggleButton);

      expect(mainElementStyles.backgroundColor).toBe("rgb(9, 12, 10)");
    };
});
