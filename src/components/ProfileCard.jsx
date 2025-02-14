import React from "react";

function ProfileCard({ profile }) {
  return (
    <div className=" bg-gray-100 flex items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="absolute bottom-0 right-0 w-4 h-4border-2 border-white rounded-full"></div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">
                {profile.first_name || "First"} {profile.last_name || "Last"}
              </h2>
              <h2 className="text-l  text-gray-800">
                {profile.email || "Last"}
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mt-2">
                {profile.role || "Role"}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
