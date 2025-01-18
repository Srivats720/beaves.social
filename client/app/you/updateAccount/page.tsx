'use client';

import Image from "next/image";
import { useRouter, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormEvent } from 'react';
import DropdownOptions from "@/app/components/AccountDropdownOptions";
import Logo from "@/public/logo.png";

export default function Home() {
  const router = useRouter();
  const [id, setUserId] = useState<string | null>(null);
  const [emailPrefix, setEmailPrefix] = useState<string | null>(null);
  const email = emailPrefix ? `${emailPrefix}@oregonstate.edu` : ""; // Only set email if emailPrefix is available

  useEffect(() => {
    setUserId(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return; // Avoid making the API call if `id` is not available
      const userResponse = await fetch(`http://127.0.0.1:5000/api/get_user_by_id?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await userResponse.json();
      if (userData?.email) {
        setEmailPrefix(userData.email.split('@oregonstate.edu')[0]);
      }
    };
    fetchUserData();
  }, [id]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(data);
    dataObject.email = email;
    dataObject.id = id ?? ""; // Set to empty string if id is null

    const response = await fetch('http://127.0.0.1:5000/api/update_user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
    });

    const json = await response.json();

    localStorage.setItem("email", json.email);
    localStorage.setItem("name", json.name);
    localStorage.setItem("username", json.username);
    localStorage.setItem("major", json.major);
    localStorage.setItem("minor", json.minor);
    localStorage.setItem("residence_hall", json.residence_hall);
    localStorage.setItem("year", json.year);

    if (response.ok) {
      console.log('Account successfully updated');
      router.push(`/you/chats/home`);
    } else {
      console.error('Failed to update account');
    }
  }

  return (
    <>
      <div className="relative">
        <div className="absolute top-2 left-2 flex gap-4">
          <button
            className="transition rounded-full bg-orange-600 hover:bg-black text-white hover:text-orange-600 ease-in-out duration-300 p-2"
            onClick={() => redirect("/you/home")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={20}
              width={20}
              viewBox="0 0 576 512"
              className="fill-current"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </button>
        </div>
      </div>
      <section className="bg-gray-100 dark:bg-black min-h-screen flex items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-md">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-orange-500"
          >
            <Image
              className="inline-block align-middle rounded-lg w-12 h-12 mr-2"
              src={Logo}
              alt="placeholder"
              width={300}
              height={300}
            />
            beavs.social
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border dark:border-orange-600 dark:bg-black">
            <div className="p-6 space-y-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-orange-500">
                Update your account
              </h1>
              <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Eg. John Doe"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-black dark:border-orange-500 dark:text-orange-300"
                    defaultValue={email}
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Eg. John Doe"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-black dark:border-orange-500 dark:text-orange-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter a username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-black dark:border-orange-500 dark:text-orange-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="year"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Year
                  </label>
                  <DropdownOptions.YearDropdownOptions />
                </div>
                <div>
                  <label
                    htmlFor="major"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Major
                  </label>
                  <DropdownOptions.MajorDropdownOptions />
                </div>
                <div>
                  <label
                    htmlFor="minor"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Minor (if any)
                  </label>
                  <DropdownOptions.MinorDropdownOptions />
                </div>
                <div>
                  <label
                    htmlFor="hall"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-orange-400"
                  >
                    Residence Hall (if any)
                  </label>
                  <DropdownOptions.ResidenceHallDropdownOptions />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-orange-500 dark:bg-black dark:border-orange-500 dark:focus:ring-orange-400"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-orange-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-orange-500 hover:underline"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-orange-800"
                >
                  Update your account
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
