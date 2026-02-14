import { useState } from "react";
import * as userService from '../services/user.service';
import { toast } from "react-toastify";
import messages from '../messages.js';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleReset = () => {
        setFormData({
            email: "",
            password: "",
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email) ? "" : "Please enter a valid email";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);

        const emailError = validateEmail(formData.email);
        if (emailError) {
            toast.error(emailError);
            setIsLoading(false);
            return;
        }

        try {
            const response = await userService.login(formData);

            if (response?.data?.status) {
                const token = response?.data?.data?.token;
                const userId = response?.data?.data.userId;
                if (!token) {
                    toast.error(messages.FAIL_TO_LOGIN);
                    return;
                }
                toast.success(messages.USER_LOGIN_SUCCESSFULLY);
                localStorage.setItem("token", token);
                localStorage.setItem('userId', userId);

                navigate("/dashboard", { replace: true });
            } else {
                toast.error(response?.data?.message || messages.FAIL_TO_LOGIN);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || messages.FAIL_TO_LOGIN);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Login</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-between mt-3 gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-grow-1"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Logging in...
                                            </>
                                        ) : (
                                            "Login"
                                        )}
                                    </button>

                                    <button
                                        type="reset"
                                        onClick={handleReset}
                                        className="btn btn-outline-secondary flex-grow-1"
                                        disabled={isLoading}
                                    >
                                        Reset
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-success flex-grow-1"
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
