import { useState, useEffect, useRef } from "react";
import Display from "./Display";
import Pat from "./Pat";
import Editor from "./Editor";
import Navbar from "./Navbar";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Workspace = () => {

    useEffect(() => {
        document.title = "PAT - Workspace";
    }, []);


    const [displayHeight, setDisplayHeight] = useState(50);
    const [isExpanded, setIsExpanded] = useState(false); // Tracks if chat is expanded
    const [isAnimating, setIsAnimating] = useState(false); // Controls transition effect

    const isResizing = useRef(false);
    const initialMouseY = useRef(0); // Store the initial mouse position
    const initialHeight = useRef(0); // Store the initial height when dragging starts

    const handleMouseDown = (e) => {
        isResizing.current = true;
        setIsAnimating(false); // Disable animation while dragging

        initialMouseY.current = e.clientY; // Capture initial Y position
        initialHeight.current = displayHeight; // Capture initial height
    };

    const handleMouseMove = (e) => {
        if (isResizing.current) {
            const workspaceHeight = window.innerHeight * 0.8;

            // Calculate the difference from initial mouse position
            const deltaY = e.clientY - initialMouseY.current;

            // Convert to percentage based on workspace height
            let newHeight = initialHeight.current + (deltaY / workspaceHeight) * 100;

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

    const handleMouseUp = () => {
        isResizing.current = false;
    };

    const toggleHeight = () => {
        setIsAnimating(true); // Enable animation only when clicking the button
        setDisplayHeight((prevHeight) => (prevHeight === 100 || prevHeight === 0 ? 50 : 100));
        setIsExpanded((prev) => !prev); // Toggle the button rotation
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
        <div>
            <Navbar />

            <div className="workspace_wrapper">
                <div className="workspace_glow"></div>
                <div className="workspace_container">
                    <div className="content_container">
                        <div
                            className={`display_container ${isAnimating ? "animate-height" : ""}`}
                            style={{ height: `${displayHeight}%` }}
                        >
                            <Display />
                        </div>
                        <div className="slider">
                            <div className="slider_button" onMouseDown={handleMouseDown}>
                                {/** These divs are purely for decoration */}
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <button className="slider_collapse" onClick={toggleHeight}>
                                {displayHeight === 100 ? (
                                    <FaPlusCircle className={`slider_collapse_button ${isExpanded ? "rotate" : ""}`} />
                                ) : (
                                    <FaMinusCircle className={`slider_collapse_button ${isExpanded ? "rotate" : ""}`} />
                                )}
                            </button>
                        </div>
                        <div
                            className={`pat_container ${isAnimating ? "animate-height" : ""}`}
                            style={{ height: `${100 - displayHeight}%` }}
                        >
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
