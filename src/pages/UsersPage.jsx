import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ProfileCard from "../components/ProfileCard";

function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getAllUsers() {
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
    }
    getAllUsers();
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="px-5 py-24 mx-auto">
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-5">
            Users
          </h1>
          <div className="flex flex-wrap gap-5">
            {users.map((user) => {
              return <ProfileCard profile={user} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default UsersPage;
