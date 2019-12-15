import { Injectable } from '@angular/core';
import { Question } from '../core/models/question.model';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { QuestionStatus } from '../core/enums/question-status';
import { TokenService } from './token.service';
import { ToastrService } from 'ngx-toastr';
import { SUBJECTS } from '../core/enums/subjects';
import { DIFICULTY } from '../core/enums/level-dificulty';

@Injectable({
  providedIn: 'root'
})

export class QuestionService {

  token = this.tokenService.getToken();

  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getValidatedQuestions() {
    //return this.http.get<any>(`${environment.URI_API}/questions?page=${offset}`);
    const filteredByStatus = this.filterByStatus(this.myQuestions, QuestionStatus.APPROVED);
    return this.filterBySubject(filteredByStatus, this.userService.getUserSubject());
  }

  getUnvalidatedQuestions() {
    //return this.http.get(`${environment.URI_API}/unvalidatedQuestions`);
    const unvalidatedQuestions = this.filterByStatus(this.myQuestions, QuestionStatus.WAITING_VALIDATION);
    const filteredByAuthorNotMe = this.filterByAuthorNotMe(unvalidatedQuestions);
    return this.filterBySubject(filteredByAuthorNotMe, this.userService.getUserSubject());
  }

  validateQuestion(questionId: string) {
    //this.updateQuestionStatus(questionId, parseInt(QuestionStatus.APPROVED));
    this.updateQuestionStatus(questionId, QuestionStatus.APPROVED);
    this.toastr.success("Questão validada!", null, {positionClass: 'toast-bottom-right'});
  }

  sendForReview(questionId: string, comment: string) {
    //const res = this.http.post<any>(`${environment.URI_API}/sendForReview`, {id: questionId, status: QuestionStatus.WAITING_REVISION});
    this.updateQuestionStatus(questionId, QuestionStatus.WAITING_REVISION);
    this.toastr.success("Enviada para review!", null, {positionClass: 'toast-bottom-right'})
  }

  searchQuestion(search: string) {
    //return this.http.get<any>(`${environment.URI_API}/questions?user=${search}`);
    const validatedQuestions = this.getValidatedQuestions()
    const myQuestionsByKeyWord = this.filterByKeyWord(validatedQuestions, search);
    return this.filterBySubject(myQuestionsByKeyWord, this.userService.getUserSubject());
  }

  insertNewQuestion(question: Question) {
    //const res = this.http.post<any>(`${environment.URI_API}/questions`, question);
    this.myQuestions.push(question);
    this.toastr.success("Questão cadastrada!", null, {positionClass: 'toast-bottom-right'})
  }

  private filterByKeyWord(questions: Question[], words: string) {
    const filtered = questions.filter(question => 
      JSON.stringify(question.content).toLowerCase().includes(words) ||       
      JSON.stringify(question.answers).toLowerCase().includes(words) ? true : false
    );
    return filtered;
  }

  private filterByAuthorNotMe(questions: Question[]) {
    const userId = this.userService.getUserId();
    return questions.filter(question => question.authorId != String(userId));
  }

  private filterByStatus(questions: Question[], status: number) {
    return questions.filter(question => question.status == status);
  }

  private filterBySubject(questions: Question[], subject: number) {
    return questions.filter(question => question.subjectId == subject);      // <------------ Ativar para filtrar questões por matéria.
    //return questions;
  }
  
  private updateQuestionStatus(questionId: string, status: number) {
    //const res = this.http.post<any>(`${environment.URI_API}/questionUpdate`, {id: questionId, status: status});
    this.myQuestions = this.myQuestions.map(question => {
      if (question.id == questionId) {
        question.status = status;
      }
      return question;
    });
  }

  myQuestions: Question[] = [
    {
      id: "325",
      content: {
        title: "(UFOP MG) ",
        support: "O conjunto A possui 20 elementos; o conjunto A U B possui 12 elementos; o conjunto A U B possui 60 elementos.", 
        command: "O número de elementos do conjunto B é:", 
      },
      dificultyLevel: DIFICULTY.FACIL,
      authorId: "834",
      answers: {
        a: "28",
        b: "36",
        c: "40",
        d: "48",
        e: "52"
      },
      subjectId: SUBJECTS.MATEMATICA,
      correctAnswer: "c",
      status: QuestionStatus.APPROVED
    },
    { 
      id: "457",
      content: {
        title: "(FMTM MG) ",
        support: "Em uma amostra de indivíduos, 40% foram afetados pela doença A, 20% foram afetados pela doença B e 5% foram afetados por ambas as doenças. Dos indivíduos da amostra que não foram afetados nem por A nem por B, 2% morreram. ", 
        command: "A porcentagem de indivíduos da amostra que morreram sem terem sido afetados por quaisquer das duas doenças analisadas.", 
      },
      dificultyLevel: DIFICULTY.MEDIA,
      authorId: "931",
      answers: {
        a: "0,7%",
        b: "0,8%.",
        c: "0,9%",
        d: "1,0%.",
        e: "1,1%"
      },
      subjectId: SUBJECTS.MATEMATICA,
      correctAnswer: "a",
      status: QuestionStatus.APPROVED
    },
    { 
      id: "239",
      content: {
        title: "(UFSCar SP)",
        support: "Nas eleições do dia 1 de outubro passado, dos eleitores que compareceram às urnas em uma determinada cidade, 29 % deles votaram, para prefeito, no candidato U, 36 % no candidato V, 25 % no candidato W e os 20 000 eleitores restantes votaram em branco ou anularam seus votos. .", 
        command: "Com base nesses dados, pode-se afirmar que o número de eleitores que votou no candidato V foi:", 
      },
      dificultyLevel: DIFICULTY.MUITO_DIFICIL,
      authorId: "748",
      answers: {
        a: "50.000",
        b: "58.000",
        c: "72.000",
        d: "180.000",
        e: "200.000"
      },
      subjectId: SUBJECTS.MATEMATICA,
      correctAnswer: "d",
      status: QuestionStatus.WAITING_VALIDATION
    },
    { 
      id: "202",
      content: {
        title: "(UFCG PB)",
        support: "Em um grupo de pessoas, 32% tem idade entre 30 e 40 anos, 48% estão entre 41 e 50 anos e os demais 20%, entre 51 e 60 anos. Dos que têm de 30 a 40 anos, 30% praticam exercícios regularmente. Esse número sobe para 40% na faixa dos que estão entre 41 e 50 anos, mas só 22% daqueles que têm entre 51 e 60 anos praticam exercícios regularmente.", 
        command: "Considere, agora, apenas as pessoas desse grupo que têm entre 30 e 50 anos. Nesta faixa etária, as pessoas que fazem exercícios regularmente correspondem a:", 
      },
      dificultyLevel: DIFICULTY.MEDIA,
      authorId: "457",
      answers: {
        a: "27,2%",
        b: "31,2%",
        c: "33%",
        d: "34%",
        e: "36%"
      },
      subjectId: SUBJECTS.MATEMATICA,
      correctAnswer: "b",
      status: QuestionStatus.WAITING_VALIDATION
    },
    {
      id: "674",
      content: {
        title: "(Enem/2018)",
        support: "Corredores ecológicos visam mitigar os efeitos da fragmentação dos ecossistemas promovendo a ligação entre diferentes áreas, com o objetivo de proporcionar o deslocamento de animais, a dispersão de sementes e o aumento da cobertura vegetal. São instituídos com base em informações como estudos sobre o deslocamento de espécies, sua área de vida (área necessária para o suprimento de suas necessidades vitais e reprodutivas) e a distribuição de suas populações.",
        command: "Nessa estratégia, a recuperação da biodiversidade é efetiva porque:", 
      },
      dificultyLevel: DIFICULTY.MEDIA,
      authorId: "149",
      answers: {
        a: "Propicia o fluxo gênico.",
        b: "Intensifica o manejo de espécies.",
        c: "Amplia o processo de ocupação humana.",
        d: "Aumenta o número de indivíduos nas populações.",
        e: "Favorece a formação de ilhas de proteção integral."
      },
      subjectId: SUBJECTS.BIOLOGIA,
      correctAnswer: "a",
      status: QuestionStatus.APPROVED
    },
    {
      id: "356",
      content: {
        title: "(Enem/2017)",
        support: "A polinização, que viabiliza o transporte do grão de pólen de uma planta até o estigma de outra, pode ser realizada biótica ou abioticamente. Nos processos abióticos, as plantas dependem de fatores como o vento e a água.",
        command: "A estratégia evolutiva que resulta em polinização mais eficiente quando esta depende do vento é o(a):", 
      },
      dificultyLevel: DIFICULTY.MEDIA,
      authorId: "451",
      answers: {
        a: "Diminuição do cálice.",
        b: "Alongamento do ovário.",
        c: "Disponibilização do néctar.",
        d: "Intensificação da cor das pétalas.",
        e: "Aumento do número de estames."
      },
      subjectId: SUBJECTS.BIOLOGIA,
      correctAnswer: "a",
      status: QuestionStatus.APPROVED
    }
  ];
}