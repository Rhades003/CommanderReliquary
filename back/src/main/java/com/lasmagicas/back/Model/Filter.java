package com.lasmagicas.back.Model;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class Filter {

    private String name;
    private List<String> colorIdentity;
    private String typeLine;
    private String rarity;
    private String pasive;
    private int cmc;

}
