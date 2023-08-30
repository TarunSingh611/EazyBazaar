import { apiGetOrders } from "../../api/apiGetOrders";

const OrderList = () => {
  apiGetOrders()
    .then((res) => {
      console.log(res);
    })
    .error((err) => {
      console.log(err);
    });

  return <div>Hello</div>;
};

export default OrderList;
