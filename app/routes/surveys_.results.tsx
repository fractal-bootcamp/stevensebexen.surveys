import { Survey, Question, SurveyResponse } from '@prisma/client';

import { useLoaderData } from '@remix-run/react';

import { NavBar } from '~/components/NavBar';

import { prisma } from '~/prismaClient';

export async function loader() {
  const surveyData = await prisma.survey.findMany({
    include: {
      questions: {
        include: {
          responses: true
        }
      }
    }
  });

  return surveyData;
}

export default function SurveyResults() {
  const surveyData = useLoaderData<typeof loader>();
  return (
    <>
      <NavBar />
      <div>
        {
          surveyData.map(survey =>
            <>
              <h1 key={survey.id}>{survey.name}</h1>
              {
                survey.questions.map(question =>
                  <>
                    <h2 key={question.id}>{question.description}</h2>
                      {question.responses.map(response =>
                        <>
                          <p key={response.id}>{response.value}</p>
                        </>
                      )}
                  </>
              )}
            </>
        )}
      </div>
    </>
  )
}