import React, {type ReactNode} from 'react';
import {CircleQuestionMark} from 'lucide-react';

type CardSlotProps = {children?: ReactNode};
type CardSlotType = {slot?: 'question' | 'answer'};

const Question = Object.assign(
  function ThinkCardQuestion({children}: CardSlotProps) {
    return <>{children}</>;
  },
  {slot: 'question' as const},
);

const Answer = Object.assign(
  function ThinkCardAnswer({children}: CardSlotProps) {
    return <>{children}</>;
  },
  {slot: 'answer' as const},
);

type ThinkCardProps = {
  label?: string;
  children?: ReactNode;
};

const isDev = process.env.NODE_ENV !== 'production';

function ThinkCard({label = 'Coba pikirkan', children}: ThinkCardProps) {
  let question: ReactNode = null;
  let answer: ReactNode = null;
  let questionCount = 0;
  let answerCount = 0;
  const strays: string[] = [];

  React.Children.forEach(children, visit);

  function visit(child: ReactNode) {
    if (typeof child === 'string') {
      if (child.trim() !== '') strays.push(`text "${child.trim().slice(0, 40)}"`);
      return;
    }
    if (!React.isValidElement(child)) return;
    if (child.type === React.Fragment) {
      React.Children.forEach((child.props as CardSlotProps).children, visit);
      return;
    }
    if (typeof child.type === 'string') {
      strays.push(`<${child.type}>`);
      return;
    }
    const slot = (child.type as CardSlotType).slot;
    if (slot === 'question') {
      questionCount += 1;
      question = (child.props as CardSlotProps).children;
      return;
    }
    if (slot === 'answer') {
      answerCount += 1;
      answer = (child.props as CardSlotProps).children;
      return;
    }
    const type = child.type as {displayName?: string; name?: string};
    strays.push(`<${type.displayName ?? type.name ?? 'unknown'}>`);
  }

  if (isDev) {
    if (strays.length > 0) {
      console.warn(
        `[ThinkCard "${label}"] children outside the Question/Answer slots are not rendered: ${strays.join(', ')}`,
      );
    }
    if (questionCount === 0) {
      console.warn(`[ThinkCard "${label}"] is missing a <ThinkCard.Question> slot.`);
    }
    if (questionCount > 1) {
      console.warn(
        `[ThinkCard "${label}"] has ${questionCount} Question slots; only the last one renders.`,
      );
    }
    if (answerCount === 0) {
      console.warn(
        `[ThinkCard "${label}"] is missing a <ThinkCard.Answer> slot, so it has no answer to reveal.`,
      );
    }
    if (answerCount > 1) {
      console.warn(
        `[ThinkCard "${label}"] has ${answerCount} Answer slots; only the last one renders.`,
      );
    }
  }

  return (
    <details className="thinkCard" data-no-answer={answer == null ? '' : undefined}>
      <summary>
        <span className="thinkCardLabel">
          <CircleQuestionMark size={12} aria-hidden="true" /> {label}
        </span>
        {question}
      </summary>
      {answer != null ? <div className="thinkCardBody">{answer}</div> : null}
    </details>
  );
}

ThinkCard.Question = Question;
ThinkCard.Answer = Answer;

export default ThinkCard;
