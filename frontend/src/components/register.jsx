import { useState } from "react";
import * as userService from '../services/user.service';
import { toast } from "react-toastify";
import messages from '../messages.js'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        number: "",
    });

    const handleReset = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            number: "",
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const validatePassword = (password) => {
        if (password.length < 8) return messages.PASSWORD_MIN_LENGTH;
        if (!/[A-Z]/.test(password)) return messages.PASSWORD_UPPERCASE;
        if (!/[a-z]/.test(password)) return messages.PASSWORD_LOWERCASE;
        if (!/\d/.test(password)) return messages.PASSWORD_NUMBER;
        if (!/[@$!%*?&]/.test(password)) return messages.PASSWORD_SPECIAL_CHAR;
        return "";
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email) ? "" : "Please enter a valid email";
    };

    const validateNumber = (number) => {
        const numberPattern = /^\d{10}$/; 
        return numberPattern.test(number) ? "" : "Phone number must be 10 digits";
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);

        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            toast.error(passwordError);
            setIsLoading(false);
            return;
        }

        const emailError = validateEmail(formData.email);
        if (emailError) {
            toast.error(emailError);
            setIsLoading(false);
            return;
        }

        const numberError = validateNumber(formData.number);
        if (numberError) {
            toast.error(numberError);
            setIsLoading(false);
            return;
        }

        try {
            const response = await userService.register(formData);
            if (response?.data?.status) {
                const token = response?.data?.data?.token;
                const userId = response?.data?.data.userId;
                if (!token) {
                    toast.error(messages.FAIL_TO_REGISTER);
                    return;
                }
                toast.success(messages.USER_REGISTER_SUCCESSFULLY);
                localStorage.setItem("token", token);
                localStorage.setItem('userId', userId);

                navigate("/dashboard", { replace: true });
            } else {
                toast.error(response?.data?.message || messages.FAIL_TO_REGISTER);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || messages.FAIL_TO_REGISTER);
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
                            <h3 className="text-center mb-4">Register</h3>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

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

                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="number"
                                        value={formData.number}
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
                                                Register...
                                            </>
                                        ) : (
                                            "Register"
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
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
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

export default Register;
