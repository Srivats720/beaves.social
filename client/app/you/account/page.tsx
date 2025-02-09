'use client';

import Image from "next/image";
import { useRouter, useSearchParams, redirect } from 'next/navigation';
import { FormEvent } from 'react';
import DropdownOptions from "@/app/components/AccountDropdownOptions";
import Logo from "@/public/logo.png";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') + "@oregonstate.edu";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(data);
    dataObject.email = email;
    
    const response = await fetch('http://127.0.0.1:5000/api/create_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
    });

    const json = await response.json();

    localStorage.setItem("email", json.email);
    localStorage.setItem("id", json.id);
    localStorage.setItem("name", json.name);
    localStorage.setItem("username", json.username);
    localStorage.setItem("major", json.major);
    localStorage.setItem("minor", json.minor);
    localStorage.setItem("residence_hall", json.residence_hall);
    localStorage.setItem("year", json.year);

    router.push(`/you/chats/inbox`);
  }

  return (
    <>
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
                Create your account
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
                  Create your account
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
