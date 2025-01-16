import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    avatar_url: '',
    login: '',
    location: '',
    email: '',
    company: '',
    bio: ''
  });

  // const currentNumber = 0;
  const [currentNumber, setCurrentNumber] = useState<number>(0);

  const [message, setMessage] = useState('');

  useEffect(() => {
    async function getUsers() {
      const data = await searchGithub();
      console.log(data);
      setCandidates(data)
    }
    getUsers()
  }, [])

  useEffect(() => {
    async function getUser() {
      const data = await searchGithubUser(candidates[currentNumber].login);
      console.log(data);
      setCurrentCandidate(data)
    }
    getUser()
  }, [candidates, currentNumber])

  const nextCandidate = () => {
    if (currentNumber === candidates.length - 1) {
      setMessage('You have reached the last candidate.');
    } else {
      setMessage(''); 
      setCurrentNumber(currentNumber + 1);
    }
  }

  const saveCandidate = () => {
    console.log('save candidate')

    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]' );

    savedCandidates.push(currentCandidate);

    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates))

    nextCandidate();
  }

  return (
    <div className="main-container">
      <h1>Candidate Search</h1>

      <div className="card">
        <img src={currentCandidate?.avatar_url ? currentCandidate.avatar_url : "https://placehold.co/400"} alt="placeholder" />
        <h2>{currentCandidate?.login}</h2>
        <p>Location: {currentCandidate?.location ? currentCandidate?.location : "(No location provided)"}</p>
        <p>Email: {currentCandidate?.email ? currentCandidate?.email : "(No email provided)"}</p>
        <p>Company: {currentCandidate?.company ? currentCandidate?.company : "(No company provided)"}</p>
        <p>Bio: {currentCandidate?.bio ? currentCandidate?.bio : "(No bio provided)"}</p>
      </div>

      <div>
        <button onClick={nextCandidate}>-</button>
        <button onClick={saveCandidate}>+</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
};

export default CandidateSearch;
