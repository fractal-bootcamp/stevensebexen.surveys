import { LoaderFunction, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { NavBar } from '~/components/NavBar';
import { prisma } from '~/prismaClient';

export async function loader () {
  const allSurveys = await prisma.survey.findMany({
    select: {
      name: true,
      id: true
    }
  });
  return json(allSurveys);
}

export default function Surveys() {

  const allSurveys = useLoaderData<typeof loader>();

  return (
    <div>
      <NavBar />
      {allSurveys.map(survey => <Link key={survey.id} to={`/surveys/${survey.id}`}>{survey.name}</Link>)}
    </div>
  )
}