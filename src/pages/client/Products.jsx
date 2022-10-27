import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import { popularProducts } from "./data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #fbf0f4;
`;

const Products = ({handleFavorite, handleCart, handleDetail}) => {

  const [products, setProducts ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
  let list = [];
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    // setupdatedData(list);
    setProducts(list);
    console.log(list);
  } catch (err) {
    console.log(err);
  }
};
fetchData();
// const unsub = onSnapshot(
//   collection(db, col),
//   (snapShot) => {
//     let list = [];
//     snapShot.docs.forEach((doc) => {
//       list.push({ id: doc.id, ...doc.data() });
//     });
//     setupdatedData(list);
//     setData(list);
//   },
//   (error) => {
//     console.log(error);
//   }
// );
// return () => {
//   unsub();
// };
}, []);






  return (
    <Container>
     
      {products.map((item) => (
        <Product item={item} key={item.id} handleFavorite={handleFavorite} handleCart={handleCart} handleDetail={handleDetail} />
      ))}


    </Container>
  );
};

export default Products;