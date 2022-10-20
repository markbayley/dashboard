import { Undo } from "@mui/icons-material";
import React from "react";

const OrderFilter = ({
  title,
  payment,
  handlePayment,
  customer,
  handleCustomer,
  paymentList,
  amount,
  handleAmount,
  handleUndo,
  delivery,
  deliveryList,
  handleDelivery
}) => {
  return (
    <>
      {title}
      <div>
        <span style={{ display: "flex", alignItems: "center" }}>
          <select value={payment} onChange={handlePayment} className="link">
            <option default>Payment</option>

            {paymentList.map(({ label, id, value }) => (
              <option key={id} value={value}>
                {label}
              </option>
            ))}
          </select>
          
          <select value={delivery} onChange={handleDelivery} className="link">
            <option default>Delivery</option>

            {deliveryList.map(({ label, id, value }) => (
              <option key={id} value={value}>
                {label}
              </option>
            ))}
          </select>

          <select value={customer} onChange={handleCustomer} className="link">
            <option key={1} default>
              Customer
            </option>
            <option key={2} value="Ascending">
              A-Z
            </option>
            <option key={3} value="Descending">
              Z-A
            </option>
          </select>

          <select value={amount} onChange={handleAmount} className="link">
            <option key={1} default>
              Amount
            </option>
            <option key={2} value="Lowest">
              Lowest
            </option>
            <option key={3} value="Highest">
              Highest
            </option>
          </select>

          <Undo
            onClick={handleUndo}
            className="link undo"
            style={{ fontSize: "20px" }}
          />
        </span>
      </div>
    </>
  );
};

export default OrderFilter;
