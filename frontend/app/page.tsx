"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { ToastProvider } from "@radix-ui/react-toast";
import { Toasty } from "@/components/Toast";

const validateToken = async (url: string) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("token") }),
  }).then((res) => res.json());

const getUsers = async (url: string) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const [userData, setUserData] = useState<[]>([]);
  const router = useRouter();
  const {} = useSWR("/api/v1/auth/validate", (url) => validateToken(url), {
    onError: () => {
      router.push("/login");
    },
  });

  const { data } = useSWR("/api/v1/auth/users", (url) => getUsers(url), {
    onSuccess(data, key, config) {
      setUserData(data);
    },
  });


  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function openToast() {
    setIsToastOpen(true);
  }

  function logoutHandler(event: any): void {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <ToastProvider swipeDirection="right">
      <div className="antialiased bg-slate-200 text-slate-700 mx-2">
        <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-medium">User list</h1>
            </div>
            <button
              onClick={openModal}
              className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add User
            </button>
          </div>

          {userData?.map((item, i) => (
            <>
              <div id="tasks" className="my-5">
                <div
                  id="task"
                  className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 transition ease-linear duration-150"
                >
                  <div className="inline-flex items-center space-x-2">
                    <div>{item.username}</div>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 text-slate-500 hover:text-slate-700 hover:cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          ))}

          <button
            onClick={logoutHandler}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign out
          </button>
        </div>

        <Modal isOpen={isOpen} closeModal={closeModal} openToast={openToast} />
        <Toasty
          isOpen={isToastOpen}
          closeToast={() => {
            setIsToastOpen(false);
          }}
        />
      </div>
    </ToastProvider>
  );
}
