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
			<h2>Problem 1</h2>
			<ol>
				<li>
					Find the Problem: Use tools like Google PageSpeed to see which parts
					of your website are slow.
				</li>
				Check Your Server: If your server is slow to respond, your website will
				be slow too. You can check things like server logs and CPU usage to find
				any issues.
				<li>
					Optimize Database: If your website uses a database, make sure it's
					running efficiently. Slow database queries can make your website slow.
				</li>
				Check Network: Sometimes, it's not your website but the network that's
				slow. Try your website on different networks to see if it's still slow.
				<li>
					Optimize Images and Files: Large images and files can make your
					website slow. Make them smaller without losing quality to help speed
					up your site.
				</li>
				Use Caching: Caching can help your website load faster for people who
				visit your website more than once.
				<li>
					Code Splitting: In React.js, you can divide your code into smaller
					parts which can then be loaded as needed. This can help to improve the
					speed of your website.
				</li>
				Eliminate Blocking Resources: Some resources, like JavaScript and CSS,
				can slow down your website if they're loaded at the wrong time. Make
				sure these load at the right time to avoid slowing down your site.
				<li>
					Use of Service Workers: These can help your site load faster on repeat
					visits, even when offline.
				</li>
				Check Again: After making changes, check your website's speed again to
				see if it's improved.
			</ol>
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
