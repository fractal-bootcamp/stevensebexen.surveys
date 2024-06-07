import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { NavBar } from '~/components/NavBar';
import { prisma } from '~/prismaClient';

export const loader: LoaderFunction = async () => {
  const allSurveys = await prisma.survey.findMany();
  return json(allSurveys);
}

export default function Surveys() {

  const allSurveys = useLoaderData<typeof loader>();

  return (
    <div>
      <NavBar />
      {allSurveys.map(survey => <p>{survey.name}</p>)}
    </div>
  )
}