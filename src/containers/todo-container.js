import { useState } from "react";

export const ToDoContainer = () => {
  const [itemList, setItemList] = useState("");
  const [collectedItem, setCollectedItem] = useState([]);
  const [flag, setFlag] = useState(0);
  const [error, setError] = useState(0);
  const [taskId, setTaskId] = useState();

  const handleChange = (e) => {
    const task = e.target.value;
    setItemList({ ...itemList, task });
  };

  const clearField = () => {
    setItemList({ task: "" });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (itemList.task === "") {
      setError(1);
    } else {
      const newItem = {
        ...itemList,
        id: Math.floor((1 + Math.random()) * 0x10000),
      };

      setCollectedItem([...collectedItem, newItem]);
      clearField();
    }
  };

  const handleRemove = (id) => {
    const filteredData = collectedItem.filter((task) => {
      return task.id !== id;
    });

    setCollectedItem(filteredData);
  };

  const handleEdit = (id) => {
    setTaskId(id);
    setFlag(1);
    collectedItem.map((item) => {
      if (item.id === id) {
        itemList.task = item.task;
        setItemList({ task: item.task });
      }
    });
  };

  const handleUpdate = () => {
    const currentTask = itemList.task;
    const updateData = collectedItem.map((item) => {
      if (item.id === taskId) {
        item.task = currentTask;
      }
    });

    setItemList(updateData);
    clearField();
    setFlag(0);
  };

  return (
    <div className="container  mx-auto h-screen w-full p-3 ">
      <div className=" flex flex-col item-center justify-center bg-red w-full mx-auto p-5">
        <h2 className="text-4xl mb-3">My TODO List</h2>
        <div className="border border-solid border-gray-800">
          <input
            type="text"
            placeholder="Enter your task..."
            className="px-2 py-2.5 w-4/5 text-black focus:outline-none "
            onChange={handleChange}
            name="task"
            value={itemList.task}
          />

          {flag === 0 ? (
            <button
              className="  px-2 py-2.5 w-1/5 bg-indigo-500 "
              type="button"
              onClick={handleAdd}
            >
              ADD
            </button>
          ) : (
            <button
              className="  px-2 py-2.5 w-1/5 bg-indigo-500 "
              type="button"
              onClick={handleUpdate}
            >
              UPDATE
            </button>
          )}
        </div>

        {error === 1 ? (
          <h4 className="text-amber-600 mt-3">Task Field can't be empty</h4>
        ) : null}
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
                    <span
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </span>

                    <span
                      onClick={() => {
                        handleRemove(item.id);
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
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
