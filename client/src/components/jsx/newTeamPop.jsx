import React from "react";
import "../css/TeamPop.css";

function TeamPop(props) {
    return(props.trigger) ? (
        <div className="popup">
            <div className="popupinner">
                <button className="close" onClick={()=> props.setTrigger(false)}>
                    close
                </button>
                {props.children}
            </div>
        </div>
    ) : "";

}

export default TeamPop