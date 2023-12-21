import { useNavigate } from "react-router-dom";
import Button from "../../components/html/Button";
import Input from "../../components/html/Input";
import useAxiosPublic from "../../hooks/axios/useAxiosPublic";
import usePostPublic from "../../hooks/apiPublic/usePostPublic";
import useAuth from "../../hooks/auth/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const Signup = () => {
  const { signUpMethod, signInMethod, loading: authLoading, user } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const { mutateAsync: addUser } = usePostPublic(null, "/user");

  useEffect(() => {
    setLoading(true);
    console.log(user?.email);
    if (user?.email) {
      addUser({ email: user?.email, name: user?.displayName })
        .then((res) => {
          console.log(res.data);
          navigate("/");
          setLoading(false);
          toast.success("You have successfully signed up!");
        })
        .catch((err) => {
          setLoading(false);
          navigate("/");
          console.error(err);
          setErrorMsg(err.message);
        });
    }
  }, [user, user?.email]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    if (password.length < 6) {
      setErrorMsg("Password Length Must Be More Then 6 Characters!!");
      return;
    }

    if (/^[^A-Z]*$/.test(password)) {
      setErrorMsg("Password must contain atleast one capital letter");
      return;
    }

    if (/^[a-zA-Z0-9\s]*$/.test(password)) {
      setErrorMsg("Password must contain a special character");
      return;
    }
    setLoading(true);

    e.target.email.value = "";
    e.target.password.value = "";
    e.target.name.value = "";

    signUpMethod(email, password)
      .then((res) => {
        setErrorMsg("");
        updateProfile(res.user, {
          displayName: name,
          photoURL: photo,
        });
        addUser({ email, name })
          .then((res) => {
            console.log(res.data);
            navigate("/");
            setLoading(false);
            toast.success("You have successfully signed up!");
          })
          .catch((err) => {
            setLoading(false);
            // navigate("/");
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

  return (
    <div className="bg-login h-screen min-h-[500px]  mx-auto flex justify-center  items-center text-white">
      <div className="w-[80%] sm:w-[70%] md:w-[50%] lg:w-[30%] mx-auto my-[2.5%]  flex flex-col justify-center items-center h-auto  backdrop-blur-md p-4 rounded-lg">
        <h1 className="text-2xl font-clashBold md:text-3xl">Welcome back!</h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-2 mt-6 w-full"
        >
          <Input
            name="name"
            required
            placeholder="User Name"
            className="py-2 bg-transparent border border-white rounded-sm text-sm md:text-base"
          />
          <Input
            name="photo"
            required
            placeholder="Photo URL"
            className="py-2 bg-transparent border border-white rounded-sm text-sm md:text-base"
          />
          <Input
            name="email"
            required
            placeholder="Email"
            className="py-2 bg-transparent border border-white rounded-sm text-sm md:text-base"
          />
          <Input
            name="password"
            required
            placeholder="Password"
            type="password"
            className="py-2 bg-transparent border border-white rounded-sm text-sm md:text-base"
          />
          <button className="bg-black text-white py-2 mt-10">Join</button>
          <div className="flex justify-between gap-4">
            <Button
              onClick={handleDemo}
              type="button"
              className="flex-1 bg-green-500 py-2 mt-3 text-sm text-white md:text-base"
            >
              Demo User
            </Button>
          </div>
        </form>
        <div className="mt-4 divider">or</div>
        <p className="text-[12px] md:text-sm mb-8">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="ml-2 font-bold underline duration-300 cursor-pointer active:scale-90"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
