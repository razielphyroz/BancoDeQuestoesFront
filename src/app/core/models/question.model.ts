export interface Question {

  id?: string;
  content: {
    title: string;
    support: string;
    command: string;
  },
  answers: {
    a: string;
    b: string;
    c: string;
    d: string;
    e: string;
  };
  subjectId: number;
  correctAnswer: string;
  authorId?: string;
  dificultyLevel?: number;
  status?: number;
}
