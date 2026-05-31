import React from "react";

function ResultCard({ result }) {

  return (
    <div className="result">

      <h3>Evaluation Result</h3>

      <p><strong>Marks:</strong> {result.total_marks}</p>

      <p><strong>Similarity Score:</strong> {result.similarity}</p>

    </div>
  );
}

export default ResultCard;


