import React, { useEffect, useState } from "react";
import UserTable from "../components/Table";
import { IUser } from "../types/user";
import Button from "../components/AddButton";
import UserApi from "../api/api-impl";
import AddUserModal from "../components/AddUserModal";
import { toast } from "react-toastify";

type Props = {};

function UsersPage({}: Props) {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);
  const api = new UserApi();
  const handleEdit = (user: IUser) => {
    setEditMode(true);
    setCurrentUser(user);
    setOpenModal(true);
  };

  const handleButtonAdd = () => {
    setCurrentUser(null);
    setEditMode(false)
    setOpenModal(true);
  };
  const handleDelete = (user: IUser) => {
    api
      .deleteUser(user._id as string)
      .then((res) => {
        toast.success("successfully deleted user" as string, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
        setUpdated(!updated)
      })
      .catch((err) => {
        toast.error(err.message as string, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      });
  };

  const fetchData = () => {
    api
      .listUsers()
      .then((res) => {
        setUsers(res as IUser[]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [updated]);

  return (
    <div className='p-32'>
      <AddUserModal
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        editUser={editMode}
        updated={updated}
        setUpdated={setUpdated}
      />
      <div className='flex justify-end'>
        <Button handleButtonAdd={handleButtonAdd} />
      </div>
      <div className='mt-5'>
        <UserTable
          users={users as IUser[]}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default UsersPage;
