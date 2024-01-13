import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
	await page.goto(UI_URL);

	// 1)get the sign in button(and use the click() function)
	await page.getByRole("link", { name: "Sign In" }).click();

	// 2)check if Sign In heading is appearing(visible) after clicking the sign in button or not
	await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

	// 3)automatically fill the form
	// fill email
	await page.locator("[name=email]").fill("1@1.com");
	// fill the password
	await page.locator("[name=password]").fill("password123");

	// 4)click the login button
	await page.getByRole("button", { name: "Login" }).click();

	// 5) check if user has successfully sign-in
	// if user signs-in, a toast is appear and the links in header are changed and sign in button changes to sign out

	// check toast
	await expect(page.getByText("Sign in Successful")).toBeVisible();
	// check links in header
	await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
	await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
	// check sign out button
	await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
