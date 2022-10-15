import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';

const New = ({ inputs, title, col }) => {
  const [file, setFile] = useState("");
  console.log(file, 'file-new')
  const [data, setData] = useState({});
  console.log(data, 'data-new')
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()

  const [main, setMain ] = useState(data.img)
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
            console.log(data, 'setData - file')
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
      navigate(-1)
    } catch (err) {
      console.log(err);
      alert(err)
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
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
                    style={{ fontSize: "22px" }}
                    onClick={() => navigate(-1)}
                  />
                </div>
              </div>
     
        <div className="bottom">
          <div className="left">
          <h3>{data.title ? data.title : data.displayName ? data.displayName : "Enter Details"}</h3><br/>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="image"
            />
          </div>
          
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Images: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <br />
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
                  <img
                    src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    alt="small image"
                    className="smallImg"
                    onClick={(e) => setMain(e.target.src)}
                  />
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
                    placeholder={input.placeholder}
                       
                    
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
  );
};

export default New;
