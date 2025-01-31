import { useState, useEffect, useRef } from "react";
import Display from "./Display";
import Pat from "./Pat";
import Editor from "./Editor";

const Workspace = () => {
    const [displayHeight, setDisplayHeight] = useState(50);
    const isResizing = useRef(false);

    const handleMouseDown = () => {
        isResizing.current = true;
    };

    const handleMouseMove = (e) => {
        if (isResizing.current) {
            const workspaceHeight = window.innerHeight * 0.8;
            const newHeight = (e.clientY / workspaceHeight) * 100;

            if (newHeight >= 0 && newHeight <= 100) {
                setDisplayHeight(newHeight);
            }
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <div className="workspace_wrapper">
            <div className="workspace_glow"></div>
            <div className="workspace_container">
                <div className="content_container">
                    <div className="display_container" style={{ height: `${displayHeight}%` }}>
                        <Display />
                    </div>
                    <div className="slider" onMouseDown={handleMouseDown}></div>
                    <div className="pat_container" style={{ height: `${100 - displayHeight}%` }}>
                        <Pat />
                    </div>
                </div>

                <div className="editor_container">
                    <Editor />
                </div>
            </div>
        </div>
    );
};

export default Workspace;
