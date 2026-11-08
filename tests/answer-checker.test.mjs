import test from 'node:test';
import assert from 'node:assert/strict';
import {parseNumericAnswer, checkNumericAnswer} from '../src/lib/answerChecker.ts';

test('supports integers, negative values and decimal comma', () => {
  assert.equal(parseNumericAnswer('17'), 17);
  assert.equal(parseNumericAnswer('−5'), -5);
  assert.equal(parseNumericAnswer('2,5'), 2.5);
  assert.equal(parseNumericAnswer('1.250,5'), 1250.5);
});

test('supports simple fractions and equivalent numeric representations', () => {
  assert.equal(parseNumericAnswer('3/4'), 0.75);
  assert.equal(checkNumericAnswer('0,75', 0.75), true);
  assert.equal(checkNumericAnswer('6/8', 0.75), true);
});

test('rejects expressions, invalid input and zero denominators', () => {
  for (const value of ['', '2+3', 'window.alert(1)', '3/0', '3/4/5', '1,2,3']) {
    assert.equal(parseNumericAnswer(value), null, `should reject ${value}`);
  }
});

test('checks correct versus wrong answer without eval', () => {
  assert.equal(checkNumericAnswer('17', 17), true);
  assert.equal(checkNumericAnswer('16', 17), false);
  assert.equal(checkNumericAnswer(' 2 ', 2), true);
});
