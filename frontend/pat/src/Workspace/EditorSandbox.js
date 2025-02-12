import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const EditorSandbox = ({ 
    mode = 'python', 
    theme = 'monokai', 
    width = '100%', 
    height = '100%', 
    onChange 
}) => {
    return ( 
        <div className="editor_sandbox">
            <AceEditor 
    mode={mode}
    theme={theme}
    width={width}
    height={height}
    onChange={onChange}
    tabSize={4} // Set tab size to 4 spaces
    useSoftTabs={true} // Use spaces instead of tabs
    showPrintMargin={false} // Optionally disable print margin
    setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 4,
        useSoftTabs: true,
        wrap: true, // Auto-wrap long lines
    }}
    editorProps={{ $blockScrolling: true }}
/>

        </div>
    );
}

export default EditorSandbox;
