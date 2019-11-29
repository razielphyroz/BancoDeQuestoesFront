import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cad-questoes',
  templateUrl: './cad-questoes.component.html',
  styleUrls: ['./cad-questoes.component.scss']
})
export class CadQuestoesComponent implements OnInit {

  questionForm = this.fb.group({
    title: [null],
    img_path: [null],
    support: [null],
    command: [null],
    answer_a: [null],
    answer_b: [null],
    answer_c: [null],
    answer_d: [null],
    answer_e: [null],
    correct_answer: [null]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  submit() {
    if (this.questionForm.valid) {
      console.log('Submit(): Form Válido');
    }
  }

}
