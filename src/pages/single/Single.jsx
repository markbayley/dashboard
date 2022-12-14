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
  deleteDoc,
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
import { DeleteForever, Edit } from "@mui/icons-material";
import { Badge } from "@mui/material";

function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}

const Single = ({ inputs, title, col, uid, user }) => {
  const [editing, setEditing] = useState(false);
  const params = useParams();

  const [file, setFile] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [file4, setFile4] = useState("");
  const [file5, setFile5] = useState("");

  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  const [main, setMain] = useState(data.img);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const docRef = doc(db, col, params?.Id || uid);
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
          setLoading(true);
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
          setLoading(false);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (!data.img) {
              setData((prev) => ({ ...prev, img: downloadURL }));
              setMain(data.img);
            } else if (!data.img2) {
              setData((prev) => ({ ...prev, img2: downloadURL }));
            } else if (!data.img3) {
              setData((prev) => ({ ...prev, img3: downloadURL }));
            } else if (!data.img4) {
              setData((prev) => ({ ...prev, img4: downloadURL }));
            } else if (!data.img5) {
              setData((prev) => ({ ...prev, img5: downloadURL }));
            } else {
              setData((prev) => ({ ...prev, img: downloadURL }));
            }
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, col, id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
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
              to={"/admin/" + "orders" + "/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="updateButton" onClick={() => setEditing(true)}>
                <Edit className="icon" />
              </div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteForever className="icon" />
            </div>
          </div>
        );
      },
    },
  ];


  console.log(data, 'data.id')
  console.log(uid, 'uid')
  console.log(user, 'user')

  return (
    <>
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          {!editing ? (
            <>
              <div className="datatableTitle">
                {
                // data.username === user.username
                //   ? "Profile"
                //   : 
                  col === "products"
                  ? "Product Detail"
                  : col === "orders"
                  ? "Order Detail"
                  : col === "users" 
                  ? "User Detail"
                  : "Delivery"}

                <SubdirectoryArrowLeftIcon
                  className="link icon"
                  style={{ fontSize: "18px" }}
                  onClick={() => navigate(-1)}
                />
              </div>
              <div className="top">
                <div className="left">
                  <div className="editButton">
                    <div onClick={() => setEditing(true)}>
                      <Edit className="icon" />
                    </div>
                  </div>
                  {col === "users" || col === "profile" ? (
                    <h1 className="title">Profile</h1>
                  ) : (
                    <h1 className="title">Product</h1>
                  )}
                  <div className="item">
                    {/* Not editing */}
                    <img
                      src={main ? main : data.img}
                      alt=""
                      className={col === "users" ? "itemImg" : "altImg"}
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
                          <span className="itemKey">Delivery:</span>
                          <span className="itemValue">{data.status}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Date:</span>
                          <span className="itemValue">{data.date}</span>
                        </div>

                        <img
                          src={
                            data.img
                              ? data.img
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt="small image"
                          className={col === "users" ? "smallImg" : "smallAlt"}
                          onClick={(e) => setMain(e.target.src)}
                        />
                        <img
                          src={
                            data.img2
                              ? data.img2
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt="small image"
                          className={col === "users" ? "smallImg" : "smallAlt"}
                          onClick={(e) => setMain(e.target.src)}
                        />
                        <img
                          src={
                            data.img3
                              ? data.img3
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt="small image"
                          className={col === "users" ? "smallImg" : "smallAlt"}
                          onClick={(e) => setMain(e.target.src)}
                        />
                           <img
                          src={
                            data.img4
                              ? data.img4
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt="small image"
                          className={col === "users" ? "smallImg" : "smallAlt"}
                          onClick={(e) => setMain(e.target.src)}
                        />
                           <img
                          src={
                            data.img5
                              ? data.img5
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt="small image"
                          className={col === "users" ? "smallImg" : "smallAlt"}
                          onClick={(e) => setMain(e.target.src)}
                        />
                      </div>
                    ) : (
                      //products
                      <div className="details">
                        <h2 className="itemTitle">{data.title}</h2>
                        <div className="detailItem">
                          <span className="itemKey">Description:</span>
                          <span className="itemValue">{data.description}</span>
                        </div>
                        <div className="detailItem">
                          <span className="itemKey">Category:</span>
                          <span className="itemValue">{data.category}</span>
                        </div>

                        <div className="detailItem">
                          <span className="itemKey">Price:</span>
                          <span className="itemValue">${data.price}</span>{" "}
                          &nbsp;&nbsp;&nbsp;
                          <span className="itemKey">Sales:</span>
                          <span className="itemValue ">
                            {transactions.length} &nbsp;&nbsp;&nbsp;{" "}
                            <span className="itemKey">Revenue:</span> $
                            {transactions.length * data.price}
                          </span>
                        </div>
                        <br />
                        <img
                          src={
                            data.img
                              ? data.img
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt="small image"
                          className={col === "users" ? "smallImg" : "smallAlt"}
                          onClick={(e) => setMain(e.target.src)}
                        />
                        <img
                          src={
                            data.img2
                              ? data.img2
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt="small image"
                          className={col === "users" ? "smallImg" : "smallAlt"}
                          onClick={(e) => setMain(e.target.src)}
                        />
                        <img
                          src={
                            data.img3
                              ? data.img3
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt="small image"
                          className={col === "users" ? "smallImg" : "smallAlt"}
                          onClick={(e) => setMain(e.target.src)}
                        />
                         <img
                          src={
                            data.img4
                              ? data.img4
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt="small image"
                          className={col === "users" ? "smallImg" : "smallAlt"}
                          onClick={(e) => setMain(e.target.src)}
                        />
                         <img
                          src={
                            data.img5
                              ? data.img5
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt="small image"
                          className={col === "users" ? "smallImg" : "smallAlt"}
                          onClick={(e) => setMain(e.target.src)}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="mid">

                </div> */}
                <div className="right">
                  <Chart
                    charttitle="Latest Transactions"
                    aspect={2.2 / 1}
                    data={transactions}
                    datakeyX="date"
                    datakeyY="total"
                    datakeyBar="total"
                    className="revenue"
                  />
                </div>
              </div>
            </>
          ) : (
            //Editing
            <div className="new">
              <div className="newContainer">
                <div className="datatableTitle">
                  {
                  // data.username === user.username
                  //   ? "Edit Profile"
                  //   : 
                    col === "products"
                    ? "Edit Product"
                    : col === "orders"
                    ? "Edit Order"
                    : col === "users" 
                    ? "Edit User"
                    : "Delivery"}

                  <ClearIcon
                    className="link"
                    style={{ fontSize: "18px" }}
                    onClick={() => setEditing(false)}
                  />
                </div>

                <div className="bottom">
                  <div className="left">
                    <h3>
                      {data.displayName
                        ? data.displayName
                        : data.title
                        ? data.title
                        : data.product
                        ? data.product
                        : "Enter Details"}
                    </h3>
                    <br />
                    {/* editing */}
                    {/* <Badge
                      badgeContent="main"
                    
                      color="info"
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >    */}
                      <img
                        src={main ? main : data.img}
                        alt=""
                        className={col === "users" ? "itemImg" : "altImg"}
                      />
                 {/* </Badge> */}
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
                                : input.placeholder === "product"
                                ? data.product
                                : input.placeholder === "customer"
                                ? data.customer
                                : input.placeholder === "payment"
                                ? data.payment
                                : input.placeholder === "date"
                                ? data.date
                                : input.placeholder === "amount"
                                ? data.amount
                                : input.placeholder === "total"
                                ? data.total
                                : input.placeholder === "delivery"
                                ? data.status
                                : "not recorded"
                            }
                            onChange={handleInput}
                          />
                        </div>
                      ))}
                      <div className="formInput">
                        <label htmlFor="file">
                          {/*  editing */}
                          {" "}
                          <DriveFolderUploadOutlinedIcon className="icon" />
                          <input
                            type="file"
                            id="file"
                            onChange={(e) => {
                              setFile(e.target.files[0]);
                            }}
                            style={{ display: "none" }}
                          />
                          <br />
                          {!data.img && loading ? (
                            <CircularIndeterminate />
                          ) : (
                            <>
                            <Badge
                      badgeContent="X"
                      color="info"
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                              <img
                                src={
                                  data.img
                                    ? data.img
                                    : file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt="small"
                                className={
                                  col === "users" ? "smallImg" : "smallAlt"
                                }
                                onClick={(e) => setMain(e.target.src)}
                              />
                       </Badge>
                            </>
                          )}
                          {data.img && loading ? (
                            <CircularIndeterminate />
                          ) : (
                           <>
                                       <Badge
                      badgeContent="X"
                      color="info"
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                              <img
                                src={
                                  data.img2
                                    ? data.img2
                                    : file2
                                    ? URL.createObjectURL(file2)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt="small"
                                className={
                                  col === "users" ? "smallImg" : "smallAlt"
                                }
                                onClick={(e) => setMain(e.target.src)}
                              />
                              </Badge>
                           </>
                           
                          )}
                          {data.img2 && loading ? (
                            <CircularIndeterminate />
                          ) : (
                            <Badge
                            badgeContent="X"
                            color="info"
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <img
                              src={
                                data.img3
                                  ? data.img3
                                  : file3
                                  ? URL.createObjectURL(file3)
                                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                              }
                              alt="small"
                              className={
                                col === "users" ? "smallImg" : "smallAlt"
                              }
                              onClick={(e) => setMain(e.target.src)}
                            />
                            </Badge>
                          )}
                          {data.img3 && loading ? (
                            <CircularIndeterminate />
                          ) : (
                            <Badge
                            badgeContent="X"
                            color="info"
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <img
                              src={
                                data.img4
                                  ? data.img4
                                  : file4
                                  ? URL.createObjectURL(file4)
                                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                              }
                              alt="small"
                              className={
                                col === "users" ? "smallImg" : "smallAlt"
                              }
                              onClick={(e) => setMain(e.target.src)}
                            />
                            </Badge>
                          )}
                          {data.img4 && loading ? (
                            <CircularIndeterminate />
                          ) : (
                            <Badge
                            badgeContent="X"
                            color="info"
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <img
                              src={
                                data.img5
                                  ? data.img5
                                  : file5
                                  ? URL.createObjectURL(file5)
                                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                              }
                              alt="small"
                              className={
                                col === "users" ? "smallImg" : "smallAlt"
                              }
                              onClick={(e) => setMain(e.target.src)}
                            />
                            </Badge>
                          )}
                        </label>
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
            <div className="listTitle">
              Latest Transactions -{" "}
              {col === "users"
                ? data.displayName
                : col === "products"
                ? data.title
                : col === "orders"
                ? data.product
                : ""}
            </div>
            {col !== "profile" && (
              <DataGrid
                className="datagrid"
                rows={transactions}
                columns={orderColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Single;
