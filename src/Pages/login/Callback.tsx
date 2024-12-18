import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Callback = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const getAccessToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const authCode = params.get("code");
            
            if (authCode) {
                try {
                    localStorage.setItem('authCode', authCode)
                    const response = await axios.post(
                        "https://accounts.spotify.com/api/token",
                        new URLSearchParams({
                            grant_type: "authorization_code",
                            code: authCode,
                            redirect_uri: import.meta.env.VITE_REDIRECT, // Same as registered URI
                            client_id: import.meta.env.VITE_CLIENT_ID,
                            client_secret: import.meta.env.VITE_CLIENT_SECRET_ID,
                        }),
                        {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                        }
                    );

                    console.log('callback response: ', response)

                    const { access_token, refresh_token } = response?.data;

                    // Save tokens to localStorage
                    localStorage.setItem("token", access_token);
                    localStorage.setItem("refreshToken", refresh_token);

                    toast.success("Login successful!");
                    navigate("/home");
                } catch (error) {
                    console.error("Error exchanging authorization code: ", error);
                    toast.error("Login failed. Please try again.");
                }
            } else {
                toast.error("Authorization code not found!");
                // navigate("/");
            }
        };

        getAccessToken();
    }, []);

    return <div>Loading...</div>;
};

export default Callback;