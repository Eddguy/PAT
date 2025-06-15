import EditorSandbox from "./EditorSandbox";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";




const Editor = () => {
    return ( 
        <div className='editor_content' >
            <div className='sandbox_container'>
                <EditorSandbox />
            </div>
            <div className='editor_button_container' id="unselect">
                <button className="run-button">Run</button>
                <button className="submit-button">Submit</button>
            </div>
            <div className='editor_results' id="unselect">
                <div className='editor_results_test'>
                    Test 1
                    <div className="editor_results_tests_icon">
                        {/*<FaCheck fill="lime"/>*/}
                        <RxCross1 color="red"/>
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default Editor;