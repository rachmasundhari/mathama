import React, {useState} from 'react';
import {quizBank} from '../data/questions';
import {checkNumericAnswer} from '../lib/answerChecker';
import {saveBestScore} from '../hooks/useLessonProgress';

export default function QuizRunner({quizId = 'algebra-basics'}: {quizId?: string}) {
  const quiz = quizBank[quizId];
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string,string>>({});
  const [checked, setChecked] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [finished, setFinished] = useState(false);
  if (!quiz) return <p>Latihan ini belum tersedia.</p>;
  const question = quiz.questions[index];
  const response = responses[question.id] ?? '';
  const isCorrect = question.kind === 'number'
    ? checkNumericAnswer(response, Number(question.answer))
    : response === question.answer;
  // Final score is derived exclusively from checked student answers.
  const score = quiz.questions.reduce((count,q) => {
    const value = responses[q.id] || '';
    const correct = q.kind === 'number' ? checkNumericAnswer(value, Number(q.answer)) : value === q.answer;
    return count + Number(correct);
  }, 0);

  const next = () => {
    if (index === quiz.questions.length - 1) {
      saveBestScore(quizId, score, quiz.questions.length);
      setFinished(true);
      return;
    }
    setIndex(index+1); setChecked(false); setHintVisible(false);
  };
  const restart = () => {setIndex(0);setResponses({});setChecked(false);setHintVisible(false);setFinished(false);};

  if (finished) return <section className="quizCard quizResults" aria-live="polite">
    <span className="eyebrow teal">LATIHAN SELESAI</span>
    <div className="resultMedal">&</div>
    <h3>{score===quiz.questions.length ? 'Hebat, semua benar!' : 'Kamu sudah berlatih. Bagus!'}</h3>
    <div className="resultScore">{score}<span>/{quiz.questions.length}</span></div>
    <p>{score===quiz.questions.length ? 'Kamu menguasai konsep dasar materi ini.' : 'Buka pembahasan pada tiap soal saat mencoba kembali agar makin paham.'}</p>
    <button type="button" className="button primaryButton" onClick={restart}>↻ Ulangi latihan</button>
    <small>Skor terbaik disimpan di browser perangkat ini, bukan di server.</small>
  </section>;

  return <section className="quizCard" aria-label={quiz.title}>
    <div className="quizTop"><div><span className="eyebrow teal">LATIHAN MANDIRI</span><h3>{quiz.title}</h3></div><span className="questionCount">{index+1} / {quiz.questions.length}</span></div>
    <div className="quizProgress" role="progressbar" aria-valuenow={index+1} aria-valuemin={1} aria-valuemax={quiz.questions.length} aria-label="Progres latihan"><span style={{width:`${(index+1)/quiz.questions.length*100}%`}}/></div>
    <div className="questionArea">
      <span className="topicTag">{question.topic}</span>
      <h4>{question.prompt}</h4>
      {question.kind === 'multiple-choice' ? <div className="optionList" role="radiogroup" aria-label="Pilihan jawaban">
        {question.options?.map(option => <label key={option.id} className={`quizOption ${response===option.id?'selected':''} ${checked&&option.id===question.answer?'correctChoice':''}`}>
          <input type="radio" name={`question-${question.id}`} checked={response===option.id} disabled={checked} onChange={() => setResponses(old=>({...old,[question.id]:option.id}))}/>
          <span className="optionLetter">{option.id.toUpperCase()}</span><span>{option.label}</span>
        </label>)}
      </div> : <label className="mathInputLabel">Jawabanmu
        <input className="mathTextInput" type="text" inputMode="decimal" autoComplete="off" aria-label="Jawabanmu" placeholder="Contoh: 11 atau 3/4" disabled={checked} value={response} onChange={e=>setResponses(old=>({...old,[question.id]:e.target.value}))}/>
      </label>}
      {checked && <div className={`feedback ${isCorrect?'feedbackCorrect':'feedbackIncorrect'}`} role="status">
        <strong>{isCorrect ? '✓ Tepat sekali!' : '↗ Belum tepat, yuk pelajari pembahasannya.'}</strong>
        <p>{question.explanation}</p>
      </div>}
      {hintVisible && !checked && <p className="hintBox"><strong>Petunjuk:</strong> {question.hint}</p>}
    </div>
    <div className="quizActions">
      <button type="button" className="textButton" onClick={()=>setHintVisible(v=>!v)} disabled={checked}>{hintVisible?'Tutup petunjuk':'✧ Butuh petunjuk?'}</button>
      {!checked ? <button type="button" className="button primaryButton" disabled={!response.trim()} onClick={()=>setChecked(true)}>Periksa jawaban →</button>
        : <button type="button" className="button primaryButton" onClick={next}>{index === quiz.questions.length-1?'Lihat hasil →':'Soal berikutnya →'}</button>}
    </div>
  </section>;
}
