import * as Options from './Options';

export function jsonQuestion(Question) {
  return {
    id: Question.id,
    questionnaireId: Question.questionnaireId,
    name: Question.name,
    type: Question.type,
    order: Question.order,
    options: Options.jsonOptions(Question.Options),
  };
}

export function jsonQuestions(Questions) {
  return Questions
    .map(Question => jsonQuestion(Question));
}

