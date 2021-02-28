import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './ProductCard.css';
import React from 'react';
import { connect } from 'react-redux';

function ProductCard(props) {
  let history = useHistory();
  return (
    <Card
      className="col-md-3 rounded shadow-sm border-0 mb-4 product-card"
      onClick={() => {
        if(props.isUserLogged){
          history.push(`/detail/${props.index}`);
        }else{
          history.push(`/login`);
        }

      }}
    >
      <Card.Img
        className="img-fluid d-block mx-auto mb-3"
        src={props.data.image ? props.data.image : 'loding'}
      />

      <Card.Body className="p-4 product-card-body">
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text>${props.data.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function stateToProps(state) {
  return {
    // state: state.reducer,
    isUserLogged:state.reducer.isUserLogged
  };
}
export default connect(stateToProps)(ProductCard);