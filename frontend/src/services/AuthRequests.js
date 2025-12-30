const base = "http://localhost:3100/auth";

export async function login(username, password) {
    try {
        const response = await fetch(`${base}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        return { ok: response.ok, data };
    } catch (error) {
        console.error("Login error:", error);
        return { ok: false, data: { message: "Something went wrong" } };
    }
}

export async function register(username, password) {
    try {
        const response = await fetch(`${base}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        return { ok: response.ok, data };
    } catch (error) {
        console.error("Registration error:", error);
        return { ok: false, data: { message: "Something went wrong" } };
    }
}