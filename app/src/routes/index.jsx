export default function Index() {
    return (
        <>
            <div className="block-form">
                {/* Lapas virsraksts */}
                <div className="heading">Write down your <span className="bold-italic">daily idea:</span></div> 
                <form>
                    {/* Idejas ievadlauks */}
                    <div className="input-block">
                        <input name="idea" placeholder="Summarize your idea:" autoComplete="off" />
                    </div>
                    {/* Idejas apraksta ievadlauks */}
                    <div className="input-block description">
                        <textarea name="description" placeholder="Describe your idea in detail:" style={{resize: "none"}}></textarea>
                    </div>
                    <div className="input-block">
                        {/* Tags ievadlauks */}
                        <input name="tags" placeholder="Tags:" autoComplete="off" /> 
                        {/* "Submit" poga */}
                        <input type="submit" value="Submit" /> 
                    </div>
                </form>
            </div>
        </>
    );
}