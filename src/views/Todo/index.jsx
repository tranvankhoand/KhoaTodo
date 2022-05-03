import React, { useState } from "react";
import classNames from "classnames";
import "./styles.scss";

function Todo(props) {
  const inititems = [
    {
      name: "Khoa",
      status: "new",
    },
  ];
  const [valueInput, setValueInput] = useState({
    inputTask: "",
    inputEdit: "",
  });

  const [items, setItems] = useState(inititems);
  
  const handleInput = (e) => {
    const { value, name } = e.target;
    setValueInput({
      ...valueInput,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let task = valueInput.inputTask;
    let item = [...items];
    let schema = {
      name: task,
      status: "new",
    };
    item.push(schema);
    setItems(item);
    setValueInput({
      ...valueInput,
      inputTask: "",
    });
  };

  const handleStatus = (index, status) => {
    let item = [...items];
    item[index].status = status;
    setItems(item);
    console.log(item[inititems].name)
  };
  const handleDelete = (index) => {
    let item = [...items]
    item.splice(index, 1)
    setItems(item)
  };
  
  const handleEdit = (index) => {
    setValueInput({
      ...valueInput,
      inputEdit: items[index].name,
      indexEdit: index,
    });
    setIsOpenEdit(!isOpenEdit);

  };

  const handleSaveEdit = () => {
    let item = [...items];
    let index = valueInput.indexEdit;
    item[index].name = valueInput.inputEdit;
    setItems(item);
    setIsOpenEdit(!isOpenEdit);
  };

  const [isOpenEdit, setIsOpenEdit] = useState([]);
  const  handleCloseEdit = () => {
    setIsOpenEdit(!isOpenEdit);
  }
  return (
    <div className="todo">
      <div className="todo__title">Todos</div>
      <div className="todo__add add">
        <div className="add__title">Add a task</div>
        <div className="add__content content">
          <p className="content__title">item</p>
          <input
            className="content__input-todo"
            placeholder="What do you wants to do?"
            name="inputTask"
            value={valueInput.inputTask}
            onChange={handleInput}
          ></input>
          <p className="content__note">Enter what you want to procastinate </p>
          <button
            className="content_submit btn btn--primary pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="todo__task task">
        <div className="task__title">Task</div>
        <div className="task__content content">
          <table className="task__table table">
            <thead>
              <tr>
                <th>Items </th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={classNames({
                      new: item.status === "new",
                      completed: item.status === "completed",
                      depending: item.status === "depending",
                    })}
                  >
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="btn btn--primary mr-15 pointer"
                        onClick={() => handleStatus(index, "new")}
                      >
                        New
                      </button>
                      <button
                        className="btn btn--primary mr-15 pointer"
                        onClick={() => handleStatus(index, "depending")}
                      >
                        Depending
                      </button>
                      <button
                        className="btn btn--primary mr-15 pointer"
                        onClick={() => handleStatus(index, "completed")}
                      >
                        Complete
                      </button>
                      <button
                        className="btn btn--primary mr-15 pointer"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn--secondary mr-15 pointer"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={classNames({
          "todo__edit": true,
          "edit": true,
          "display-none": isOpenEdit
      })}>
        <div className="edit__title">Edit: </div>
        <div className="edit__content content">
          <input
            className="content__input-todo mb-15"
            placeholder="Edit"
            name="inputEdit"
            value={valueInput.inputEdit}
            onChange={handleInput}
          />
          <div className="content__button right mr-10">
            <button className="btn btn--primary pointer mr-15"
                onClick={handleSaveEdit}
            >Lưu</button>
            <button className="btn btn--secondary pointer"
                onClick={handleCloseEdit}
            >Thoát</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
