import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import styled from "styled-components";
import { Rating } from "@mui/material";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fcf5f5;
`;

const Item = styled.div`
  flex: 1;
  margin: 5px;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  // background-color: white;
  position: relative;
  flex-wrap: wrap;
  font-size: 20px;
  border: 1px solid lightgray;
  padding: 20px;
`;

export const Reviews = ({ detail }) => {
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

  console.log(transactions, "transactions");

  const [value, setValue] = useState(3);

  return (
    <div>
      {/* <div> &nbsp;&nbsp; &nbsp;&nbsp;Reviews ({transactions.length})</div> */}
      <div>
        {transactions.map((item) => (
          <Item key={item.id} style={{ borderRadius: "5px"}}>
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
              <p style={{color: "#8e8e8e"}}>{item.product}</p>
            </div>

            <p style={{ paddingTop: "15px", fontSize: "18px" }}>
              <em>
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
                suscipit corporis, ab fuga, ipsa voluptate reprehenderit
                doloremque deserunt rem quis molestias placeat corrupti? Optio
                ad dolor architecto cupiditate omnis eaque!"
              </em>
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "15px",
                fontSize: "18px",
              }}
            >
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <br />
              <strong>{item.customer}</strong>&nbsp; {item.date}
            </div>
          </Item>
        ))}
      </div>
    </div>
  );
};
