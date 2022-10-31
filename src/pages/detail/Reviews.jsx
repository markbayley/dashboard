import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styled from "styled-components";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EditOffOutlined, EditOutlined } from "@mui/icons-material";
import { userColumns } from "../../datatablesource";

const Container = styled.div`
//   padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
 background-color: #fcf5f5;
// background-color: #ffd5b1;
`;

const Item = styled.div`
  margin: 5px;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: flex-start;
//   background-color: #ffd5b144;
  position: relative;
  flex-wrap: wrap;
//   font-size: 20px;
  border: 3px solid white;
  padding: 20px;
`;




const Button = styled.button`
border: none;
padding: 12px;
color: white;
cursor: pointer;
font-weight: 600;
border-radius: 5px;
transition: all 0.3s ease;
&:hover {
    cursor: pointer;
  }

`

const Input = styled.input`
  background-color: #fcf5f5;
  padding: 10px;
  border-radius: 5px;
  border: 3px solid white;
  margin: 5px 0px 10px 5px;
  ::placeholder {
    font-size: 16px;
    color: black !mportant;
  }
`;

const TextArea = styled.textarea`
border: 3px solid white;
  background-color: #fcf5f5;
  padding: 10px;
  border-radius: 5px;
  margin: 0px 5px 0px 5px;
  ::placeholder {
    font-size: 16px;
  }
`;

export const Reviews = ({ detail, user }) => {

  console.log(user, 'user-reviews')

  const [transactions, setTransactions] = useState([]);
  const [ reviewed, setReviewed ] = useState(false)
  
  const [rating, setRating] = useState();

  const currDate = new Date().toLocaleDateString();

  const [reviewing, setReviewing] = useState(true);
  const navigate = useNavigate();

  console.log(user, 'user')

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "orders"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        const filteredList = list.filter((items) => {
          if (items.product !== detail.title) {
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
  }, []);

  const [review, setReview] = useState({name:user.displayName});
  console.log(review, "data-reviews");

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setReview({ ...review, [id]: value });
  };

  console.log(detail.id, "id-reviews");

 

  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log(detail.id, "id-handleUpdate-reviews");
    const taskDocRef = doc(db, "products", detail.id);

    try {
      await updateDoc(taskDocRef, {
        ...review,

        timeStamp: serverTimestamp(),
      });
      setReview(parseInt(rating));
      setReviewed(true)
      setReviewing(false)
        // navigate(-1);
      console.log(review, "data-update");
    } catch (err) {
      alert(err);
    }
  };

  console.log(transactions, "transactions");

 

  return (

   


 <Container>
      <Item style={{ width: "100%", padding: "5px", border: "none" }}>
      
        <h3> &nbsp;&nbsp;Review product?&nbsp;&nbsp;</h3>
        <div
          style={{
            color: "white",
            backgroundColor: "#b1cba6",
            borderRadius: "50%",
            padding: "3px 5px",
            cursor: "pointer",
          }}
          onClick={() => setReviewing(!reviewing)}
        >
          
          {reviewing ? <EditOffOutlined /> : <EditOutlined />}
        </div>
       

         
      
        
            {/* <div style={{display: "flex", justifyContent: "flex-end"}}>
            <h4>({transactions.length}) Reviews</h4>
            </div> */}
          
       
  
      </Item>

{/* FORM */}
        {reviewing ? (
          <Item style={{backgroundColor: "#ffd5b144", borderRadius: "5px" }}>
            <form onSubmit={handleUpdate}>
         
             
         
              <div style={{padding: "10px", display: "flex", alignItems: "center"}}>
               <h4>Rating&nbsp;&nbsp;</h4> 
                  <Rating
                name="simple-controlled"
                value={rating}
                onChange={(e, newValue) => {
                  setReview({rating:newValue});
                }}
              />
          
           
              </div>
            
              <TextArea
                id="review"
                type="text"
                placeholder="Share your thoughts..."
                cols="40"
                rows="5"
                onChange={handleInput}
              />


              <div style={{ fontSize: "16px" }}>
              <Input
                type="text"
                placeholder={ user.displayName ? user.displayName : "What's your name?" }
                id="name"
                onChange={handleInput}
              />
               
            {/* &nbsp;&nbsp;&nbsp;{currDate} */}
            
             <Button type="submit" style={{  backgroundColor: "#b1cba6", marginLeft: "10px"}}>
            POST
          </Button>
          </div>
             
                {/* <Input
                type="text"
                placeholder="How'd you rate it?"
                id="rating"
                onChange={handleInput}
              /> */}
             
         
              
              {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit">Add Review</Button>
            </div> */}
            </form>
          </Item>
        ) : (
          ""
        )}

{/* NEW REVIEW */}
{ reviewed === true ? 
    
        <Item style={{ borderRadius: "5px" }}>
            
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justiftyContent: "flex-start",
            }}
          >
            <img
              src={
                detail.img
                  ? detail.img
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              width="30px"
              alt="review"
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
            <p style={{ color: "#8e8e8e" }}> {detail.title}</p>
          </div>

          <p style={{ paddingTop: "15px", fontSize: "18px" }}>
            {detail.review ? (
              <em>
                {detail.review +
                  ". Lorem ipsum, dolor sit amet consectetur adipisicing elit."}
              </em>
            ) : (
              <em>
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                suscipit corporis, ab fuga, ipsa voluptate reprehenderit
                doloremque deserunt rem quis molestias placeat corrupti? Optio
                ad dolor architecto cupiditate omnis eaque!"
              </em>
            )}
          </p>


          <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "15px",
                fontSize: "18px",
                width: "100%"
              }}
            >
            <Rating name="simple-controlled" value={detail.rating} />
              <div
                style={{
                  display: "flex",
                  flex: 1,
              
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                 <p style={{ fontSize: "16px" }}>
                 {detail.name}&nbsp;&nbsp;&nbsp;{currDate}
                </p>
              </div>
            </div>
        </Item>
        :

        ""

            }

{/* ORDERS */}
        {transactions.map((item) => (
          
          <Item key={item.id} style={{ borderRadius: "5px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justiftyContent: "flex-start",
              }}
            >
              <img
                src={item.img}
                width="30px"
                alt="review"
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <p style={{ color: "gray" }}>{item.product}</p>
            </div>

            <p style={{ paddingTop: "15px", fontSize: "18px" }}>
              {item.review ? (
                item.review
              ) : (
                <em>
                  "Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Eaque suscipit corporis, ab fuga, ipsa voluptate reprehenderit
                  doloremque deserunt rem quis molestias placeat corrupti? Optio
                  ad dolor architecto cupiditate omnis eaque!"
                </em>
              )}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "15px",
                fontSize: "18px",
                width: "100%"
              }}
            >
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setReview(newValue);
                }}
              />

              <div
                style={{
                  display: "flex",
                  flex: 1,
              
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <p style={{ fontSize: "16px" }}>
                  {item.customer}&nbsp;&nbsp;&nbsp; {item.date}
                </p>
              </div>
            </div>
          </Item>
        
        ))}
        </Container>
     
     
 
  );
};
