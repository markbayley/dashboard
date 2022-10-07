import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, productColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useParams } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Single from "../../pages/single/Single";
import { userInputs } from "../../formSource";

const Usertable = ({ col }) => {

  const [data, setData] = useState([]);
  console.log(data, 'data')
  const [file, setFile] = useState("");
  console.log(file, 'file')
  const [per, setPerc] = useState(null);
  console.log(per, 'per')
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false);
  console.log(editing, 'editing...')

  const params = useParams();
  console.log(params, 'params')

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, col),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);


  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, col, id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };


  const [username, setUsername] = useState();
  console.log(username, 'username')
  const [displayName, setDisplayName] = useState();
  console.log(displayName, 'displayName')
  const [email, setEmail] = useState();
  console.log(email, 'email')
  const [address, setAddress] = useState();
  console.log(address, 'address')
  const [phone, setPhone] = useState();
  console.log(phone, 'phone')
  const [country, setCountry] = useState();
  console.log(country, 'country')
  const [img, setImg] = useState();
  console.log(img, 'img')

  const handleEdit = (id) => {
    console.log(id, 'id-editing')
    setEditing(true);
    const userData = data.filter((item) => item.id === id);
    console.log(userData, 'userData - editing')
    setData(userData);
    console.log(data, 'setData - editing')
    setUsername(userData[0].username);
    setEmail(userData[0].email);
    setAddress(userData[0].address);
    setCountry(userData[0].country);
    setPhone(userData[0].phone);
  };

  const handleUpdate = async (id) => {
    // e.preventDefault()
    const taskDocRef = doc(db, col, id);
    try {
      await updateDoc(taskDocRef, {
        username: username,
        email: email,
        country: country,
        address: address,
        phone: phone,
        displayName: displayName,
        img: img,
      });
      setEditing(false);
    } catch (err) {
      alert(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {editing ? (
              <div
                className="updateButton"
                onClick={() => handleUpdate(params.row.id)}
              >
                Save
              </div>
            ) : (
              <div
                className="updateButton"
                onClick={() => handleEdit(params.row.id)}
              >
                Edit
              </div>
            )}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link
              to={"/" + col + "/" + params.row.id}
              style={{ textDecoration: "none" }}
              onClick={() => handleEdit(params.row.id)}
            >
              <div className="updateButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];


  return (
    <>
      <div className="datatable">
        <div className="datatableTitle">
          {col === "users" ? "Users" : "Products"}

          <Link to={"/" + col + "/new"} className="link">
            Add New
          </Link>
        </div>
        {editing && (
          <>
            <form>
              <label style={{color: "gray"}}> Update Fields: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label htmlFor="file" className="">
                {/* <DriveFolderUploadOutlinedIcon className="icon" /> */}
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt="avatar"
                  width="32px"
                  height="32px"
                  style={{
                    borderRadius: "50%",
                    marginBottom: "-10px",
                    marginRight: "10px",
                  }}
                />
              </label>
              <input
                type="file"
                id="file"
                // value={file}
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              &nbsp;&nbsp;
              <input style={{width: "125px"}}
                className="cellWithStatus"
                type="text"
                value={username}
                placeholder={username}
                onChange={(e) => setUsername(e.target.value)}
                // onChange={handleInput}
              ></input>
              <input
                className="cellWithStatus"
                type="text"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="cellWithStatus"
                type="text"
                value={address}
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)}
              ></input>
                    <input style={{width: "125px"}}
                className="cellWithStatus"
                type="text"
                value={phone}
                placeholder="phone"
                onChange={(e) => setPhone(e.target.value)}
              ></input>
              <input style={{width: "125px"}}
                className="cellWithStatus" 
                type="text"
                value={country}
                placeholder="country"
                onChange={(e) => setCountry(e.target.value)}
              ></input>
            
            </form>
          </>
        )}

        {col === "products" ? (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={productColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        ) : (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        )}
      </div>
      {/* <Single col="users" inputs={userInputs} title="Edit User" data={data}/> */}
    </>
  );
};

export default Usertable;
