package com.pathway.explorer.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "BearerAuth";

        return new OpenAPI()
            .info(new Info()
                .title("Education Pathway Explorer REST API")
                .version("2.0.0")
                .description("Production-grade Spring Boot 3 & MongoDB REST API providing education levels, entrance exams, 21st-century careers, zero-fear switching routes, JWT authentication, and scoped user shortlists.")
                .contact(new Contact()
                    .name("Ravilochan Bhandari (Ravii07-dev)")
                    .email("ravilochanbhandari07@gmail.com")
                    .url("https://github.com/Ravii07-dev/education-pathway-explorer"))
                .license(new License().name("MIT License").url("https://opensource.org/licenses/MIT")))
            .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
            .components(new Components()
                .addSecuritySchemes(securitySchemeName,
                    new SecurityScheme()
                        .name(securitySchemeName)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                        .description("Enter your JWT token obtained from /api/auth/login or /api/auth/signup")));
    }
}
