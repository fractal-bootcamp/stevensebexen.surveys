import { Question } from '@prisma/client';

export type QuestionIndexedWithoutId = Omit<Question, "id">;  // Passed to prisma.question.create()
export type QuestionLocal = Omit<Question, "id" | "surveyId" | "index" > & { localId: number };  // Locally-created question; no survey or id from DB
export type QuestionWithoutId = Omit<Question, "id" | "index" >;