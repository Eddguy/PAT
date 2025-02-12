import { ImSpinner11 } from "react-icons/im";
import { FaArrowUp   } from "react-icons/fa";


const Pat = () => {
    return ( 
<div className="pat_container">
    
    <div className="chat_container" >
       {/*TODO:: ADD TEXT THAT SAYS "PAT AI" WITHOUT AFFECTING THE INPUT CONTAINER */}
        <div className="chat_content">
            {/** TODO: CHAT FUNCTION */}
        </div>
        <div className="input_container">
            <div className="regenerate_button">
                <ImSpinner11 className="chat_button" />
            </div>
            <div className="input_main">
                Ask PAT
            </div>
            <div className="send_button">
                <FaArrowUp   className="chat_button"/>
            </div>
        </div>
    </div>
</div>

     );
}
 
export default Pat;