export interface IQuestion {
  question: string;
  answer: string;
}

export interface IAnswer {
  answer: string;
}

export interface IState {
  item: IQuestion,
  status?: boolean | undefined;
}
