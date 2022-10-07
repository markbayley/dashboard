import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../../firebase";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Single = ({ inputs, title, col}) => {

  const params = useParams();
  console.log(params, 'params-single')

  const [file, setFile] = useState();
  console.log(file, 'file-single')
  const [data, setData] = useState({});
  console.log(data, 'data-single')
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()


  useEffect(async () => {
    const docRef = doc(db, col, params.userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());
   
      console.log(data, 'setData-single')
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


  const handleUpdate = async (id) => {
    // e.preventDefault()
    console.log(id, 'id-single')
    const taskDocRef = doc(db, col, params.userId);
    console.log(params.userId, 'params.userId-single')
    try {
      await updateDoc(taskDocRef, {
       ...data,
       timeStamp: serverTimestamp(),
      });
      navigate(-1)
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
        <h1>{title}</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                  placeholder={input.placeholder === "name" ? data.displayName :
                               input.placeholder === "phone" ? data.phone :
                               input.placeholder === "address" ? data.address :
                               input.placeholder === "country" ? data.country :
                               input.placeholder === "email" ? data.email :
                               input.placeholder === "username" ? data.username :
                               input.placeholder === "password" ? data.password :
                               "not recorded"}
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

export default Single;


