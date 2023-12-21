import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/html/Button";
import Input from "../../components/html/Input";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/axios/useAxiosPublic";
import usePostPublic from "../../hooks/apiPublic/usePostPublic";
import useAuth from "../../hooks/auth/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const Login = () => {
  const navigate = useNavigate();

  const {
    user,
    signInMethod,
    googleSignInMethod,
    loading: authLoading,
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { state } = useLocation();

  const { mutateAsync: addUser } = usePostPublic(null, "/user");

  // const { mutateAsync: addUser } = useMutation({
  //   mutationFn: async (data) => {
  //     const res = await axiosPublic.post("/user", data);
  //     return res?.data;
  //   },
  // });

  const handleDemo = () => {
    const email = import.meta.env.VITE_DEMO_EMAIL;
    const password = import.meta.env.VITE_DEMO_PASS;
    signInMethod(email, password)
      .then((res) => {
        setErrorMsg("");
        setLoading(false);
        navigate("/");
        // handleCheckRoleAndNavigate(res.user.email);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.message);
        console.log(err.message);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    e.target.email.value = "";
    e.target.password.value = "";

    signInMethod(email, password)
      .then((res) => {
        setErrorMsg("");
        setLoading(false);
        navigate("/");
        // handleCheckRoleAndNavigate(res.user.email);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.message);
        console.log(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    setLoading(true);

    googleSignInMethod()
      .then((res) => {
        setErrorMsg("");
        const { email, displayName } = res.user;
        addUser({ email, name: displayName })
          .then((res) => {
            console.log(res.data);
            navigate("/");
            setLoading(false);
            toast.success("You have successfully Logged in!");
          })
          .catch((err) => {
            setLoading(false);
            navigate("/");
            console.error(err);
            setErrorMsg(err.message);
          });
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err.message);
        console.log(err);
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-login h-screen min-h-[500px]  mx-auto flex justify-center  items-center text-white">
      <div className="w-[80%] sm:w-[70%] md:w-[50%] lg:w-[30%] mx-auto my-[2.5%]  flex flex-col justify-center items-center h-auto  backdrop-blur-md p-4 rounded-lg">
        <h1 className="text-2xl font-clashBold md:text-3xl">Welcome back!</h1>
        <form
          // onSubmit={handleSignIn}
          className="flex flex-col gap-2 mt-6 w-full"
        >
          <Input
            name="email"
            placeholder="Email"
            className="py-2 bg-transparent border border-white rounded- text-sm md:text-base"
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            className="py-2 bg-transparent border border-white rounded- text-sm md:text-base"
          />
          <button className="bg-black text-white py-2 mt-10">Connect</button>
          <div className="flex justify-between gap-4">
            <Button
              // onClick={handleDemo}
              type="button"
              className="flex-1 bg-green-500 py-2 mt-3 text-sm text-white md:text-base"
            >
              Demo User
            </Button>
          </div>
        </form>
        <div className="mt-4 divider">or</div>
        <p className="text-[12px] md:text-sm mb-8">
          Don't have an account?
          <span
            onClick={() => navigate("/signup")}
            className="ml-2 font-bold underline duration-300 cursor-pointer active:scale-90"
          >
            Sign Up
          </span>
        </p>
        <div
          // onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full gap-2 py-2 text-sm duration-300 border cursor-pointer active:scale-95 md:text-base"
        >
          <FcGoogle />
          <p>Continue Wih Google</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
