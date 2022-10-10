import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import Box from "@mui/material/Box";
import Chart from "../../components/chart/Chart";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns, productColumns } from "../../datatablesource";

function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}

const Single = ({ inputs, title, col }) => {
  console.log(inputs, "inputs");
  const params = useParams();
  console.log(params, "params-single");

  const [data, setData] = useState({});
  console.log(data, "data-single");
  const image = data.img;
  const [file, setFile] = useState(image);
  console.log(file, "file-single");
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  console.log(editing, "editing-single");

  const [main, setMain ] = useState(data.img)
  console.log(main, "main")

  useEffect(async () => {
    const docRef = doc(db, col, params.Id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());

      console.log(data, "setData-single");
    } else {
      console.log("No such document!");
    }
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
       
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
        
            console.log(data, "setData - file");
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const [transactions, setTransactions] = useState([]);
  console.log(transactions, "transactions");

  // const params = useParams();
  // console.log(params, "params");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "transactions"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setTransactions(
          list.filter((items) => items.customer === data.displayName)
        );
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [data]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleUpdate = async (id) => {
    // e.preventDefault()
    console.log(id, "id-single");
    const taskDocRef = doc(db, col, params.Id);
    console.log(params.Id, "params.Id-single");
    try {
      await updateDoc(taskDocRef, {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
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
            <Link
              //  to={"/" + col + "/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="updateButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              // onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link
              to={"/" + col + "/" + params.row.id}
              style={{ textDecoration: "none" }}
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
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />

          {!editing ? (
            <>
              <div className="datatableTitle">
                {col === "users"
                  ? "User Detail"
                  : col === "products"
                  ? "Product Detail"
                  : col === "orders"
                  ? "Order Detail"
                  : col === "profile"
                  ? "Profile Detail"
                  : "Delivery"}

                <div style={{ display: "flex" }}>
                  <div onClick={() => setEditing(true)} className="link">
                    Edit
                  </div>
                  <SubdirectoryArrowLeftIcon
                    className="link icon"
                    style={{ fontSize: "22px" }}
                    onClick={() => navigate(-1)}
                  />
                </div>
              </div>
              <div className="top">
                <div className="left">
                  <div className="editButton">
                    <div onClick={() => setEditing(true)}>Edit</div>
                  </div>
                  { col === "users" || col === "profile" ? <h1 className="title">Profile</h1> : <h1 className="title">Product</h1> }
                  <div className="item">
                    <img
                      src={
                        main
                          ? main
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt="image upload"
                      className="itemImg"
                    />
                      { col === "profile" || col === "users"  ?
                    <div className="details">
                      <h2 className="itemTitle">{data.displayName}</h2>
                      <div className="detailItem">
                        <span className="itemKey">Email:</span>
                        <span className="itemValue">{data.email}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Phone:</span>
                        <span className="itemValue">{data.phone}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Address:</span>
                        <span className="itemValue">{data.address}</span>
                      </div>
                      <div className="detailItem">
                        <span className="itemKey">Country:</span>
                        <span className="itemValue">{data.country}</span>
                      </div>
                    </div>
                    : 
                    <div className="details">
                    <h2 className="itemTitle">{data.title}</h2>
                    <div className="detailItem">
                      <span className="itemKey">Description:</span>
                      <span className="itemValue">{data.description}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Price:</span>
                      <span className="itemValue">${data.price}</span>
                    </div>
                  </div>

                      }
                  </div>
                  <br />
                  <img
                    src={data.img}
                    alt="small image"
                    className="smallImg"
                    onClick={(e) => setMain(e.target.src)}
                  />
                  <img
                    src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    alt="small image"
                    className="smallImg"
                    onClick={(e) => setMain(e.target.src)}
                  />
                  <img
                    src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    alt="small image"
                    className="smallImg"
                    onClick={(e) => setMain(e.target.src)}
                  />
               
                </div>
                <div className="right">
                  <Chart
                    aspect={3 / 1}
                    title="User Spending ( Last 6 Months)"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="new">
              <div className="newContainer">
                <div className="datatableTitle">
                  {col === "users"
                    ? "Edit User"
                    : col === "products"
                    ? "Edit Product"
                    : col === "orders"
                    ? "Edit Order"
                    : col === "profile"
                    ? "Edit Profile"
                    : "Delivery"}

                  <ClearIcon
                    className="link"
                    style={{ fontSize: "22px" }}
                    onClick={() => setEditing(false)}
                  />
                </div>

                <div className="bottom">
                  <div className="left">
                    <h3>{data.displayName}</h3>
                    <br />
                    <img
                      src={
                        file ? (
                          URL.createObjectURL(file)
                        ) : data.img ? (
                          data.img
                        ) : (
                          <CircularIndeterminate />
                        )
                      }
                      alt="avatar"
                    />
                  </div>

                  <div className="right">
                    <form onSubmit={handleUpdate}>
             

                      {inputs.map((input) => (
                        <div className="formInput" key={input.id}>
                          <label>{input.label}</label>
                          <input
                            id={input.id}
                            type={input.type}
                            placeholder={
                              input.placeholder === "name"
                                ? data.displayName
                                : input.placeholder === "phone"
                                ? data.phone
                                : input.placeholder === "address"
                                ? data.address
                                : input.placeholder === "country"
                                ? data.country
                                : input.placeholder === "email"
                                ? data.email
                                : input.placeholder === "username"
                                ? data.username
                                : input.placeholder === "password"
                                ? "******"
                                : input.placeholder === "title"
                                ? data.title
                                : input.placeholder === "description"
                                ? data.description
                                : input.placeholder === "price"
                                ? data.price
                                : input.placeholder === "status"
                                ? data.status
                                : "not recorded"
                            }
                            onChange={handleInput}
                          />
                        </div>
                      ))}
                          <div className="formInput">
                        <label htmlFor="file">
                          Image:{" "}
                          <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                          type="file"
                          id="file"
                          onChange={(e) => setFile(e.target.files[0])}
                          style={{ display: "none" }}
                        />
                         <br />
                  <img
                    src={data.img}
                    alt="small image"
                    className="smallImg"
                    onClick={(e) => setMain(e.target.src)}
                  />
                  <img
                    src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    alt="small image"
                    className="smallImg"
                    onClick={(e) => setMain(e.target.src)}
                  />
                  <img
                    src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    alt="small image"
                    className="smallImg"
                    onClick={(e) => setMain(e.target.src)}
                  />
                      </div>
                      <button
                        disabled={per !== null && per < 100}
                        type="submit"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="datatable">
            <div className="listTitle">Latest Transactions</div>
            <DataGrid
              className="datagrid"
              rows={transactions}
              columns={orderColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Single;
