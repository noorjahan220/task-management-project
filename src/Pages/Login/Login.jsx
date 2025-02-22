import React, { useContext } from 'react';
import swal from 'sweetalert';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const userInfo = {
                uid: result.user?.uid,
                email: result.user?.email,
                name: result.user?.displayName
            };

            const response = await fetch('https://task-management-server-two-lovat.vercel.app/users', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            });

            const data = await response.json();
            swal("Success", data.message || "Login successful!", "success");
            navigate('/');
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            swal("Error", "Cannot sign in, please try again.", "error");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to manage your tasks</p>
                </div>

                <div className="space-y-4">
                    <button 
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 py-3 px-6 
                                  border border-gray-300 rounded-xl hover:shadow-md transition-all
                                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                  active:scale-95"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.2444 19.252C9.11376 19.252 6.45934 17.1399 5.50693 14.3003H1.51648V17.3912C3.55359 21.4434 7.70278 24.0008 12.24 24.0008Z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.50253 14.3003C5.00011 12.8099 5.00011 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
                                fill="#FBBC04"
                            />
                            <path
                                d="M12.24 4.74966C13.9508 4.7232 15.6043 5.36697 16.8433 6.54867L20.2694 3.12262C18.1 1.0855 15.2207 -0.034466 12.24 0.000808666C7.70277 0.000808666 3.55359 2.55822 1.51648 6.61481L5.50252 9.70575C6.45052 6.86173 9.10935 4.74966 12.24 4.74966Z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span className="text-gray-700 font-medium">
                            Continue with Google
                        </span>
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default Login;
