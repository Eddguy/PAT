import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-pat';
import '../pat.css'


const EditorSandbox = ({ 
    mode = 'python', 
    theme = 'pat', 
    width = '100%', 
    height = '100%', 
    onChange 
}) => {
    return ( 
        <div className="editor_sandbox">
            <AceEditor 
                mode={mode}
                theme={theme}
                fontSize={18}
                width={width}
                height={height}
                onChange={onChange}
                tabSize={4}
                useSoftTabs={true}
                showPrintMargin={false}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                    wrap: true, // Auto-wrap long lines
                }}
                editorProps={{ $blockScrolling: true }}
            />
        </div>
    );
}

export default EditorSandbox;
