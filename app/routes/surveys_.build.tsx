import { useEffect, useState } from 'react';
import { ActionFunction, ActionFunctionArgs, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react'

import { NavBar } from '~/components/NavBar';
import { prisma } from '~/prismaClient';

export async function action ({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const newSurvey = await prisma.survey.create({
    data: {
      name: formData.get('name')?.toString() || 'Untitled Survey'
    }
  });
  const responseJson = {
    success: Boolean(newSurvey),
    name: newSurvey.name
  };

  return json(responseJson);
}

export default function SurveysBuild() {

  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const actionData = useActionData<typeof action>();
  
  useEffect(
    () => {
      if(actionData?.success) setShowPopup(true);
    }
    , [actionData]
  )

  useEffect(
    () => {
      if (showPopup) setTimeout(() => setShowPopup(false), 5000);
    }
    , [showPopup])

  return (
    <div>
      <NavBar />
      <Form method="post">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
        <input type="submit" />
      </Form>
      {showPopup && <p>Successfully created survey '{actionData?.name}'</p>}
    </div>
  )
}