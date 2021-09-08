import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { QuizTableComponent } from './component/quiz-table/quiz-table.component';
import { QuestionTableComponent } from './component/question-table/question-table.component';
import { QuizFormComponent } from './component/quiz-form/quiz-form.component';
import { QuestionFormComponent } from './component/question-form/question-form.component';
import { PlayQuizComponent } from './component/play-quiz/play-quiz.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent, data: { title: 'Home' } },
	{ path: 'play', component: PlayQuizComponent, data: { title: 'Play Quiz' } },
	{
		path: 'quizzes',
		children: [
			{ path: '', component: QuizTableComponent, data: { title: 'Quizzes' } },
			{
				path: 'form', data: { title: 'Quiz Form' },
				children: [
					{ path: '', component: QuizFormComponent },
					{ path: ':id', component: QuizFormComponent }
				]
			}]
	},
	{
		path: 'questions', children: [
			{ path: '', component: QuestionTableComponent, data: { title: 'Questions' }, },
			{
				path: 'form', data: { title: 'Question Form' },
				children: [
					{ path: '', component: QuestionFormComponent },
					{ path: ':id', component: QuestionFormComponent }]
			}
		]
	},
	{ path: '**', component: PageNotFoundComponent, data: { title: 'Page Not Found' } }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}