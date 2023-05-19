import React, { useEffect ,useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import {
    Container,
    Heading,
    HStack,
    Image,
    Text, 
    VStack,
  } from "@chakra-ui/react";
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {

    const [coins , setCoins] = useState([]);
    const [loading , setLoading] =useState(true);
    const [error , setError] = useState(false);
    const [page , setPage] =useState(1);
    const [currency , setCurrency] =useState("inr");
    const currencySymbol = currency === "inr" ? "₹" : currency=== "eur" ? "€" : "$";

//useEffect(effect: React.EffectCallback, deps?: React.DependencyList | undefined): void
//If present, effect will only activate if the values in the list change.
//Accepts a function that contains imperative, possibly effectful code.
    useEffect(() =>{
        const fetchCoins = async() =>{
            try{
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}`)
                //console.log(data);
                setCoins(data);
                setLoading(false);
            } catch(error){
                setError(true);
                setLoading(false);
            }
        };
        fetchCoins();
    }, [currency , page]);
    if(error){
        return <ErrorComponent message={"Error while fetching Coins"} />
    }

  return (
    <Container maxW={"container.xl"} >
        {loading? <Loader /> : <>

        <HStack wrap={"wrap"}> 
            {
                coins.map((i)=>(
                    <CoinCard 
                    id={i.id}
                    key={i.id}
                    name={i.name} 
                    price={i.current_price}
                    img={i.image} 
                    symbol={i.trust_score_rank} 
                    url={i.url}
                    currencySymbol={currencySymbol} />
                ))

            }
        </HStack>

         </>}
    </Container>
  )
}


export default Coins;