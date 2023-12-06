import React from "react";

type Props = {
  setOpenModal: (val:boolean) => void;
};

function Button({ setOpenModal }: Props) {
  return (
    <button
      onClick={()=>{setOpenModal(true)}}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
    >
      Add User
    </button>
  );
}

export default Button;
