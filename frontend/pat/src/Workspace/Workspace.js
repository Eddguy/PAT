import Display from "./Display";
import Pat from "./Pat";
import Editor from "./Editor";


const Workspace = () => {
    return (
        <><div className="workspace_wrapper">
            <div className="workspace_container">
                <div className="display_container" id="container">
                    <Display />
                    <div className="slider"></div>
                    <div className="pat_container">
                        <Pat />
                    </div>
                </div>

                <div className="editor_container" id="container">
                    <Editor />

                </div>

            </div>
            
            <div className="workspace_glow"></div> {/* Div to create glow effect behind workspace */}
        </div></>

     );
}
 
export default Workspace
