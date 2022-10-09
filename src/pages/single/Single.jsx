import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

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

  const [viewing, setViewing] = useState(true);

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

  return (
    <>
      {viewing ? (
        <div className="single">
          <Sidebar />
          <div className="singleContainer">
            <Navbar />
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

              <Link to={"/" + col + "/new"} className="link">
                Add New
              </Link>
            </div>
            <div className="top">
              <div className="left">
                <div className="editButton">
                  <div onClick={() => setViewing(false)}>Edit</div>
                </div>
                <h1 className="title">Information</h1>
                <div className="item">
                  <img
                    src={
                      data.img
                        ? data.img
                        : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    }
                    alt=""
                    className="itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle">{data.displayName}</h1>
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
                </div>
              </div>
              <div className="right">
                <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
              </div>
            </div>
            <div className="home">
              <div className="homeContainer">
                <div className="listContainer">
                  <div className="listTitle">Latest Transactions</div>
                  <Table />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="new">
          <Sidebar />
          <div className="newContainer">
            <Navbar />
            <div
              className="top"
              style={{ justifyContent: "space-between", color: "gray" }}
            >
              <h1>{title}</h1>
              <ClearIcon className="icon" onClick={() => navigate(-1)} />
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
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>

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
                  <button disabled={per !== null && per < 100} type="submit">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Single;
