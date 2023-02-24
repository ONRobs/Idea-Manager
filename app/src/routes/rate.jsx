export default function Rate() {
    return (
        <>
        <div className="block-form">
            {/* Lapas virsraksts */}
            <div className="heading">Rate a <span className="bold-italic">past idea:</span></div>
            {/* Idejas virsraksts */}
            <div className="heading sub-heading bold-italic">A project management app.</div>
            {/* Idejas apraksts */}
            <p className="text">An app that lets you write down ideas and rate them a couple days after you have written them. It will then take the rating and tags into account and sort them all neatly! :)</p>
            <form>
                <div className="input-block">
                    {/* Vērtējuma ievadlauks */}
                    <div className="input-block rating">
                        <div>Rating:</div><input type="text" className="rating-input" /><div>/10</div>
                    </div>
                    {/* Submit poga */}
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </div>
        </>
    );
}