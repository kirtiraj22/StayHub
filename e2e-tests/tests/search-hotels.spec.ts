import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
	await page.goto(`${UI_URL}add-hotel`);
	await page.getByRole("link", { name: "Sign In" }).click();

	await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
	await page.locator("[name=email]").fill("1@1.com");
	await page.locator("[name=password]").fill("password123");

	await page.getByRole("button", { name: "Login" }).click();
	await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("Should show hotel search results", async ({ page }) => {
	await page.goto(UI_URL);

	await page.getByPlaceholder("Where are you going?").fill("Dublin");
	await page.getByRole("button", { name: "Search" }).click();

	await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
	await expect(page.getByText("Dublin Getaways")).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
	await page.goto(UI_URL);

	await page.getByPlaceholder("Where are you going?").fill("Dublin");
	await page.getByRole("button", { name: "Search" }).click();

	await page.getByText("Dublin Getaways").click();
	await expect(page).toHaveURL(/detail/);
	await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
	await page.goto(UI_URL);

	await page.getByPlaceholder("Where are you going?").fill("Dublin");

	const date = new Date();
	date.setDate(date.getDate() + 3);
	const formattedDate = date.toISOString().split("T")[0];
	await page.getByPlaceholder("Check-out Date").fill(formattedDate);

	await page.getByRole("button", { name: "Search" }).click();

	await page.getByText("Dublin Getaways").click();
	await page.getByRole("button", { name: "Book now" }).click();

	await expect(page.getByText("Total Cost: ₹3570.00")).toBeVisible();

	const stripeFrame = page.frameLocator("iframe").first();
	await stripeFrame
		.locator('[placeholder="Card number"]')
		.fill("4000003560000008");
	await stripeFrame.locator('[placeholder="MM / YY"]').fill("11/30");
	await stripeFrame.locator('[placeholder="CVC"]').fill("321");

	// won't confirm the booking as we have one more pop-up by VISA
	await expect(
		page.getByRole("button", { name: "Confirm Booking" })
	).toBeVisible();
});
