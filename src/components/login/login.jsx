import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Input } from "../../ui";
import { useForm } from "../../hooks/useForm/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  signUserStart,
  signUserSucess,
  signUserFailure,
} from "../../slice/auth";
import AuthService from "../../service/auth";
import { ValidationError } from "../";
export default function Login() {
  const { formData, handleChange } = useForm({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = {
      email: formData?.email,
      password: formData?.password,
    };
    try {
      const response = await AuthService.userLogin(user);
      dispatch(signUserSucess(response?.user));
    } catch (error) {
      dispatch(signUserFailure(error?.response?.data?.errors));
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="w-auto h-12 mx-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
              Please login
            </h2>
            <ValidationError />
          </div>
          <form className="mt-8 " onSubmit={handleSubmit}>
            <div className="space-y-3 rounded-md shadow-sm ">
              <Input
                label={"Email address"}
                name={"email"}
                type="email"
                onChange={handleChange}
                value={formData?.email}
              />
              <Input
                label={"Password"}
                name={"password"}
                type="password"
                onChange={handleChange}
                value={formData?.password}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  isLoading
                    ? "relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-200 border border-transparent rounded-md group hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2"
                    : "relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                }`}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className={`${
                      isLoading
                        ? "w-5 h-5 text-indigo-400 group-hover:text-indigo-300"
                        : "w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                    }`}
                    aria-hidden="true"
                  />
                </span>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
