/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  onAdd: (title: string) => Promise<void>,
  todos: Todo[],
  showError: (message: string) => void,
  setTempTodo: (todo: Todo | null) => void,
  onToggleAllTodos: () => void,
};

const USER_ID = 11131;

export const Header: React.FC<Props> = ({
  onAdd,
  todos,
  showError,
  setTempTodo,
  onToggleAllTodos,
}) => {
  const [title, setTitle] = useState('');
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabledInput(true);

    if (!title) {
      showError("Title can't be empty");
      setIsDisabledInput(false);

      return;
    }

    onAdd(title)
      .then(() => {
        setTitle('');
        setIsDisabledInput(false);
        setTempTodo(null);
      });

    setTempTodo({
      title, userId: USER_ID, id: 0, completed: false,
    });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', { active: true })}
          onClick={onToggleAllTodos}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={isDisabledInput}
        />
      </form>
    </header>
  );
};
