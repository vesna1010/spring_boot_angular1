package com.vesna1010.quizservice.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import com.vesna1010.quizservice.enums.Answer;
import com.vesna1010.quizservice.enums.Points;
import com.vesna1010.quizservice.model.Question;
import com.vesna1010.quizservice.model.Quiz;
import com.vesna1010.quizservice.repository.QuestionRepository;

public class QuestionServiceTest extends BaseServiceTest {

	@MockBean
	private QuestionRepository questionRepository;
	@Autowired
	private QuestionService questionService;

	@Test
	public void findAllQuestionsByQuizIdTest() {
		when(questionRepository.findAllByQuizId(1L)).thenReturn(Arrays.asList(
				new Question(1L, "Question A", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TEN),
				new Question(2L, "Question B", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
						new Quiz(1L, "Quiz"), Points.TWENTY)));

		List<Question> questionsDB = questionService.findQuestionsByQuizIdAndOfSize(1L, 2);

		assertEquals(2, questionsDB.size());
		verify(questionRepository, times(1)).findAllByQuizId(1L);
	}

	@Test
	public void findAllQuestionsTest() {
		when(questionRepository
				.findAll(PAGEABLE))
						.thenReturn(
								new PageImpl<Question>(
										Arrays.asList(
												new Question(1L, "Question A", "Answer A", "Answer B", "Answer C",
														"Answer D", Answer.A, new Quiz(1L, "Quiz"), Points.TEN),
												new Question(2L, "Question B", "Answer A", "Answer B", "Answer C",
														"Answer D", Answer.A, new Quiz(1L, "Quiz"), Points.TWENTY)),
										PAGEABLE, 5));

		Page<Question> page = questionService.findAllQuestions(PAGEABLE);
		List<Question> questionsDB = page.getContent();

		assertEquals(0, page.getNumber());
		assertEquals(5, page.getSize());
		assertEquals(SORT, page.getSort());
		assertEquals(1, page.getTotalPages());
		assertEquals(2, questionsDB.size());
		verify(questionRepository, times(1)).findAll(PAGEABLE);
	}

	@Test
	public void findQuestionByIdTest() {
		when(questionRepository.findById(1L)).thenReturn(Optional.of(new Question(1L, "Question", "Answer A",
				"Answer B", "Answer C", "Answer D", Answer.A, new Quiz(1L, "Quiz"), Points.TEN)));

		Question questionDB = questionService.findQuestionById(1L);

		assertEquals("Question", questionDB.getText());
		verify(questionRepository, times(1)).findById(1L);
	}

	@Test
	public void findQuestionByIdNotFoundTest() {
		when(questionRepository.findById(1L)).thenReturn(Optional.empty());

		assertThrows(RuntimeException.class, () -> questionService.findQuestionById(1L));
	}

	@Test
	public void saveQuestionTest() {
		Question question = new Question("Question", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz"), Points.TEN);

		when(questionRepository.save(question)).thenReturn(new Question(1L, "Question", "Answer A", "Answer B",
				"Answer C", "Answer D", Answer.A, new Quiz(1L, "Quiz"), Points.TEN));

		Question questionDB = questionService.saveQuestion(question);

		assertEquals(1L, questionDB.getId());
		verify(questionRepository, times(1)).save(question);
	}

	@Test
	public void updateQuestionTest() {
		Question question = new Question(1L, "Question", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz"), Points.TEN);

		when(questionRepository.existsById(1L)).thenReturn(true);
		when(questionRepository.save(question)).thenReturn(question);

		Question questionDB = questionService.updateQuestion(question, 1L);

		assertEquals("Question", questionDB.getText());
		verify(questionRepository, times(1)).existsById(1L);
		verify(questionRepository, times(1)).save(question);
	}

	@Test
	public void updateQuestionNotFoundTest() {
		Question question = new Question(1L, "Question", "Answer A", "Answer B", "Answer C", "Answer D", Answer.A,
				new Quiz(1L, "Quiz"), Points.TEN);

		when(questionRepository.existsById(1L)).thenReturn(false);
		when(questionRepository.save(question)).thenReturn(question);

		assertThrows(RuntimeException.class, () -> questionService.updateQuestion(question, 1L));
	}

	@Test
	public void deleteQuestionByIdTest() {
		when(questionRepository.existsById(1L)).thenReturn(true);
		doNothing().when(questionRepository).deleteById(1L);

		questionService.deleteQuestionById(1L);

		verify(questionRepository, times(1)).existsById(1L);
		verify(questionRepository, times(1)).deleteById(1L);
	}

	@Test
	public void deleteQuestionByIdNotFoundTest() {
		when(questionRepository.existsById(1L)).thenReturn(false);
		doNothing().when(questionRepository).deleteById(1L);

		assertThrows(RuntimeException.class, () -> questionService.deleteQuestionById(1L));
	}

}