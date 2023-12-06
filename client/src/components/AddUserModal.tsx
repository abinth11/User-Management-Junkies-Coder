import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
// @ts-ignore
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { IUser } from "../types/user";
import { userValidationSchema } from "../validations/user";
import UserApi from "../api/api-impl";
import { toast } from "react-toastify";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
  currentUser: IUser | null;
  setCurrentUser: (topic: IUser | null) => void;
  editUser: boolean;
  updated: boolean;
  setUpdated: (val: boolean) => void;
};

const AddUserModal: React.FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  currentUser,
  setCurrentUser,
  updated,
  setUpdated,
  editUser,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const userApi = new UserApi();
  const initialValues = {
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    title: currentUser?.title || "",
    role: currentUser?.role || "",
  };

  const handleCancel = () => {
    setCurrentUser(null);
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (
    values: IUser,
    { resetForm }: FormikHelpers<IUser>
  ) => {
    setConfirmLoading(true);
    if (editUser) {
      userApi
        .updateUser(currentUser?._id as string,values)
        .then((res) => {
          setConfirmLoading(false);
          setIsModalOpen(false);
          toast.success("successfully updated user" as string, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
          resetForm();
          setUpdated(!updated);
        })
        .catch((res) => {
          setConfirmLoading(false);
          toast.error(res.message as string, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        });
    } else {
      userApi
        .saveUser(values)
        .then((res) => {
          setConfirmLoading(false);
          setIsModalOpen(false);
          toast.success("successfully added new user" as string, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
          resetForm();
          setUpdated(!updated);
        })
        .catch((res) => {
          setConfirmLoading(false);
          toast.error(res.message as string, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        });
    }
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${
          isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className='fixed inset-0 bg-black opacity-60'></div>

        <div
          className={`bg-white py-6 rounded-xl shadow-lg w-full md:w-[50rem] relative transform transition-transform ${
            isModalOpen ? "translate-y-0" : "-translate-y-10"
          }`}
        >
          <div className='flex px-5 justify-between items-center pb-3 border-b-2 border-slate-200 mb-4'>
            <h2 className='text-lg font-semibold'>
              {editUser ? "Edit" : "Add"} User
            </h2>
            <button
              type='button'
              className='text-gray-500 hover:text-gray-700 -mt-2'
              onClick={handleCancel}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='px-5 w-full'>
            <Formik
              initialValues={initialValues}
              validationSchema={userValidationSchema}
              onSubmit={handleFormSubmit}
              enableReinitialize={true}
            >
              <Form>
                <div className='p-5 w-full '>
                  <div className='flex  w-full justify-center  space-x-14 '>
                    <div className='w-full '>
                      <div className='mb-3'>
                        <label
                          htmlFor='name'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Name
                        </label>
                        <Field
                          type='text'
                          id='name'
                          name='name'
                          className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                        />
                        <ErrorMessage
                          name='name'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>

                      <div className='mb-3'>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Email
                        </label>
                        <Field
                          type='text'
                          id='email'
                          name='email'
                          className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                        />
                        <ErrorMessage
                          name='email'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>

                      <div className='mb-3'>
                        <label
                          htmlFor='title'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Title
                        </label>
                        <Field
                          type='text'
                          id='title'
                          name='title'
                          className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                        />
                        <ErrorMessage
                          name='title'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>

                      <div className='mb-3'>
                        <label
                          htmlFor='role'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Role
                        </label>
                        <Field
                          type='text'
                          id='role'
                          name='role'
                          className='pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6'
                        />
                        <ErrorMessage
                          name='role'
                          component='div'
                          className='text-red-500 text-sm'
                        />
                      </div>
                    </div>
                  </div>

                  <div className='mt-4 px-5 flex justify-between'>
                    <button
                      onClick={handleCancel}
                      type='button'
                      className=' w-[6rem] flex items-center justify-center font-semibold  text-primary hover:text-white px-2 py-2.5 text-[14px] bg-white hover:bg-blue-500 mt-2 rounded-md outline-none shadow-md transition duration-300 '
                    >
                      Cancel
                    </button>
                    <button
                      disabled={confirmLoading}
                      type='submit'
                      className={`${
                        confirmLoading && "w-[8rem] cursor-default opacity-50"
                      } w-[6rem] flex items-center justify-center font-semibold text-shadow-black text-white px-2 py-2.5 text-[14px] bg-blue-500 mt-2 rounded-md outline-none shadow-md transition duration-300 hover:bg-blue-600`}
                    >
                      {confirmLoading && (
                        <ClipLoader className='mr-1' color='white' size={20} />
                      )}
                      {editUser ? "Edit User" : "Add User"}
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
