import { Response } from '@prisma/client';
import { useEffect, useState } from 'react';
import { json, ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useActionData, useLoaderData, redirect } from '@remix-run/react';

import { NavBar } from '~/components/NavBar';
import { QuestionViewer } from '~/components/QuestionViewer';

import { prisma } from '~/prismaClient';

type ResponseWithoutId = Omit<Response, "id">

export async function action({ request }: ActionFunctionArgs) {

  const formData = await request.formData();

  const responsesToCreate: ResponseWithoutId[] = [];
  for (const [questionId, response] of formData.entries()) {
    responsesToCreate.push({
      questionId: parseInt(questionId),
      value: response.toString()
    });
  }

  const resultCreate = await prisma.response.createMany({
    data: responsesToCreate
  });

  const responseJson = {
    success: true,
    prismaResult: resultCreate
  }

  return json(responseJson);

}

export async function loader({ params }: LoaderFunctionArgs) {
  
  if (!params.surveyId) throw json({ error: 'Survey not found', status:400 });

  const survey = await prisma.survey.findUnique({
    where: {
      id: parseInt(params.surveyId)
    },
    include: {
      questions: true
    }
  });

  return json(survey);

}

export default function SurveyView() {

  const response = useActionData<typeof action>();
  const survey = useLoaderData<typeof loader>();
  const [showPopup, setShowPopup] = useState<Boolean>(false);

  useEffect(
    () => {
      if (response?.success) setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    },
    [response]
  );
  
  return (
    <div>
      <NavBar />
      <h1>{survey?.name}</h1>
      <Form method="post">
        {survey?.questions.map(question => <QuestionViewer key={question.id} question={question}/>)}
        <input type="submit" />
      </Form>
      {showPopup && <p>Thank you for your response!</p>}
    </div>
  )
}