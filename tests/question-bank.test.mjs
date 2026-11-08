import test from 'node:test';
import assert from 'node:assert/strict';
import {quizBank} from '../src/data/questions.ts';

test('all quizzes have valid metadata, four or more questions, and unique ids', () => {
  const allIds = new Set();
  for (const [id, quiz] of Object.entries(quizBank)) {
    assert.ok(id && quiz.title && quiz.description);
    assert.ok(quiz.questions.length >= 4, `${id} should have at least 4 questions`);
    for (const question of quiz.questions) {
      assert.ok(!allIds.has(question.id), `duplicate question id: ${question.id}`);
      allIds.add(question.id);
      assert.ok(question.prompt && question.hint && question.explanation);
      if (question.kind === 'multiple-choice') {
        assert.ok(question.options?.some(option => option.id === question.answer));
      } else {
        assert.equal(typeof question.answer, 'number');
      }
    }
  }
});
