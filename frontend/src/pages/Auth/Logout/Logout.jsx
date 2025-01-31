import { useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

export default function Logout() {

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await fetch(`${BASE_URL}/auth/logout`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
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