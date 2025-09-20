import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../api/api';
import { saveAuthToken } from '../utils/auth';

/**
 * Renders the user login page.
 * Features a responsive, split-screen layout, form validation,
 * and provides clear user feedback via toast notifications.
 */
export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const toastId = toast.loading('Logging in...');
    try {
      const res = await API.post('/auth/login', data);
      
      // 1. Save the token to local storage
      saveAuthToken(res.data.token);
      
      toast.success('Login successful!', { id: toastId });

      // 2. Redirect the user based on their role
      const userRole = res.data.user.role;
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'owner') {
        navigate('/owner');
      } else {
        navigate('/stores');
      }

    } catch (err) {
      // 3. Show a user-friendly error toast
      toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side: Branding */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 text-white items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg text-indigo-100">
            Log in to manage stores, users, and ratings with ease 🚀
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                placeholder="Email"
                {...register("email", { required: "Email is required." })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required." })}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition disabled:bg-indigo-300"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}