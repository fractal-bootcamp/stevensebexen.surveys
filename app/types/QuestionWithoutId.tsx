import { Question } from '@prisma/client';

export type QuestionWithoutSurveyId = Omit<Question, "id" | "surveyId">;
export type QuestionWithoutId = Omit<Question, "id">;