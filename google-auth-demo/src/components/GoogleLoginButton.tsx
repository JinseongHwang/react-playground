import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleLoginButton = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res);
                    }}
                    onError={() => {
                        console.error('Login Failed');
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton