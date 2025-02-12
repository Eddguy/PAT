import EditorSandbox from "./EditorSandbox";


const Editor = () => {
    return ( 
        <div className='editor_content' >
            <div className='sandbox_container'>
                <EditorSandbox />
            </div>
            <div className='editor_button_container'>

            </div>
            <div className='editor_results'>

            </div>

        </div>
     );
}
 
export default Editor;