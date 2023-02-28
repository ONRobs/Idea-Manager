import { useState } from "react";

const idea = {
  idea: "A project management app.",
  description:
    "An app that lets you write down ideas and rate them a couple days after you have written them. It will then take the rating and tags into account and sort them all neatly! :)",
  date_created: "2023-02-21",
  rating: 9,
};

const startNewRatingValue = {
  rating: 0,
};

export default function Rate() {
  const [newRatingValue, setNewRatingValue] = useState(startNewRatingValue);

  function handleSubmit(eventObject) {
    eventObject.preventDefault();
    const updatedIdea = { ...idea, rating: newRatingValue.rating };
    console.log("Form Submit", updatedIdea);
  }

  return (
    <>
      <div className="block-form">
        {/* Lapas virsraksts */}
        <div className="heading">
          Rate a <span className="bold-italic">past idea:</span>
        </div>
        {/* Idejas virsraksts */}
        <div className="heading sub-heading bold-italic">{idea.idea}</div>
        {/* Idejas apraksts */}
        <p className="text">{idea.description}</p>
        <p className="text">{idea.date_created}</p>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            {/* Vērtējuma ievadlauks */}
            <div className="input-block rating">
              <div>Rating:</div>
              <input
                type="text"
                className="rating-input"
                value={newRatingValue.rating}
                onChange={(eventObject) => {
                  const updatedNewRatingValue = {
                    ...newRatingValue,
                    rating: eventObject.target.value,
                  };
                  setNewRatingValue(updatedNewRatingValue);
                }}
              />
              <div>/10</div>
            </div>
            {/* Submit poga */}
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
}
