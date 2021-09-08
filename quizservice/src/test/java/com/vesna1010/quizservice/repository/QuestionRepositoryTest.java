package com.vesna1010.quizservice.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import com.vesna1010.quizservice.enums.Answer;
import com.vesna1010.quizservice.enums.Points;
import com.vesna1010.quizservice.model.Question;
import com.vesna1010.quizservice.model.Quiz;

public class QuestionRepositoryTest extends BaseRepositoryTest {

	@Autowired
	private QuestionRepository questionRepository;

	@Test
	public void findQuestionsByQuizIdTest() {
		List<Question> questionsDB = questionRepository.findAllByQuizId(1L);

		assertEquals(5, questionsDB.size());
	}

	@Test
	public void findAllQuestionsTest() {
		Page<Question> page = questionRepository.findAll(PAGEABLE);

		assertEquals(5, page.getNumberOfElements());
		assertEquals(2, page.getTotalPages());
	}

	@Test
	public void findQuestionByIdTest() {
		Optional<Question> optional = questionRepository.findById(1L);
		Question questionDB = optional.get();

		assertEquals("Question A", questionDB.getText());
	}

	@Test
	public void findQuestionByIdNotFoundTest() {
		Optional<Question> optional = questionRepository.findById(8L);

		assertThrows(NoSuchElementException.class, () -> optional.get());
	}

	@Test
	public void saveQuestionTest() {
		Question question = new Question("Question E", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz A"), Points.TEN);

		Question questionDB = questionRepository.save(question);

		assertNotNull(questionDB.getId());
	}

	@Test
	public void deleteQuestionByIdTest() {
		questionRepository.deleteById(1L);

		assertFalse(questionRepository.existsById(1L));
	}
}