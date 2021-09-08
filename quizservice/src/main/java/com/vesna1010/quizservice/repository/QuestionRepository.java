package com.vesna1010.quizservice.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.vesna1010.quizservice.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {

	List<Question> findAllByQuizId(Long id);

}