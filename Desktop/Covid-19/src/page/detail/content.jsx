import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getDetails } from '../../redux/actions';
import ContentLoader from "../../components/loader/content-loader"
import Card from './card';

const content = () => {

  const { country }= useParams();
  const dispatch = useDispatch();

  const {isLoading,error,data}=useSelector((store)=>store);
  const arr = Object.entries(data  || {}).filter(([key])=> key !=="flag");
  const refetch= ()=> dispatch(getDetails(country));

  return (
    <div>
      {isLoading ? ( 
        <ContentLoader/>
       ): error ? (
        <Error info={error} refetch={refetch} />
       ):(
        arr.map((item,key)=> <Card key={key} item={item}  />)
       )
      
      }
    </div>
  )
}

export default content