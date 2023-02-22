import React from "react";
import Todo from "./Todo/Todo";
import '../css/MainPage.css'
import Calendar from "./Calendar";


function MainPage (){

  return (
    <div >
        


        <div class="sidebar">

            <a href="#bar">                        
                <img src="https://www.hyperakt.com/assets/images/fc-barcelona/_1200x1200_crop_center-center_82_line/Barcelona.jpg" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />      
            </a>
            <a href="#real">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />      
            </a>
            <a href="#more">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png" alt="Logo" width="40" height="40" class="rounded mx-auto d-block center" />      

            </a>
        </div>

        <div class="calendar">
            <div class="align-center">
             <Calendar />
            </div>
        </div>

        <div class="todo">
            <p>This will be Todo</p>
        </div>
        

    </div> 

  )

}

export default MainPage;


{/*https://retool.com/blog/building-a-react-navbar/ */}