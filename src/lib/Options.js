
export function jsonOption(Option) {
  return {
    id: Option.id,
    questionId: Option.questionId,
    name: Option.name,
    order: Option.order,
  };
}

export function jsonOptions(Options) {
  return Options
    .map(Option => jsonOption(Option));
}
