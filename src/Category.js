import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Category(props) {
  const [cateData, setCateData] = useState({});
let history=useHistory()
  let { categoryName } = useParams();
  useEffect(() => {
    fetchCategory();
  });

  const fetchCategory = async (categoryName) => {
    let dataCategoriWise=[]
    const obj={
      jewelery:[],
      electronics:[],
      mensClothing:[],
      womensClothing:[]
    }
    let res = await axios
      .get(`https://fakestoreapi.com/products/category/jewelery`)
      .catch((err) => console.error(err));

      obj.jewelery=res.data;

     res = await axios
      .get(`https://fakestoreapi.com/products/category/electronics`)
      .catch((err) => console.error(err));

      obj.electronics=res.data;

      res = await axios
      .get(`https://fakestoreapi.com/products/category/men%20clothing`)
      .catch((err) => console.error(err));

      obj.mensClothing=res.data;

      res = await axios
      .get(`https://fakestoreapi.com/products/category/women%20clothing`)
      .catch((err) => console.error(err));

      obj.womensClothing=res.data;

      setCateData({...obj})
  };

  return (
    <div className="container">  
         {cateData&&cateData.jewelery
          ? (<>           
            <div>{'Jwelery Products'}</div>
            <div className="row mt-5">
          {
            cateData.jewelery.map((d, i) => {
              return (
                <ProductCard
                  data={d}
                  index={d.id}
                  key={d.id}
                  className="product-card"
                />
              );
            })
          }
          </div>
          </>)
          : 'Loading'}
        
          <>
        {cateData&&cateData.electronics
          ? (
            <>
            <div style={{    color: "#ff5722", fontWeight: "bold", fontSize: "29px"}}>{'Electronics Products'}</div>
            <div className="row mt-5">
           { cateData.electronics.map((d, i) => {
              return (
                <ProductCard
                  data={d}
                  index={d.id}
                  key={d.id}
                  className="product-card"
                />
              );
            })}
             </div>
            </>           
            )          
          : 'Loading'}
          </>
      
          <>
        {cateData&&cateData.mensClothing
          ? (
            <>
            <div style={{    color: "#ff5722", fontWeight: "bold", fontSize: "29px"}}>{'MensClothing Products'}</div>
            <div className="row mt-5">
           { cateData.mensClothing.map((d, i) => {
              return (
                <ProductCard
                  data={d}
                  index={d.id}
                  key={d.id}
                  className="product-card"
                />
              );
            })}
             </div>
            </>           
            )          
          : 'Loading'}
          </>

          <>
        {cateData&&cateData.womensClothing
          ? (
            <>
            <div style={{    color: "#ff5722", fontWeight: "bold", fontSize: "29px"}}>{'WomensClothing Products'}</div>
            <div className="row mt-5">
           { cateData.womensClothing.map((d, i) => {
              return (
                <ProductCard
                  data={d}
                  index={d.id}
                  key={d.id}
                  className="product-card"
                />
              );
            })}
             </div>
            </>           
            )          
          : 'Loading'}
          </>
      
    </div>
  );
}
export default Category;
