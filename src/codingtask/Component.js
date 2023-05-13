import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

// Define the Higher Order Component (HOC)
const withLoadingIndicator = (WrappedComponent) => {
	// The HOC returns a new component
	return ({ ...props }) => {
		// Initialize the loading and data states
		const [isLoading, setIsLoading] = useState(true);
		const [data, setData] = useState(null);

		// Use the useEffect hook to fetch data when the component mounts
		useEffect(() => {
			// Fetch data from the API
			fetch("https://my.api.mockaroo.com/users.json?key=5818fd50")
				.then((response) => response.json()) // Parse the JSON from the response
				.then((data) => {
					// Once data is fetched, update the data state and set loading to false
					setData(data);
					setIsLoading(false);
				})
				.catch((error) => {
					// Log any errors to the console and set loading to false
					console.error("Error:", error);
					setIsLoading(false);
				});
		}, []); // Empty dependency array means this effect runs once on mount

		// If the component is still loading, show a loading indicator
		// Otherwise, show the wrapped component with the fetched data
		return isLoading ? (
			<div>Loading...</div>
		) : (
			<WrappedComponent data={data} {...props} />
		);
	};
};

// This is the component that will be wrapped by the HOC
const Component = ({ data }) => {
	return (
		<div>
			<h2>Component</h2>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th style={{ width: "10%", textAlign: "center" }}>ID</th>
						<th style={{ width: "45%", textAlign: "center" }}>Name</th>
						<th style={{ width: "45%", textAlign: "center" }}>Email</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((user) => (
						<tr key={user.id}>
							<td style={{ textAlign: "center" }}>{user.id}</td>
							<td style={{ textAlign: "center" }}>{user.name}</td>
							<td style={{ textAlign: "center" }}>{user.email}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

// Export the component wrapped by the HOC
export default withLoadingIndicator(Component);
