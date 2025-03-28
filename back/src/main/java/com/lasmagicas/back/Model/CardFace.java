package com.lasmagicas.back.Model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CardFace {
    private Card card0;
    private Card card1;
}
