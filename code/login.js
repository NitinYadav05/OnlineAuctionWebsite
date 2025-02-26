document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-btn");

    if (loginForm) {
        loginForm.addEventListener("click", async (e) => {
            e.preventDefault();

            const email = document.querySelector("input[type='text']").value;
            const password = document.querySelector("input[type='password']").value;

            if (!email || !password) {
                alert("⚠️ Please enter both email and password!");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert("✅ Login Successful!");
                    localStorage.setItem("token", data.token); // Save token for authentication
                    window.location.href = "index.html"; // Redirect to dashboard
                } else {
                    alert(`❌ ${data.message}`);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("❌ Login failed. Please try again.");
            }
        });
    }
});
