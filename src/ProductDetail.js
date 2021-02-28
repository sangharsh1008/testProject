import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Nav ,Button} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './ProductDetail.css';
import { connect } from 'react-redux';

function ProductDetail(props) {
  const [data, setData] = useState([]); //fetched data
  const [tab, setTab] = useState(0); //bottom tab nav
  const [animSwitch, setAnimSwitch] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [btnAble, setBtnAble] = useState(true);
  let { id } = useParams();

  const fetchSingleItem = async (id) => {
    console.log(props);
    let res = await axios
    .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => console.error(err));
      setData(res.data);
      setBtnAble(false);
    };
  useEffect(() => {
    fetchSingleItem(id);
  }, [fetchSingleItem, id]);


  let history = useHistory();

  return (
    <div className="container">
        <Button style={{float: "right"}}onClick={()=>{
history.push('/login')
    }}>Log out</Button>
      <div className="row mt-5">
        <div className="col-md-6">
          {data.image ? (
            <img src={data.image} width="100%" alt="img" />
          ) : (
            'loading image...'
          )}
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{data.title}</h4>
          <p>{data.description}</p>
          <p>${data.price}</p>
          <div className="quantity-wrapper">
            <label>Qty: {quantity}</label>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (quantity <= 1) {
                  setQuantity(1);
                } else {
                  setQuantity(quantity - 1);
                }
              }}
            >
              -
            </button>
          </div>
          <div className="btn-wrapper">
            <button
              disabled={btnAble}
              className="btn btn-danger mx-2"
              onClick={() => {
                // if(props.isUserLogged){
                  props.dispatch({
                    type: 'addToCart',
                    payload: {
                      id: data.id,
                      name: data.title,
                      qty: quantity,
                      price: data.price,
                    },
                  });
                  history.push('/cart');
              }}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-info mx-2"
              onClick={() => {
                history.goBack();
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setAnimSwitch(false);
              setTab(0);
            }}
          >
            Product Info
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setAnimSwitch(false);
              setTab(1);
            }}
          >
            Shipping Info
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

function stateToProps(state) {
  console.log(state);
  return {
    state: state.reducer,
    isUserLogged:state.reducer.isUserLogged
  };
}
export default connect(stateToProps)(ProductDetail);
