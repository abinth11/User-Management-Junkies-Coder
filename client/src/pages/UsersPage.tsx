import React, { useEffect, useState } from "react";
import UserTable from "../components/Table";
import { IUser } from "../../types/user";
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
  const handleEdit = (id: string) => {
  };
  const handleDelete = (id: string) => {};
  const api = new UserApi();


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
  }, []);

  return (
    <div className='p-32'>
      <AddUserModal
        isModalOpen={openModal}
        setIsModalOpen={setOpenModal}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        editUser={editMode}
      />
      <div className='flex justify-end'>
        <Button setOpenModal={setOpenModal} />
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
