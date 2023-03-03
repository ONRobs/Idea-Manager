import { useEffect, useState } from "react";
import axios from 'axios';

// rating sākuma vērtība
const startNewRatingValue = {
    rating: 0
}

export default function Rate() {
    const [ideaList, setIdeaList] = useState([])
    const [selectedIdeaIndex, setSelectedIdeaIndex] = useState(0)
    const [newRatingValue, setNewRatingValue] = useState(startNewRatingValue)

    // iegūst datus no servera
    useEffect(() => {
        axios.get('http://localhost:3004/rate?rating=0&sort=date')
            .then(response => {
                setIdeaList(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // atbild par submit pogas nospiešanu
    const updateRating = (eventObject) => {
        eventObject.preventDefault()
        // no servera iegūtais Idea_ID
        const ideaId = ideaList[selectedIdeaIndex].Idea_ID
        // objekts ar no servera iegūtajām un jauno Rating vērtībām
        const updatedIdea = {
          ...ideaList[selectedIdeaIndex],
          Rating: Number(newRatingValue.rating)
        }
        // aizsūta uz serveri atjaunināto Rating vērtību
        axios.put(`http://localhost:3004/rate/${ideaId}/rating`, updatedIdea)
          .then(response => {
            const newIdeaList = [...ideaList]
            newIdeaList.splice(selectedIdeaIndex, 1)
            setIdeaList(newIdeaList)
            setSelectedIdeaIndex(0)
            setNewRatingValue(startNewRatingValue)
          })
          .catch(error => {
            console.log(error)
          })
    }

    return (
        <>
            {ideaList.length === 0 ? (
                <div className="block-form">
                    <div className="heading">There are no <span className="bold-italic">ideas</span> to <span className="bold-italic">rate.</span></div>
                </div>
            ) : (
                <div className="block-form">
                    {/* Lapas virsraksts */}
                    <div className="heading">Rate a <span className="bold-italic">past idea:</span></div>
                    {/* Idejas virsraksts */}
                    <div className="heading sub-heading bold-italic">{ideaList[selectedIdeaIndex]?.Idea}</div>
                    {/* Idejas apraksts */}
                    <p className="text">{ideaList[selectedIdeaIndex]?.Description}</p>
                    <p className="text bold-italic">Tags: {ideaList[selectedIdeaIndex]?.Tags.split(",").map(tag => tag.trim()).join(", ")}</p>
                    <form onSubmit={updateRating}>
                        <div className="input-block">
                            {/* Vērtējuma ievadlauks */}
                            <div className="input-block rating">
                                <div>Rating:</div>
                                <input 
                                    type="number"
                                    min="1"
                                    max="10" 
                                    className="rating-input"
                                    value={newRatingValue.rating}
                                    onChange={(eventObject) => {
                                        const updatedNewRatingValue = {
                                            ...newRatingValue,
                                            rating: eventObject.target.value
                                        }
                                        setNewRatingValue(updatedNewRatingValue)
                                    }}
                                />
                                <div>/10</div>
                            </div>
                            {/* Submit poga */}
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
