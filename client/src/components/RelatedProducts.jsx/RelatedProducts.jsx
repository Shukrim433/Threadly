import React, { useEffect, useState } from 'react'
import useGetProducts from '../../hooks/useGetProducts';

const RelatedProducts = ({category}) => {
    const { loading, products } = useGetProducts();
    const [related, setRelated] = useState([])
    

    /* console.log(category.name) */

    useEffect(()=>{
        if(products.length>0) {
            let productsCopy = products.slice()

            productsCopy = productsCopy.filter((product)=> {
                category === product.category
                console.log(product)
            })
            
            console.log(productsCopy.slice(0,5))
        }
    }, [products])
  return (
    <div>RelatedProducts</div>
  )
}

export default RelatedProducts


/* 
"category" is passed from the individual Products page component
if the category of that product === the category of any product in the products array then we will keep it(productsCopy)
*/