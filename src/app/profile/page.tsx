"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Logout Failed", error.message);
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get('/api/users/me')
    console.log(response.data);
    setData(response.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <br />
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing Here"
        ) : (
            <Link href={`/profile/${data}`}>{ data}</Link>
        )}
      </h2>
      <hr />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
};

export default ProfilePage;
