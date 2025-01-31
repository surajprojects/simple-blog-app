import { useEffect } from "react";

export default function Logout() {

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await fetch("http://localhost:3000/auth/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                const result = await response.json();

                if (response.ok) {
                    console.log(result.message);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error("Network error:", err);
                console.log("Failed to submit the form!");
                alert("Failed to connect to server.");
                navigate("/error");
            }

        }
        handleLogout();
    }, [])

    return (
        <>
            <h1>Logged Out!!!</h1>
        </>
    );
};