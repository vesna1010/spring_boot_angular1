import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizFormComponent } from './component/quiz-form/quiz-form.component';
import { QuestionFormComponent } from './component/question-form/question-form.component';
import { QuestionTableComponent } from './component/question-table/question-table.component';
import { QuizTableComponent } from './component/quiz-table/quiz-table.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { HomeComponent } from './component/home/home.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { ShowQuestionComponent } from './component/show-question/show-question.component';
import { PlayQuizComponent } from './component/play-quiz/play-quiz.component';
import { ToArrayPipe } from './pipe/to-array.pipe';
import { TableStyleDirective } from './directive/table-style.directive';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    QuizFormComponent,
    QuestionFormComponent,
    QuestionTableComponent,
    QuizTableComponent,
    PageNotFoundComponent,
    HomeComponent,
    PaginationComponent,
    ShowQuestionComponent,
    PlayQuizComponent,
    ToArrayPipe,
    TableStyleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
