import { describe, expect, it, test } from "bun:test";
import { testClient } from "hono/testing";
import { app } from "./app";

describe("app routes", () => {
	test("GET /", async () => {
		const res = await app.request("/api");

		expect(res.status).toBe(200);
		expect(await res.text()).toBe("Hello World!");
	});

	test("GET /test", async () => {
		const res = await app.request("/api/test");

		expect(res.status).toBe(200);

		const resBody = await res.json();

		expect(resBody).toContainKey("test");
		expect(resBody).not.toContainKey("hello");
	});
});
