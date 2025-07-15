import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const UserPlaceholder = ({ setUserData, userData }) => {
  const { id } = useParams();
  const location = useLocation().pathname;
  const [localUser, setLocalUser] = useState(userData);
  const [loading, setLoading] = useState(!userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await axios.get(
          `https://twitter-api-xgoy.onrender.com/api/users/find/${id}`
        );
        setUserData && setUserData(userProfile.data);
        setLocalUser(userProfile.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    if (!userData) fetchData();
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center space-x-3 bg-blue-50 rounded-xl px-4 py-2 shadow-sm">
        <Skeleton circle height={40} width={40} />
        <div className="min-w-0">
          <Skeleton height={18} width={80} className="mb-1" />
          <Skeleton height={14} width={60} />
        </div>
      </div>
    );
  }

  if (!localUser) return null;

  return (
    <div className="flex items-center space-x-3 bg-blue-50 rounded-xl px-4 py-2 shadow-sm">
      <img
        src={localUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(localUser.name || localUser.username || "U")}`}
        alt="avatar"
        className="w-10 h-10 rounded-full border border-blue-100 shadow-sm"
      />
      <div className="min-w-0">
        <div className="font-semibold text-gray-900 truncate">{localUser.name || localUser.username}</div>
        <div className="text-xs text-gray-500 truncate">@{localUser.username}</div>
      </div>
    </div>
  );
};

export default UserPlaceholder;
