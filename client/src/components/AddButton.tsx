import React from "react";

type Props = {
  handleButtonAdd: () => void;
};

function Button({ handleButtonAdd }: Props) {
  return (
    <button
      onClick={handleButtonAdd}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
    >
      Add User
    </button>
  );
}

export default Button;
