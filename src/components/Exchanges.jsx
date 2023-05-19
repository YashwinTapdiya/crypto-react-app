import React, { useEffect ,useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Container , HStack } from '@chakra-ui/react';
import Loader from './Loader';

const Exchanges = () => {

    const [exchanges , setExchanges] = useState([]);
    const [loading , setLoading] =useState(true);

//useEffect(effect: React.EffectCallback, deps?: React.DependencyList | undefined): void
//If present, effect will only activate if the values in the list change.
//Accepts a function that contains imperative, possibly effectful code.
    useEffect(() =>{
        const fetchExchanges = async() =>{
            const {data} = await axios.get(`${server}/exchanges`)

            console.log(data);
            setExchanges(data);
            setLoading(false);
        };
        fetchExchanges();
    }, []);


  return (
    <Container maxW={"container.xl"} >
        {loading? <Loader /> : <>

        <HStack wrap={"wrap"}> 
            {
                exchanges.map((i)=>(
                    <ExhangeCard />
                ))

            }
        </HStack>

         </>}
    </Container>
  )
}

const ExhangeCard=()=>{

}

export default Exchanges