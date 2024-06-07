import { json, ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { useActionData, useLoaderData, redirect } from '@remix-run/react';

import { NavBar } from '~/components/NavBar';
import { QuestionViewer } from '~/components/QuestionViewer';

import { prisma } from '~/prismaClient';

export async function action({ request }: ActionFunctionArgs) {
  
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