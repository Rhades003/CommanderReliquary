import React, { useState, useEffect  } from "react";


const Deck = () => {
    

    return (
        <>
            <div id="decks">
                <div id="headerDecks">
                    <h1>Decks</h1>
                </div>
                <div id="createDeck">
                    <form action="">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name"/>

                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name"/>
                    </form>
                    <button className="buttonPurple">New</button>
                </div>
            </div>
        </>
    );


}

export default Deck;