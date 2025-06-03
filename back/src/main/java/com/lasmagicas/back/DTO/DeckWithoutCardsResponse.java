package com.lasmagicas.back.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DeckWithoutCardsResponse {
    Long id;
    String name;
    Long userId;
    String commander;
    String identity;
    Boolean isPublic;

    public DeckWithoutCardsResponse(Long id, String name, Long userId, String commander, String identity, boolean isPublic) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.commander = commander;
        this.identity = identity;
        this.isPublic = isPublic;
    }
}
