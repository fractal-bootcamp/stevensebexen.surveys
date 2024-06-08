import { useEffect, useState } from 'react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react'

import { NavBar } from '~/components/NavBar';
import { QuestionBuilder } from '~/components/QuestionBuilder';
import { QuestionIndexedWithoutId, QuestionLocal } from '~/types/Questions';
import { prisma } from '~/prismaClient';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const newSurvey = await prisma.survey.create({
    data: {
      name: formData.get('name')?.toString() || 'Untitled Survey'
    }
  });

  const questions = formData.getAll(`question[]`).map(q => q.toString());

  const questionsToCreate: QuestionIndexedWithoutId[] = [];
  for (const [index, question] of questions.entries()) {
    questionsToCreate.push({
      index,
      description: question.toString(),
      surveyId: newSurvey.id
    });
  }

  const resultCreate = await prisma.question.createMany({
    data: questionsToCreate
  });

  const responseJson = {
    success: Boolean(newSurvey),
    name: newSurvey.name,
    prismaResult: resultCreate
  };

  return json(responseJson);
}

export default function SurveysBuild() {
  const [currentId, setCurrentId] = useState<number>(0);
  const [questions, setQuestions] = useState<Array<QuestionLocal>>([]);
  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const actionData = useActionData<typeof action>();

  useEffect(
    () => {
      if (actionData?.success) setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    },
    [actionData]
  );

  function generateLocalId(): number {
    setCurrentId(currentId + 1);
    return currentId;
  }

  function createQuestion(): void {
    const newQuestion: QuestionLocal = {
      localId: generateLocalId(),
      description: '',
    };
    const newQuestions = questions.slice();
    newQuestions.push(newQuestion);
    setQuestions(newQuestions);
  }

  function deleteQuestion(question: QuestionLocal): void {
    const questionIndex = questions.findIndex(q => q === question);
    const newQuestions: QuestionLocal[] = [...questions.slice(0, questionIndex), ...questions.slice(questionIndex + 1)];
    setQuestions(newQuestions);
  }

  function shiftQuestionOrder(question: QuestionLocal, delta: number): void {
    const newQuestions = questions.slice();
    const qi = questions.findIndex(q => q === question);

    if (qi + delta < 0 || qi + delta >= questions.length) return;

    [newQuestions[qi], newQuestions[qi + delta]] = [newQuestions[qi + delta], newQuestions[qi]];
    setQuestions(newQuestions);
  }

  function updateQuestionDescription(question: QuestionLocal, newDescription: string): void {
    const questionIndex = questions.findIndex(q => q === question);
    const newQuestions: QuestionLocal[] = questions.slice();
    newQuestions[questionIndex].description = newDescription;
    setQuestions(newQuestions);
  }

  return (
    <div>
      <NavBar />
      <Form method="post">
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" />
        </div>
        {questions.map((question, index) => <QuestionBuilder
          key={question.localId}
          question={question}
          callbackDeleteQuestion={() => deleteQuestion(question)}
          callbackShiftQuestionOrder={(delta: number) => shiftQuestionOrder(question, delta)}
          callbackUpdateQuestionDescription = {(newDescription: string) => updateQuestionDescription(question, newDescription)}
        />)}
        <button type="button" onClick={() => createQuestion()}>Add Question</button>
        <input type="submit" />
      </Form>
      {showPopup && <p>Successfully created survey '{actionData?.name}'</p>}
    </div>
  )
}