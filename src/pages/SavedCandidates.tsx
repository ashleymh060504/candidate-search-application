import { useState, useEffect } from "react";


const SavedCandidates = () => {

  const [savedCandidates, setSavedCandidates] = useState([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(savedCandidates);
  }, [])

//Work on this function next. Review CandidateSearch.tsx for guidance.
  function rejectCandidate() {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    let rejectedCandidate = savedCandidates.indexOf(savedCandidates);
    savedCandidates.splice(rejectedCandidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    setSavedCandidates(savedCandidates);
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
            savedCandidates.map((candidate, index) => {
              return (
                <tr key={index}>
                  <td><img src={candidate?.avatar_url ? candidate.avatar_url : "https://placehold.co/400"} alt="placeholder" /></td>
                  <td>{candidate.login}</td>
                  <td>{candidate?.location ? candidate.location : "(No location provided)"}</td>
                  <td>{candidate?.email ? candidate.email : "(No email provided)"}</td>
                  <td>{candidate?.company ? candidate.company : "(No company provided)"}</td>
                  <td>{candidate?.bio ? candidate.bio : "(No bio provided)"}</td>
                  <td><button onClick={rejectCandidate}>Reject</button></td>
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


