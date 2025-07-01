import { useState, useEffect, useRef } from "react";
import Display from "./Display";
import Pat from "./Pat";
import Editor from "./Editor";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Workspace = () => {
    useEffect(() => {
        document.title = "PAT - Workspace";
    }, []);

    const [displayHeight, setDisplayHeight] = useState(50);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const isResizing = useRef(false);
    const initialMouseY = useRef(0);
    const initialHeight = useRef(0);

    const handleMouseDown = (e) => {
        isResizing.current = true;
        setIsAnimating(false);
        initialMouseY.current = e.clientY;
        initialHeight.current = displayHeight;
    };

    const handleMouseMove = (e) => {
        if (isResizing.current) {
            const workspaceHeight = window.innerHeight * 0.8;
            const deltaY = e.clientY - initialMouseY.current;
            let newHeight = initialHeight.current + (deltaY / workspaceHeight) * 100;

            const minThreshold = 5;
            const maxThreshold = 95;
            const minHeight = 0;
            const maxHeight = 100;

            if (newHeight < minThreshold) newHeight = minHeight;
            else if (newHeight > maxThreshold) newHeight = maxHeight;

            setDisplayHeight(newHeight);
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
    };

    const toggleHeight = () => {
        setIsAnimating(true);
        setDisplayHeight((prevHeight) =>
            prevHeight === 100 || prevHeight === 0 ? 50 : 100
        );
        setIsExpanded((prev) => !prev);
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

            <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar />

                <div className="workspace_wrapper" style={{ flex: 1 }}>
                    <div className="workspace_glow"></div>
                    <div className="workspace_container">
                        <div className="content_container">
                            <div
                                className={`display_container ${
                                    isAnimating ? "animate-height" : ""
                                }`}
                                style={{ height: `${displayHeight}%` }}
                            >
                                <Display />
                            </div>
                            <div className="slider">
                                <div className="slider_button" onMouseDown={handleMouseDown}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <button className="slider_collapse" onClick={toggleHeight}>
                                    {displayHeight === 100 ? (
                                        <FaPlusCircle
                                            className={`slider_collapse_button ${
                                                isExpanded ? "rotate" : ""
                                            }`}
                                        />
                                    ) : (
                                        <FaMinusCircle
                                            className={`slider_collapse_button ${
                                                isExpanded ? "rotate" : ""
                                            }`}
                                        />
                                    )}
                                </button>
                            </div>
                            <div
                                className={`pat_container ${
                                    isAnimating ? "animate-height" : ""
                                }`}
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
        </div>
    );
};

export default Workspace;
