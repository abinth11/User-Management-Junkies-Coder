import { FC } from "react";
import { IUser } from "../../types/user";

interface UserTableProps {
  users: IUser[];
  handleEdit: (userId: string) => void;
  handleDelete: (userId: string) => void;
}

const UserTable: FC<UserTableProps> = ({ users, handleEdit, handleDelete }) => {
  return (
    <table className='min-w-full bg-white border border-gray-300'>
      <thead>
        <tr>
          <th className='py-2 px-4 border-b '>Name</th>
          <th className='py-2 px-4 border-b'>Email</th>
          <th className='py-2 px-4 border-b'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user?._id} className="">
            <td className='py-2 px-4 border-b  text-center'>{user.name}</td>
            <td className='py-2 px-4 border-b text-center'>{user.email}</td>
            <td className='py-2 px-4 border-b text-center'>
              <button
                onClick={() => handleEdit(user?._id as string)}
                className='bg-blue-500 text-white px-2 py-1 mr-2 rounded'
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user?._id as string)}
                className='bg-red-500 text-white px-2 py-1 rounded'
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
