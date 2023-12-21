import React from "react";

import useGetPublic from "../apiPublic/useGetPublic";
import useAuth from "../auth/useAuth";

const useUser = () => {
  const { user } = useAuth();
  // console.log(user?.email);
  const { data: userData } = useGetPublic(
    ["User", user?.email],
    `/user/${user?.email}`
  );

  return userData;
};

export default useUser;
