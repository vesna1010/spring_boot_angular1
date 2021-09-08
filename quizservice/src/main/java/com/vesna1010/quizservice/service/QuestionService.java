package com.vesna1010.quizservice.service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.vesna1010.quizservice.model.Question;

public interface QuestionService {

	List<Question> findQuestionsByQuizIdAndOfSize(Long id, Integer size);

	Page<Question> findAllQuestions(Pageable pageable);

	Question findQuestionById(Long id);

	Question saveQuestion(Question question);

	Question updateQuestion(Question question, Long id);

	void deleteQuestionById(Long id);

}