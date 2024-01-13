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

test("should allow user to register", async ({ page }) => {
	// we need to pass random(different) email every time to register so that we don't get the email already exists error
	const testEmail = `test_register_${
		Math.floor(Math.random() * 90000) + 10000
	}@test.com`;

	await page.goto(UI_URL);
	// goto signin page and click on create an account here
	await page.getByRole("link", { name: "Sign In" }).click();
	// click on create an account here link :
	await page.getByRole("link", { name: "Create an account here." }).click();
	// check if Create an Account is displayed or not
	await expect(
		page.getByRole("heading", { name: "Create an Account" })
	).toBeVisible();

	// register the user(firstname, lastname, email, password, confirm password)
	await page.locator("[name=firstName]").fill("test_firstName");
	await page.locator("[name=lastName]").fill("test_lastName");
	await page.locator("[name=email]").fill(testEmail);
	await page.locator("[name=password]").fill("password123");
	await page.locator("[name=confirmPassword]").fill("password123");

	// click on Create Account button
	await page.getByRole("button", { name: "Create Account" }).click();

	// expect to go to the home page and see the links(my hotels and my bookings) and a toast message(Registration Success!) and a sign out button
	await expect(page.getByText("Registration Success!")).toBeVisible();
	await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
	await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
	await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
