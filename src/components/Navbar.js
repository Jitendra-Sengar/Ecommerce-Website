import React, { useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal } from '../features/CartSlice';

export default function App() {
  const {data,totalQuantity}=useSelector((state)=>state.allCart)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getCartTotal())
  },[data, dispatch])



  return (
    <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand>Navbar</MDBNavbarBrand>
        <span>
          <Link to="/">All Product
          </Link>
        </span>
        <MDBBtn color='dark'>
        <Link to="/cart">Cart({totalQuantity})</Link>
      </MDBBtn>
      </MDBContainer>
    </MDBNavbar>
  );
}