package com.vesna1010.quizservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vesna1010.quizservice.model.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

}
