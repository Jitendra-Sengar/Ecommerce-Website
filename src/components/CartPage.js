import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCartTotal,removeItem,increaseItemQuantity,decreaseItemQuantity } from '../features/CartSlice';

const CartPage = () => {
  const {cart,totalQuantity,totalPrice }  =  useSelector((state)=>state.allCart)

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getCartTotal());
  },[cart])
  

  return (
    <div>
      <section className="h-100 gradient-custom">
  <div className="container py-5">
    <div className="row d-flex justify-content-center my-4">
      <div className="col-md-8">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Cart - {cart.length}items</h5>
          </div>
          <div className="card-body">
           { cart.map((data)=>( 
            <div className="row">
              <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                
                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img src={data.image}
                    className="w-100" alt={data.name} />
                  <a href="#!">
                    <div className="mask" style={{backgroundColor: "yellow"}}></div>
                  </a>
                </div>
                
              </div>

              <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                
                <p><strong>{data.name}</strong></p>
               
                <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-sm me-1 mb-2" data-mdb-tooltip-init
                  title="Remove item" onClick={()=>dispatch(removeItem(data.id))}>
                  <i className="fas fa-trash"></i>
                </button>
               
                
              </div>

              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
               
                <div className="d-flex mb-4" style={{}}>
                  <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary px-3 me-2"
                    onClick={()=>dispatch(decreaseItemQuantity(data.id))}>
                    <i className="fas fa-minus"></i>
                  </button>

                  <div data-mdb-input-init className="form-outline">
                    <input
                     id="form1" 
                     min="0" name="quantity" 
                     value={data.quantity} type="number" className="form-control"  onChange={()=>null}/>
                    <label className="form-label" for="form1">Quantity</label>
                  </div>

                  <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary px-3 ms-2"
                    onClick={()=>dispatch(increaseItemQuantity(data.id))}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                

                
                <p className="text-start text-md-center">
                  <strong>{data.price}</strong>
                </p>
                
              </div>
            </div>))
           
}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Summary</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                Total Quantity
                <span>{totalQuantity}</span>
              </li>

              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>
                    Total amount
                  </strong>
                  <span>
                    <strong>{totalPrice}</strong>
                  </span>
                </div>
              </li>
            </ul>

            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block">
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default CartPage;
