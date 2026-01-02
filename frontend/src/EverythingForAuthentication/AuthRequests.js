const URLS = {
    login: "http://localhost:3100/auth/login",
    register: "http://localhost:3100/auth/register",
    delete: "http://localhost:3100/auth/delete",
    logout: "http://localhost:3100/auth/logout",
};

export async function auth(username, password, isLogin) {
    let base;
    if (isLogin) {
        base = URLS.login;
    } else {
        base = URLS.register;
    }

    try {
        const response = await fetch(base, {
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