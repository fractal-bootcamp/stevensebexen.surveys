import { useEffect, useState } from 'react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react'

import { NavBar } from '~/components/NavBar';
import { QuestionBuilder } from '~/components/QuestionBuilder';
import { QuestionWithoutId, QuestionWithoutSurveyId } from '~/types/QuestionWithoutId';
import { prisma } from '~/prismaClient';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const newSurvey = await prisma.survey.create({
    data: {
      name: formData.get('name')?.toString() || 'Untitled Survey'
    }
  });

  const questions = formData.getAll(`question[]`).map(q => q.toString());

  const questionsToCreate: QuestionWithoutId[] = [];
  for (const [index, question] of questions.entries()) {
    questionsToCreate.push({
      index,
      description: question.toString(),
      surveyId: newSurvey.id
    });
  }

  const newQuestions = await prisma.question.createManyAndReturn({
    data: questionsToCreate
  });

  const responseJson = {
    success: Boolean(newSurvey),
    name: newSurvey.name,
    questions: newQuestions.map(newQuestion => newQuestion.description)
  };

  return json(responseJson);
}

export default function SurveysBuild() {
  const [questions, setQuestions] = useState<Array<QuestionWithoutSurveyId>>([]);
  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const actionData = useActionData<typeof action>();

  useEffect(
    () => {
      if (actionData?.success) setShowPopup(true);
    }
    , [actionData]
  );

  useEffect(
    () => {
      if (showPopup) setTimeout(() => setShowPopup(false), 5000);
    }
    , [showPopup]);

  function createQuestion() {
    const newQuestion: QuestionWithoutSurveyId = {
      index: questions.length,
      description: '',
    };
    const newQuestions = [...questions, newQuestion];
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
        {questions.map(question => <QuestionBuilder key={question.index} question={question} />)}
        <button type="button" onClick={() => createQuestion()}>Add Question</button>
        <input type="submit" />
      </Form>
      {showPopup && <p>Successfully created survey '{actionData?.name}'</p>}
    </div>
  )
}