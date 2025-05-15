import React, { useState, useEffect, FormEvent } from "react";

import axios from "axios";
import Header from "../components/Header";
import FullCard from "../components/FullCard";


const CardRandom = () => {

    const api: string = "http://localhost:8080";
    let cardExample;
    const [card, setCard] = useState<any>();
    useEffect(() => {
        //const token = localStorage.getItem("token")!;
        axios
            .get(api + "/cards/getRandomCard")
            .then((response: any) => {
                console.log(response.data.content[0]);
                setCard(response.data.content[0]);
                //console.log("-------------------");
                //console.log(card);
            })
            .catch((error) => {
                console.error("Error fetching cards:", error);
            });
    }, []);

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
                <Header />
                <div className="MainContent">
                    <h1>Ups! Algo ha ocurrido</h1>
                </div>
            </>
        );
    }



}

export default CardRandom;