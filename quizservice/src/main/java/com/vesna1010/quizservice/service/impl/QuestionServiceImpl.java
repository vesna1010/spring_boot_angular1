package com.vesna1010.quizservice.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.vesna1010.quizservice.model.Question;
import com.vesna1010.quizservice.repository.QuestionRepository;
import com.vesna1010.quizservice.service.QuestionService;

@Transactional
@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepository questionRepository;

	@Override
	public List<Question> findQuestionsByQuizIdAndOfSize(Long id, Integer size) {
		List<Question> questions = questionRepository.findAllByQuizId(id);
		
		Collections.shuffle(questions);

		return questions.subList(0, size);
	}

	@Override
	public Page<Question> findAllQuestions(Pageable pageable) {
		return questionRepository.findAll(pageable);
	}

	@Override
	public Question findQuestionById(Long id) {
		Optional<Question> optional = questionRepository.findById(id);

		return optional.orElseThrow(() -> new RuntimeException("No question with id " + id));
	}

	@Override
	public Question saveQuestion(Question question) {
		return questionRepository.save(question);
	}

	@Override
	public Question updateQuestion(Question question, Long id) {
		if (!questionRepository.existsById(id)) {
			throw new RuntimeException("No question with id " + id);
		}

		return questionRepository.save(question);
	}

	@Override
	public void deleteQuestionById(Long id) {
		if (!questionRepository.existsById(id)) {
			throw new RuntimeException("No question with id " + id);
		}

		questionRepository.deleteById(id);
	}

}