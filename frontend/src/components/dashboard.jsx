import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as userService from "../services/user.service";
import messages from "../messages";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      setIsLoading(true);

      try {
        const getUserId=localStorage.getItem("userId")
        const response = await userService.getUserDetails({userId:getUserId});

        if (response?.data?.status && response.data.data) {
          setUserData(response.data.data); 
        } else {
          toast.error(response?.data?.message??messages.FAIL_TO_GET_DETAILS);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message ??messages.FAIL_TO_GET_DETAILS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3">User Information</h5>

        {isLoading ? (
          <div className="text-center">Loading user data...</div>
        ) : userData ? (
          <>
            <div className="row mb-2">
              <div className="col-sm-3 font-weight-bold">First Name:</div>
              <div className="col-sm-9">{userData.firstName}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-3 font-weight-bold">Last Name:</div>
              <div className="col-sm-9">{userData.lastName}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-3 font-weight-bold">Email:</div>
              <div className="col-sm-9">{userData.email}</div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-3 font-weight-bold">Phone:</div>
              <div className="col-sm-9">{userData.number}</div>
            </div>
          </>
        ) : (
          <div>No user data available</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
