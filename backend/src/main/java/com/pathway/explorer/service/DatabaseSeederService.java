package com.pathway.explorer.service;

import com.pathway.explorer.model.User;
import com.pathway.explorer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class DatabaseSeederService implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.mongodb.seed:true}")
    private boolean autoSeed;

    public DatabaseSeederService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!autoSeed) return;

        // 1. Ensure default Admin user exists
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User(
                "admin",
                "admin@educationpathway.dev",
                passwordEncoder.encode("Admin@12345"),
                "System Administrator",
                Set.of("ROLE_USER", "ROLE_ADMIN")
            );
            userRepository.save(admin);
            System.out.println("  🔑 Seeded Default Administrator: admin / Admin@12345");
        }

        // 2. Ensure default demo user exists
        if (!userRepository.existsByUsername("student")) {
            User demo = new User(
                "student",
                "student@educationpathway.dev",
                passwordEncoder.encode("Student@12345"),
                "Aarav Sharma (PCM Student)",
                Set.of("ROLE_USER")
            );
            userRepository.save(demo);
            System.out.println("  👤 Seeded Demo Student: student / Student@12345");
        }
    }
}
