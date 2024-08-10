import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
export const Home = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState("");
  const [currentEdit, setCurrentEdit] = useState("");
  const [updatedItem, setUpdatedItem] = useState("");
  const navigate = useNavigate();
  const HandleClick = () => {
    // console.log(data)
    const id = localStorage.getItem("id");
    axios.post("http://localhost:3001/add", { id, item }).then((res) => {
      // console.log(item);
      // console.log(res);
      setData((prevData) => [...prevData, res.data]);
      // console.log(data);
      setItem("");
    });
  };
  const HandleDelete = (item) => {
    let item_id = item._id;
    // console.log(item_id);
    axios.post("http://localhost:3001/delete", { item_id });
    // .then((res) => console.log(res));
    setData(data.filter((data) => data._id != item_id));
  };
  const HandleUpdate = (index,item) => {
    setCurrentEdit(index);
    setUpdatedItem(item.item)
  };
  const HandleUpdateSave = (updateitem) => {
    // console.log(items)
    data.filter((item) => {
      if (item._id == updateitem._id) {
        item.item = updatedItem;
        // console.log('UPDATED')
      }
    });
    // console.log(data)
    axios
      .put("http://localhost:3001/update", { updateitem, updatedItem })
      // .then((res) => console.log(res.data));
    setCurrentEdit("");
  };
  const id = localStorage.getItem("id");
  useEffect(() => {
    axios.post("http://localhost:3001/get", { id }).then((res) => {
      setData(res.data);
    });
  }, []);
  const HandleLogout = () => {
    // console.log("clicked");
    localStorage.clear();
    navigate("/login");
  };
  if (!id) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <nav>
        <div className="logo">TO DO LIST</div>
        <div className="login">
          {" "}
          <h3 onClick={HandleLogout}>LOGOUT</h3>
        </div>
      </nav>
      <div className="add">
        <input
          type="text"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
        <button onClick={HandleClick}>ADD</button>
      </div>
      <div className="list">
        {data.map((item, index) => {
          if (currentEdit === index) {
            // console.log(currentEdit);
            // console.log(index);
            return (
              <ul key={index}>
                <li>
                  <input
                    type="text"
                    value={updatedItem}
                    onChange={(e) => setUpdatedItem(e.target.value)}
                  />
                  <div className="list_button">
                    <button onClick={() => HandleUpdateSave(item)}>save</button>
                  </div>
                </li>
              </ul>
            );
          } else {
            return (
              <ul key={index}>
                <li>
                  {item.item}
                  <div className="list_button">
                    <button onClick={() => HandleUpdate(index,item)}>UPDATE</button>
                    <button onClick={() => HandleDelete(item)}>DELETE</button>
                  </div>
                </li>
              </ul>
            );
          }

          //   <li key={item._id}>

          //   {item.item}
          //   <div className="list_button">
          //     <button onClick={()=>HandleUpdate(item)}>UPDATE</button>
          //     <button onClick={()=>HandleDelete(item)} >DELETE</button>
          //   </div>
          // </li>
        })}
      </div>
    </>
  );
};
