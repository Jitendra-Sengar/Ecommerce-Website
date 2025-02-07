import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchProducts } from '../features/CartSlice';
export default function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  if (state.allCart.isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <MDBContainer>
      <MDBRow className="mb-3">
        {state.allCart.data ? state.allCart.data.map((item) => (
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
                  {item.quantity ? item.quantity : 0}
                </MDBCardText>
                <MDBBtn onClick={() => dispatch(addToCart(item))} href="#">Add to Cart</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        )): <h1>No data...</h1>}

      </MDBRow>
    </MDBContainer>
  );
}
