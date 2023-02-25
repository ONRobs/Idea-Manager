import { useState } from "react"

const startNewIdeaValue = {
  idea: "",
  description: "",
  date_created: "",
  rating: 0
}

const startNewTagValue = {
  tag: ""
}

export default function Index() {
  const [newIdeaValue, setNewIdeaValue] = useState(startNewIdeaValue)
  const [newTagValue, setNewTagValue] = useState(startNewTagValue)

  function handleSubmit(event) {
    event.preventDefault()
    const currentDate = new Date().toLocaleDateString(
      "en-CA",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
    const newIdeaWithDate = { ...newIdeaValue, date_created: currentDate };
    setNewIdeaValue(newIdeaWithDate);
    const tags = newTagValue.tag.split(",").map(tag => tag.trim());
    console.log("Form Submit", newIdeaWithDate, tags);
    setNewIdeaValue(startNewIdeaValue);
    setNewTagValue(startNewTagValue)
  }

  function handleTagInputChange(event) {
    const updatedNewTagValue = { ...newTagValue, tag: event.target.value };
    setNewTagValue(updatedNewTagValue);
  }

  return (
    <>
      <div className="block-form">
        {/* Lapas virsraksts */}
        <div className="heading">Write down your <span className="bold-italic">idea:</span></div>
        <form onSubmit={handleSubmit}>
          {/* Idejas ievadlauks */}
          <div className="input-block">
            <input
              name="idea"
              placeholder="Summarize your idea:"
              autoComplete="off"
              value={newIdeaValue.idea}
              onChange={(event) => {
                const updatedNewIdeaValue = { ...newIdeaValue, idea: event.target.value };
                setNewIdeaValue(updatedNewIdeaValue);
              }}
              required
            />
          </div>
          {/* Idejas apraksta ievadlauks */}
          <div className="input-block description">
            <textarea
              name="description"
              placeholder="Describe your idea in detail:"
              style={{ resize: "none" }}
              value={newIdeaValue.description}
              onChange={(event) => {
                const updatedNewIdeaValue = { ...newIdeaValue, description: event.target.value };
                setNewIdeaValue(updatedNewIdeaValue);
              }}
            ></textarea>
          </div>
          <div className="input-block">
            {/* Tags ievadlauks */}
            <input
              name="tags"
              placeholder="Tags: School, Work, Cats, ..."
              autoComplete="off"
              value={newTagValue.tag}
              onChange={handleTagInputChange}
              required
            />
            {/* "Submit" poga */}
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </>
  );
}
