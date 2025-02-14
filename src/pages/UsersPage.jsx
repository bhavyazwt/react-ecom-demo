import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ProfileCard from "../components/ProfileCard";
import { useSpin } from "../providers/SpinnerProvider";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const { setLoading } = useSpin();
  useEffect(() => {
    async function getAllUsers() {
      setLoading(true);
      const response = await axiosInstance.get("/users");
      setUsers(response.data);
      setLoading(false);
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
