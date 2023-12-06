import { FC } from "react";
import { IUser } from "../../types/user";

interface UserTableProps {
  users: IUser[];
  handleEdit: (user: IUser) => void;
  handleDelete: (user: IUser) => void;
}

const UserTable: FC<UserTableProps> = ({ users, handleEdit, handleDelete }) => {
  return (
    <div>
      {users&&users?.length === 0 ? (
        <div>No users found please add users</div>
      ) : (
        <table className='min-w-full bg-white border border-gray-300'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b '>Name</th>
              <th className='py-2 px-4 border-b'>Email</th>
              <th className='py-2 px-4 border-b'>Title</th>
              <th className='py-2 px-4 border-b'>Role</th>
              <th className='py-2 px-4 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user?._id} className=''>
                <td className='py-2 px-4 border-b  text-center'>{user.name}</td>
                <td className='py-2 px-4 border-b text-center'>{user.email}</td>
                <td className='py-2 px-4 border-b text-center'>{user.title}</td>
                <td className='py-2 px-4 border-b text-center'>{user.role}</td>
                <td className='py-2 px-4 border-b text-center'>
                  <button
                    onClick={() => handleEdit(user)}
                    className='bg-blue-500 text-white px-2 py-1 mr-2 rounded'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className='bg-red-500 text-white px-2 py-1 rounded'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
