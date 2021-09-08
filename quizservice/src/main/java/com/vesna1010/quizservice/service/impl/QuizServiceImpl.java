package com.vesna1010.quizservice.service.impl;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.vesna1010.quizservice.model.Quiz;
import com.vesna1010.quizservice.repository.QuizRepository;
import com.vesna1010.quizservice.service.QuizService;

@Transactional
@Service
public class QuizServiceImpl implements QuizService {

	@Autowired
	private QuizRepository quizRepository;

	@Override
	public List<Quiz> findAllQuizzes(Sort sort) {
		return quizRepository.findAll(sort);
	}

	@Override
	public Quiz findQuizById(Long id) {
		Optional<Quiz> optional = quizRepository.findById(id);

		return optional.orElseThrow(() -> new RuntimeException("No quiz with id " + id));
	}

	@Override
	public Quiz saveQuiz(Quiz quiz) {
		return quizRepository.save(quiz);
	}

	@Override
	public Quiz updateQuiz(Quiz quiz, Long id) {
		if (!quizRepository.existsById(id)) {
			throw new RuntimeException("No quiz with id " + id);
		}

		return quizRepository.save(quiz);
	}

	@Override
	public void deleteQuizById(Long id) {
		if (!quizRepository.existsById(id)) {
			throw new RuntimeException("No quiz with id " + id);
		}

		quizRepository.deleteById(id);
	}

}