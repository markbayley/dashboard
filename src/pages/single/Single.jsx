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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";
import Box from "@mui/material/Box";
import Chart from "../../components/chart/Chart";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns, productColumns } from "../../datatablesource";
import { Edit } from "@mui/icons-material";

function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}

const Single = ({ inputs, title, col, uid }) => {

  const params = useParams();


  const [data, setData] = useState({});

  const image = data.img;
  const [file, setFile] = useState(image);

  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const [main, setMain] = useState(data.img);


  useEffect(async () => {
    const docRef = doc(db, col, params?.Id || uid );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
   
      setData(docSnap.data());

    } else {
      console.log("No such document!");
    }
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

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

        
          });
        }
      );
    };
    main && uploadFile();
  }, [file, main]);

  const [transactions, setTransactions] = useState([]);




  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "orders"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        const filteredList = list.filter((items) => {
          if (col === "users" && items.customer !== data.displayName) {
            return false;
          }
          if (col === "products" && items.product !== data.title) {
            return false;
          }
          if (col === "orders" && items.product !== data.product) {
            return false;
          }

          return true;
        });

        setTransactions(filteredList);
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

    const taskDocRef = doc(db, col, params?.Id || uid);

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

             
                  <SubdirectoryArrowLeftIcon
                    className="link icon"
                    style={{ fontSize: "22px" }}
                    onClick={() => navigate(-1)}
                  />
 
              </div>
              <div className="top">
                <div className="left">
                  <div className="editButton">
                    <div onClick={() => setEditing(true)}><Edit className="icon"/></div>
                  </div>
                  {col === "users" || col === "profile" ? (
                    <h1 className="title">Profile</h1>
                  ) : (
                    <h1 className="title">Product</h1>
                  )}
                  <div className="item">
                    <img
                      src={
                        main
                          ? main
                          : data.img
                      }
                      alt="image upload"
                      className="itemImg"
                    />
                    {col === "profile" || col === "users" ? (
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
                    ) : col === "orders" ? (
                      <div className="details">
                        <h2 className="itemTitle">{data.product}</h2>
                        <div className="detailItem">
                          <span className="itemKey">Customer:</span>
                          <span className="itemValue">{data.customer}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Amount:</span>
                          <span className="itemValue">${data.amount}</span>
                        </div>

                        <div className="detailItem">
                          <span className="itemKey">Date:</span>
                          <span className="itemValue">{data.date}</span>
                        </div>
                      </div>
                    ) : (
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
                    )}
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
                  <Chart col={col} displayName={data.displayName} title={data.title} product={data.product}
                    aspect={2.5 / 1}
                    charttitle={ col === "users"
                    ?  "Purchases (6 Months) - " + data.displayName
                    : col === "products"
                    ? "Sales (6 Months) - " + data.title
                    : col === "orders"
                    ? "Orders (6 Months) - " + data.product
                    : col === "profile"
                    ? "Employee Earnings (Monthly) - " + data.displayName
          
                    : "Delivery"}
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
                                : input.placeholder === "units"
                                ? data.units
                                : input.placeholder === "category"
                                ? data.category
                                : input.placeholder === "sold"
                                ? data.sold
                                : "not recorded"
                            }
                            onChange={handleInput}
                          />
                        </div>
                      ))}
                      <div className="formInput">
                        <label htmlFor="file">
                          Images:{" "}
                          <DriveFolderUploadOutlinedIcon className="icon" />
                          <img
                          src={data.img}
                          alt="small"
                          className="smallImg"
                          onClick={(e) => setMain(e.target.src)}
                        />
                          <img
                          src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          alt="small"
                          className="smallImg"
                          onClick={(e) => setMain(e.target.src)}
                        />
                              <img
                          src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          alt="small"
                          className="smallImg"
                          onClick={(e) => setMain(e.target.src)}
                        />
                        </label>
                        <input
                          type="file"
                          id="file"
                          onChange={(e) => setFile(e.target.files[0])}
                          style={{ display: "none" }}
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
            <div className="listTitle">Latest Transactions -  {col === "users"
                    ? data.displayName
                    : col === "products"
                    ? data.title
                    : col === "orders"
                    ? data.product
                    : col === "profile"
                    ? data.displayName
                    : ""}
</div>
          {col !== "profile" && 
            <DataGrid
              className="datagrid"
              rows={transactions}
              columns={orderColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
            />
          } 
          </div>
        </div>
      </div>
    </>
  );
};

export default Single;
