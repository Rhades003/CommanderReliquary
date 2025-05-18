package com.lasmagicas.back.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lasmagicas.back.Model.User;
import lombok.Data;
import java.util.Date;
import java.util.List;
import static java.util.stream.Collectors.toList;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private Date createdAt;
    private Date updatedAt;
    private List<DeckResponse> decks;

    public UserResponse(User user){

        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.decks = user.getDecks().stream().map(DeckResponse::new).collect(toList());;
    }
}
