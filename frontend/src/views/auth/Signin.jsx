/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient'; // Adjust the path as per your project structure

export default function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const onSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axiosClient.post('/signin', payload);
      console.log('Signin successful:', response.data);
      alert('Signin successful!');
      navigate('/admindashboard'); // Navigate to admin dashboard on success
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setError('Invalid credentials. Please try again.');
      } else {
        console.error('Signin error:', error);
        alert('Signin failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-bold text-black dark:text-white">
          E-HOSPITAL
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>

              <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                {error && (
                  <div className="alert text-red-600">
                    <p>{error}</p>
                  </div>
                )}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={emailRef}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    ref={passwordRef}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-[#830823] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{' '}
                  <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Create one here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
