package com.vesna1010.quizservice.service;

import java.util.List;
import org.springframework.data.domain.Sort;
import com.vesna1010.quizservice.model.Quiz;

public interface QuizService {

	List<Quiz> findAllQuizzes(Sort sort);

	Quiz findQuizById(Long id);

	Quiz saveQuiz(Quiz quiz);

	Quiz updateQuiz(Quiz quiz, Long id);

	void deleteQuizById(Long id);

}