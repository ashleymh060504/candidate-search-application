import { useState, useEffect } from "react";
import Candidate from "../interfaces/Candidate.interface";


const SavedCandidates = () => {

  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);


  function rejectCandidate(login: string) {
    setSavedCandidates(savedCandidates.filter((candidate: Candidate) => candidate.login !== login));
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates.filter((candidate: Candidate) => candidate.login !== login)));
  }

  return (
    <>
      <h1>Potential Candidates</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {
            savedCandidates.map((candidate) => {
              return (
                <tr key={candidate.login}>
                  <td><img src={candidate?.avatar_url ? candidate.avatar_url : "https://placehold.co/400"} alt="placeholder" /></td>
                  <td>{candidate.login}</td>
                  <td>{candidate?.location ? candidate.location : "(No location provided)"}</td>
                  <td>{candidate?.email ? candidate.email : "(No email provided)"}</td>
                  <td>{candidate?.company ? candidate.company : "(No company provided)"}</td>
                  <td>{candidate?.bio ? candidate.bio : "(No bio provided)"}</td>
                  <td><button onClick={() => rejectCandidate(candidate.login)}>Reject</button></td>
                </tr>
              )
            })
          }

        </tbody>
      </table>


    

    </>
  );
};

export default SavedCandidates;


