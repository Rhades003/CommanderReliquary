import React, { useState, useEffect, FormEvent } from "react";

import axios from "axios";
import Header from "../components/Header";
import FullCard from "../components/FullCard";


const CardRandom = () => {

    document.title = "Carta Aleatoria";
    const api: string = "http://localhost:8080";
    const [card, setCard] = useState<any>();
    const [iterator, setIterator] = useState<number>(0);

        //const token = localStorage.getItem("token")!;
        if(iterator == 0){
            setIterator(1);
            axios
            .get(api + "/cards/getRandomCard")
            .then((response: any) => {
                
                setCard(response.data.content[0]);
                
                //console.log("-------------------");
                //console.log(card);
            })
            .catch((error) => {
                console.error("Error fetching cards:", error);
            });
        }

    useEffect(() => {
        console.log(iterator);
    }, [iterator]);

    if (card != undefined && card != null) {
        //console.log(card);
        return(
            <>
                <Header />
                <div className="MainContent">
                    <FullCard card={card}/>
                </div>
            </>
        );
    }
    else {
        //console.log(card);
        return (
            <>
            </>
        );
    }



}

export default CardRandom;