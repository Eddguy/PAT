import Display from "./Display";
import Pat from "./Pat";
import Editor from "./Editor";


const Workspace = () => {
    return (
        <div class="workspace_container" >
            <div class="pat_container" id="container">
                <Display />
                <Pat />
            </div>

            <div class="editor_container" id="container">
                <Editor />

            </div>

        </div> 
        

     );
}
 
export default Workspace
