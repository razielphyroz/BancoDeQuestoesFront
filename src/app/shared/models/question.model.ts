export interface Question {

  id?: string;
  title: string;
  img_path?: string;
  support: string;
  command: string;
  answers: {
    a: string;
    b: string;
    c: string;
    d: string;
    e: string;
  };
  correct_answer: string;
  author_id: string;
  dificulty_level: string;

}
