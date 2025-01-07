import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  const [candidates, setCandidates] = useState<any[]>([]);

  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    avatar_url: '',
    login: '',
    location: '',
    email: '',
    company: '',
    bio: ''
  });


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
      const data = await searchGithubUser(candidates[0].login);
      console.log(data);
      setCurrentCandidate(data)
    }
    getUser()
  }, [candidates])


  return (
    <div className="main-container">
      <h1>Candidate Search</h1>

      <div className="card">
        <img src={currentCandidate?.avatar_url} alt="placeholder" />
        <h2>{currentCandidate?.login}</h2>
        <p>Location: {currentCandidate?.location ? currentCandidate?.location : "(No location provided)"}</p>
        <p>Email: {currentCandidate?.email ? currentCandidate?.email : "(No email provided)"}</p>
        <p>Company: {currentCandidate?.company ? currentCandidate?.company : "(No company provided)"}</p>
        <p>Bio: {currentCandidate?.bio ? currentCandidate?.bio : "(No bio provided)"}</p>
      </div>

      <div>
        <button>Minus</button>
        <button>Plus</button>
      </div>
    </div>
  )
};

export default CandidateSearch;
