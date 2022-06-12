import { useState } from "react";

export const ToDoContainer = () => {
  const [itemList, setItemList] = useState();
  const [collectedItem, setCollectedItem] = useState([]);

  const handleChange = (e) => {
    const task = e.target.value;

    setItemList({ ...itemList, task });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const newItem = {
      ...itemList,
      id: Math.floor((1 + Math.random()) * 0x10000),
    };

    setCollectedItem([...collectedItem, newItem]);
  };

  return (
    <div className="container  mx-auto h-screen w-full p-3 ">
      <div className=" flex flex-col item-center justify-center bg-red w-full mx-auto p-5">
        <h2>My TODO List</h2>
        <div className="border border-solid border-gray-800">
          <input
            type="text"
            placeholder="Enter your task..."
            className="px-2 py-2.5 w-4/5 text-black focus:outline-none "
            onChange={handleChange}
          />
          <button
            className="px-2 py-2.5 w-1/5 bg-indigo-500 "
            type="button"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>

      {/* list */}

      <div className=" flex flex-col item-center justify-center bg-red w-full mx-auto p-5">
        <div className="text-align:left">
          {collectedItem.map((item, key) => {
            return (
              <ul key={key}>
                <li className=" flex justify-between border border-solid border-gray-800 bg-white text-black p-3 mt-4">
                  {item.task}

                  <div className=" flex justify-evenly w-1/5">
                    <span on>
                      <i class="fa-solid fa-trash-can"></i>
                    </span>
                    <span>
                      <i class="fa-solid fa-pen"></i>
                    </span>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};
