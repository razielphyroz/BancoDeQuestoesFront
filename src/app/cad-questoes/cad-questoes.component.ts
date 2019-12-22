import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { Question } from '../core/models/question.model';
import { UserService } from '../services/user.service';
import { QuestionStatus } from '../core/enums/question-status';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cad-questoes',
  templateUrl: './cad-questoes.component.html',
  styleUrls: ['./cad-questoes.component.scss']
})
export class CadQuestoesComponent implements OnInit {

  questionForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadCleanForm();
  }

  loadCleanForm() {
    this.questionForm = this.fb.group({
      title: [null, [Validators.required]],
      img_path: [null],
      support: [null, [Validators.required]],
      command: [null, [Validators.required]],
      answer_a: [null, [Validators.required]],
      answer_b: [null, [Validators.required]],
      answer_c: [null, [Validators.required]],
      answer_d: [null, [Validators.required]],
      answer_e: [null, [Validators.required]],
      correct_answer: [null, [Validators.required]]
    });
  }

  get q() {
    return this.questionForm.value;
  }

  submit() {

    if (this.questionForm.invalid) {
      this.toastr.error("Preencha todos os campos!", null, {positionClass: 'toast-bottom-right'})
      return
    }

    const newQuestion: Question = {
      content: {
        title: this.q.title,
        support: this.q.support,
        command: this.q.command,
      },
      answers: {
        a: this.q.answer_a,
        b: this.q.answer_b,
        c: this.q.answer_c,
        d: this.q.answer_d,
        e: this.q.answer_e
      },
      subjectId: this.userService.getUserSubject(),
      authorId: this.userService.getUserId(),
      correctAnswer: this.q.correct_answer,
      status: QuestionStatus.WAITING_VALIDATION
    };

    this.questionService.insertNewQuestion(newQuestion);
    this.loadCleanForm();
  }
}
