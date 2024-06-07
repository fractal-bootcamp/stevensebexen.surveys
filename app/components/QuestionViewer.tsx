import { Question } from '@prisma/client';

interface QuestionViewerProps {
  question: Question
}

export function QuestionViewer(props: QuestionViewerProps) {
  const inputId = `question${props.question.index}`;
  return (
    <div>
      <label htmlFor={inputId}>{props.question.description}</label>
      <input id={inputId} name={inputId} placeholder='Enter your answer...' />
    </div>
  )
}