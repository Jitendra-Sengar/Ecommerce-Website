import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector ,useDispatch} from "react-redux";
import { addToCart } from '../features/CartSlice';
export default function App() {
  const items = useSelector((state) => state.allCart.items);
  const dispatch=useDispatch();
  console.log(items)
  return (
    <MDBContainer>
      <MDBRow className="mb-3">
        {items.map((item)=>(
          <MDBCol key={item.product_id} size="md">
          <MDBCard>
            <MDBCardImage
              src={item.image}
              position="top"
              alt="..."
            />
            <MDBCardBody>
              <MDBCardTitle>{item.name}</MDBCardTitle>
              <MDBCardText>Price:
               {item.price}
              </MDBCardText>
              <MDBCardText>Quantity:
               {item.quantity}
              </MDBCardText>
              <MDBBtn onClick={()=>dispatch(addToCart(item))} href="#">Add to Cart</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        ))}
        
      </MDBRow>
    </MDBContainer>
  );
}
