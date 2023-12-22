import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../axios/useAxiosPublic";

const usePatchPublic = (queryKeys) => {
  // console.log("hit usePutPublic");
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();

  const { mutateAsync } = useMutation({
    mutationFn: async (endpoint, data) => {
      console.log("hit add user");
      const res = await axiosPublic.patch(endpoint, data);
      return res?.data;
    },
    onSuccess: () => {
      if (queryKeys) {
        queryKeys?.forEach((queryKey) => {
          queryClient.invalidateQueries(queryKey);
        });
      }
    },
  });

  return { mutateAsync };
};

export default usePatchPublic;
