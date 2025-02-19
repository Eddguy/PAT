import { useState, useEffect, useRef } from "react";
import Display from "./Display";
import Pat from "./Pat";
import Editor from "./Editor";
import Navbar from "./Navbar";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";



const Workspace = () => {
    const [displayHeight, setDisplayHeight] = useState(50);
    const isResizing = useRef(false);

    const handleMouseDown = () => {
        isResizing.current = true;
    };

    const handleMouseMove = (e) => {
        if (isResizing.current) {
            const workspaceHeight = window.innerHeight * 0.8;
            let newHeight = (e.clientY / workspaceHeight) * 100;
    
            // Set snapping thresholds
            const minThreshold = 5; // If below this, snap to minHeight
            const maxThreshold = 95; // If above this, snap to maxHeight
            const minHeight = 0; // Minimum height value
            const maxHeight = 100; // Maximum height value
    
            if (newHeight < minThreshold) {
                newHeight = minHeight; // Snap to min height
            } else if (newHeight > maxThreshold) {
                newHeight = maxHeight; // Snap to max height
            }
    
            setDisplayHeight(newHeight);
        }
    };
    
    const toggleHeight = () => {
        setDisplayHeight((prevHeight) => (prevHeight === 100 ? 50 : 100));
    }

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
        <div >
            <Navbar />
        
        
        <div className="workspace_wrapper">
            <div className="workspace_glow"></div>
            <div className="workspace_container">
                <div className="content_container">
                    <div className="display_container" style={{ height: `${displayHeight}%` }}>
                        <Display />
                    </div>
                    <div className="slider" >
                        <div className="slider_button" onMouseDown={handleMouseDown}>
                            {/**These divs are purely for decoration */}
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <button className="slider_collapse" onClick={toggleHeight}>
                        {displayHeight === 100 ? <FaPlusCircle className="slider_collapse_button" /> : <FaMinusCircle className="slider_collapse_button" />}
                        </button>
                    </div>
                    <div className="pat_container" style={{ height: `${100 - displayHeight}%` }}>
                        <Pat />
                    </div>
                </div>

                <div className="editor_container">
                    <Editor />
                </div>
            </div>
        </div>
        </div>
    );
};

export default Workspace;
