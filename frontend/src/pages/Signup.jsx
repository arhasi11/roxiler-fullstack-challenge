import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../api/api';

/**
 * Renders the user registration page.
 * Features a responsive layout, comprehensive form validation with inline error messages,
 * and clear user feedback for the registration process.
 */
export default function Signup() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const toastId = toast.loading('Creating your account...');
        try {
            await API.post('/auth/signup', data);
            toast.success('Registration successful! Please log in.', { id: toastId });
            navigate('/login');
        } catch (err) {
            // Tries to find the specific validation message from the backend,
            // otherwise falls back to a generic message.
            const errorMsg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(errorMsg, { id: toastId });
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50">
             {/* Left side: Branding */}
            <div className="hidden md:flex w-1/2 bg-indigo-600 text-white items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Join Roxiler</h1>
                    <p className="text-lg text-indigo-100">
                        Create an account to rate stores, manage data, and more 🌟
                    </p>
                </div>
            </div>

            {/* Right side: Signup Form */}
            <div className="flex flex-1 items-center justify-center p-4">
                <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Create an Account
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <input placeholder="Full Name (20-60 chars)" {...register('name', { required: 'Name is required.' })} className="w-full p-3 border rounded-md" />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                            <input placeholder="Email" {...register('email', { required: 'Email is required.' })} className="w-full p-3 border rounded-md" />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <input placeholder="Address (optional, max 400 chars)" {...register('address')} className="w-full p-3 border rounded-md" />
                        </div>
                        <div>
                            <input type="password" placeholder="Password" {...register('password', { required: 'Password is required.' })} className="w-full p-3 border rounded-md" />
                            <p className="text-xs text-gray-500 mt-1 px-1">8-16 chars, 1 uppercase, 1 special character.</p>
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 disabled:bg-indigo-300 transition">
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>
                    <p className="mt-6 text-sm text-gray-600 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}