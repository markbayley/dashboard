import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from "react-router-dom";

const Single = ({ inputs, title, col }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate ()

  console.log(data, 'DATA')

  const [displayName, setDisplayName] = useState("Jane Doe")
  const [email, setEmail] = useState ("janedoe@gmail.com")
  const [address, setAddress] = useState ("Elton St. 234 Garden Yd. NewYork")
  const [phone, setPhone] = useState ("+1 2345 67 89")
  const [country, setCountry] = useState ("Australia")
  const [img, setImg] = useState ("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };


  /* function to update firestore */
  const handleUpdate = async (e, id) => {
    e.preventDefault()
    const taskDocRef = doc(db, col, id)
    console.log(taskDocRef, 'taskDocRef')
    try{
      await updateDoc(taskDocRef, {
        displayName: displayName,
        email: email,
        address: address,
        phone: phone,
        country: country, 
        img: img
      })
      // onClose()
    } catch (err) {
      alert(err)
    }
    
  }


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
      
       
        {/* {data.map((item) => ( */}
     
          <div className="left">
          <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
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
                  <span className="itemValue">
                    {data.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
              </div>
            </div>
          </div>
       {/* ))} */}
      
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
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
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>

      

        

          {/* <form onSubmit={handleUpdate} className='editTask'>
        <input type='text' name='displayName' onChange={(e) => setDisplayName(e.target.value.toUpperCase())} value={displayName}/>
        <input type='text' name='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
        <input type='text' name='phone' onChange={(e) => setPhone(e.target.value)} value={phone}/>
        <input type='text' name='address' onChange={(e) => setAddress(e.target.value)} value={address}/>
        <input type='text' name='country' onChange={(e) => setCountry(e.target.value)} value={country}/>
     
        <button type='submit'>Edit</button>
         </form>  */}



 
        </div>
      </div>
      </div>
  );
};

export default Single;
