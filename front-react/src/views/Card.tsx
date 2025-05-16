import React, { useState, useEffect, FormEvent } from "react";

import axios from "axios";
import Header from "../components/Header";
import FullCard from "../components/FullCard";


const CardRandom = () => {

    const api: string = "http://localhost:8080";
    const [card, setCard] = useState<any>();
    const [iterator, setIterator] = useState<number>(0);

    const path = window.location.pathname;
    console.log(path);

        //const token = localStorage.getItem("token")!;
        if(iterator == 0){
            setIterator(1);
            axios
            .get(api + "/cards"+path)
            .then((response: any) => {
                console.log(response.data);
                setCard(response.data);
                
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