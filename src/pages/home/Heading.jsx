import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  height: 30vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
//   font-size: 36px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 22px;
  font-weight: 300;

  margin-bottom: 20px;
   padding: 0px 10px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 33%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  border-radius: 5%;
`;

const Heading = ({title, subtitle, cart, total}) => {
  return (
    <Container>
      <Title>{title}{cart ? " ("+ cart.length +")" : "" }</Title>
      <Desc >{subtitle}  { total ? "Your total is $" + total.toFixed(2) + "." : "" }</Desc>
   
      {/* <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer> */}
    </Container>
  );
};

export default Heading;