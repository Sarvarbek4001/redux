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
export default function Register() {
  const { formData, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = {
      username: formData?.username,
      email: formData?.email,
      password: formData?.password,
    };
    try {
      const response = await AuthService.userRegister(user);
      dispatch(signUserSucess(response?.user));
    } catch (error) {
      dispatch(signUserFailure(error?.response?.data?.errors));
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="w-auto h-12 mx-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
            Please register
          </h2>
          <ValidationError />
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form className="space-y-3" onSubmit={registerHandler}>
              <Input
                label={"Username"}
                name={"username"}
                onChange={handleChange}
                value={formData?.username}
              />
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
              <div>
                <button
                  type="submit"
                  className={`${
                    isLoading
                      ? "flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-300 border border-transparent rounded-md shadow-sm hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
                      : "flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  }`}
                >
                  {isLoading ? "Loading ..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
