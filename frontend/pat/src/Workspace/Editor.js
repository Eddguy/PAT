import EditorSandbox from "./EditorSandbox";


const Editor = () => {
    return ( 
        <div className='editor_content' >
            <div className='sandbox_container'>
                <EditorSandbox />
            </div>
            <div className='editor_button_container'>
                <button className="run-button">Run</button>
                <button className="submit-button">Submit</button>
            </div>
            <div className='editor_results'>
                <div className='editor_results_test'>
                    Test 1
                    <div className="editor_results_tests_icon"/>
                </div>
            </div>

        </div>
     );
}
 
export default Editor;