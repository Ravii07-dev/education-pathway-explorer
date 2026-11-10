package com.pathway.explorer.dto;

import java.util.Set;

public record AuthResponse(
    String token,
    String tokenType,
    String userId,
    String username,
    String email,
    String fullName,
    Set<String> roles
) {
    public AuthResponse(String token, String userId, String username, String email, String fullName, Set<String> roles) {
        this(token, "Bearer", userId, username, email, fullName, roles);
    }
}
