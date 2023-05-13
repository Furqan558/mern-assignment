import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import Component from "./Component";
import fetchMock from "jest-fetch-mock";

global.fetch = fetchMock;

// Mock the fetch function to return a sample response
global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () =>
			Promise.resolve([
				{ id: 1, name: "John Doe", email: "john@example.com" },
				{ id: 2, name: "Jane Smith", email: "jane@example.com" },
			]),
	})
);

describe("Component", () => {
	it("renders the component with fetched data", async () => {
		const { getByText } = render(<Component />);

		await waitFor(() => {
			expect(fetch).toHaveBeenCalledTimes(1);
		});

		// expect(screen.getByText("Component")).toBeInTheDocument();
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("john@example.com")).toBeInTheDocument();
		expect(screen.getByText("Jane Smith")).toBeInTheDocument();
	});
});
