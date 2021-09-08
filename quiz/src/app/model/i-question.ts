import { Answer } from "../enum/answer.enum";
import { Points } from "../enum/points.enum";
import { IQuiz } from "./i-quiz";

export interface IQuestion {

    id: number;
    text: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: Answer;
    points: Points;
    quiz: IQuiz;

}
