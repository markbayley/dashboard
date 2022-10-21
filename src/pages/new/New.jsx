import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

const New = ({ inputs, title, col }) => {
  console.log(col, "col");
  const [file, setFile] = useState("");
  console.log(file, "file-new");
  const [file2, setFile2] = useState("");
  console.log(file2, "file-new2");
  const [file3, setFile3] = useState("");
  console.log(file2, "file-new2");

  const [data, setData] = useState({});
  console.log(data, "data-new");
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [main, setMain] = useState("");

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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (!data.img) {
              setData((prev) => ({ ...prev, img: downloadURL }));
            } else if (!data.img2) {
              setData((prev) => ({ ...prev, img2: downloadURL }));
            } else {
              setData((prev) => ({ ...prev, img3: downloadURL }));
            }
          });
          setLoading(false);
        }
      );
    };

    file && uploadFile();
  }, [file]);

  function CircularIndeterminate() {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, col, res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  console.log(data.img, "data.img");

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="datatableTitle">
          {col === "users"
            ? "Add User"
            : col === "products"
            ? "Add Product"
            : col === "orders"
            ? "Add Order"
            : col === "profile"
            ? "Add Profile"
            : "Delivery"}

          <div style={{ display: "flex" }}>
            <ClearIcon
              className="link icon"
              style={{ fontSize: "18px" }}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>

        <div className="bottom">
          <div className="left">
            <h3>
              {data.title
                ? data.title
                : data.displayName
                ? data.displayName
                : data.product
                ? data.product
                : "Enter Details"}
            </h3>
            <br />
        
        
            <img
              src={
                main
                  ? main
                  : data.img
                  ? data.img
                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              className={col === "users" ? "itemImg" : "altImg"}
            />
       
          </div> 
       

          <div className="right">
            <form onSubmit={handleAdd}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <div className="formInput">
                <label htmlFor="file">
                  Upload Images:{" "}
                  <DriveFolderUploadOutlinedIcon className="icon" />
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  {loading && !data.img && !data.img2 && !data.img3 ? (
                    <CircularIndeterminate />
                  ) : (
                    <img
                      src={
                        data.img
                          ? data.img
                          : file
                          ? URL.createObjectURL(file)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt="small image"
                      className={col === "users" ? "smallImg" : "smallAlt"}
                      onClick={(e) => setMain(e.target.src)}
                    />
                  )}
                
                     {loading && data.img && !data.img2 && !data.img3 ? (
                    <CircularIndeterminate />
                  ) : (
                    <img
                      src={
                        data.img2
                          ? data.img2
                          : file2
                          ? URL.createObjectURL(file2)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt="small image"
                      className={col === "users" ? "smallImg" : "smallAlt"}
                      onClick={(e) => setMain(e.target.src)}
                    />
                  )}
                   {loading && data.img && data.img2 && !data.img3  ? (
                    <CircularIndeterminate />
                  ) : (
                    <img
                      src={
                        data.img3
                          ? data.img3
                          : file3
                          ? URL.createObjectURL(file3)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt="small image"
                      className={col === "users" ? "smallImg" : "smallAlt"}
                      onClick={(e) => setMain(e.target.src)}
                    />
                  )}
                </label>
              </div>

              <button disabled={per !== null && per < 100} type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
