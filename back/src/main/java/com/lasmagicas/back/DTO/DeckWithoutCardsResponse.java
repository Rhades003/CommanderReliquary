package com.lasmagicas.back.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DeckWithoutCardsResponse {
    Long id;
    String name;
    Long userId;
    String commander;
    String identity;

    public DeckWithoutCardsResponse(Long id, String name, Long userId, String commander, String identity) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.commander = commander;
        this.identity = identity;
    }
}
