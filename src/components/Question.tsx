import { ReactNode } from "react";
import classNames from "classnames";

import "styles/components/question.scss";

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlight?: boolean;
}

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlight = false,
}: QuestionProps) {
  return (
    <div
      className={classNames(
        "question-container",
        {
          answered: isAnswered,
        },
        { highlight: isHighlight && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
