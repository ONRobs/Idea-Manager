import { useState } from "react"
import axios from "axios"
import Background from "../assets/Background.svg"

// tukši objekti
const startNewIdeaValue = {
  idea: "",
  description: "",
}

const startNewTagValue = {
  tag: ""
}

export default function Index() {
  const [newIdeaValue, setNewIdeaValue] = useState(startNewIdeaValue)
  const [newTagValue, setNewTagValue] = useState(startNewTagValue)
  
  // atbild par submit pogas nospiešanu
  function handleSubmit(event) {
    event.preventDefault();
    // formatē tags lai izveidotu array
    const tags = newTagValue.tag.split(",").map(tag => tag.trim());
    
    // ieliek ievadītās vērtības objektā
    const data = {
      Idea: newIdeaValue.idea,
      Description: newIdeaValue.description,
      Tag: tags
    };
    
    // nosūta objektu ar ievadītajām vērtībām uz serveri
    axios.post('http://localhost:3004/ideas', data)
      .then(response => console.log(response))
      .catch(error => console.error(error));
    
    // ievadlaukus uztaisa tukšus
    setNewIdeaValue(startNewIdeaValue);
    setNewTagValue(startNewTagValue);
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
              onChange={(event) => {
                const updatedNewTagValue = { ...newTagValue, tag: event.target.value };
                setNewTagValue(updatedNewTagValue);
              }}
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
