import { json } from '@remix-run/node';
import { useActionData, useLoaderData, ClientLoaderFunctionArgs } from '@remix-run/react';

import { NavBar } from '~/components/NavBar';
import { QuestionViewer } from '~/components/QuestionViewer';

import { prisma } from '~/prismaClient';

export async function loader({ params }: ClientLoaderFunctionArgs) {
  
  const survey = await prisma.survey.findUnique({
    where: {
      id: parseInt(params.surveyId || "null")
    },
    include: {
      questions: true
    }
  });

  return json(survey);
}

export default function SurveyView() {

  const survey = useLoaderData<typeof loader>();
  
  return (
    <div>
      <NavBar />
      <h1>{survey?.name}</h1>
      {survey?.questions.map(question => <QuestionViewer key={question.id} question={question}/>)}
      <input type="submit" />
    </div>
  )
}