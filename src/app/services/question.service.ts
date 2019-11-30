import { Injectable } from '@angular/core';
import { Question } from '../shared/models/question.model';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  constructor(
  ) { }

  getQuestionsBySubject(subject: string) {
    return this.myQuestions;
  }

  searchQuestion(search: string) {
    return this.myQuestions[2];
  }

  insertNewQuestion(question: Question) {
    this.myQuestions.push(question);
  }

  updateQuestion(question: Question) {
    for (let q of this.myQuestions) {
      if (q.id == question.id) {
        q = question;
      }
    }
  }

  answers = {
    "a": "Alternativa a",
    "b": "Alternativa b",
    "c": "Alternativa c",
    "d": "Alternativa d",
    "e": "Alternativa f"
  }

  myQuestions: Question[] = [
    { "id": "1", 
      "title": "Questão 1",
      "support": "Suporte questão 1", 
      "command": "Comando questão 1", 
      "author_id": "Id autor 1",
      "dificulty_level": "Dificuldade questão 1",
      "answers": this.answers,
      "correct_answer": "e", 
    },
    { "id": "2", 
      "title": "Questão 2",
      "support": "Suporte questão 2", 
      "command": "Comando questão 2", 
      "author_id": "Id autor 2",
      "dificulty_level": "Dificuldade questão 2",
      "answers": this.answers,
      "correct_answer": "a", 
    },
    { "id": "3", 
      "title": "Questão 3",
      "support": "Suporte questão 3", 
      "command": "Comando questão 3", 
      "author_id": "Id autor 3",
      "dificulty_level": "Dificuldade questão 3",
      "answers": this.answers,
      "correct_answer": "c", 
    },
    { "id": "1", 
      "title": "Questão 4",
      "support": "Suporte questão 4", 
      "command": "Comando questão 4", 
      "author_id": "Id autor 4",
      "dificulty_level": "Dificuldade questão 4",
      "answers": this.answers,
      "correct_answer": "b", 
    },
    { "id": "5", 
      "title": "Questão 5",
      "support": "Suporte questão 5", 
      "command": "Comando questão 5", 
      "author_id": "Id autor 5",
      "dificulty_level": "Dificuldade questão 5",
      "answers": this.answers,
      "correct_answer": "d", 
    },
  ];
}
