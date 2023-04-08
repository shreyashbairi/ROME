import React from "react";
import '../css/Messenger.css';
import Talk from "talkjs";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import NewChatPop from "./NewChat";
import { UserContext } from "./UserContext";


function Messenger (){
  const chatboxEl = useRef();
  const {user, setUser} = useContext(UserContext);
  const [talkLoaded, markTalkLoaded] = useState(false);
  const [userGot, markUserGot] = useState(false);
  const [ourCurUser, setOurCurUser] = useState({
    userFullname: String,
    userEmail: String,
    userUserName: String,
    userColor: String,
    userNotification: Boolean
  });
  const [talkCurUser, setTalkCurUser] = useState();
  const [talkSession, setTalkSession] = useState();
  const [newChatPop, setNewChatPop] = useState(false);

  useEffect( () => {
    Talk.ready.then(() => markTalkLoaded(true));
    const username = user.userUserName;
    axios.get(`/getUser/${username}`).then(res=>{
      setOurCurUser(res.data);
      markUserGot(true);
    })
    if (talkLoaded && userGot) {
      const currentUser = new Talk.User({
        id: ourCurUser.userUserName,
        name: ourCurUser.userFullname,
        email:  ourCurUser.userEmail,
        photoUrl: 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });
      setTalkCurUser(currentUser);
      const session = new Talk.Session({
        appId: 'tqVUhZE8',
        me: currentUser,
      });
      setTalkSession(session);
      const inbox = session.createInbox();
      inbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded && userGot]);

  const newChat = (otherUser) => {
    const talkOtherUser = new Talk.User({
      id: otherUser.userUserName,
      name: otherUser.userFullname,
      email:  otherUser.userEmail,
      photoUrl: 'https://isobarscience.com/wp-content/uploads/2020/09/default-profile-picture1.jpg',
      welcomeMessage: 'Hello!',
      role: 'default',
    });
    const newConvoId = Talk.oneOnOneId(talkCurUser, talkOtherUser);
    const newConvo = talkSession.getOrCreateConversation(newConvoId);
    newConvo.setParticipant(talkCurUser);
    newConvo.setParticipant(talkOtherUser);
    const inbox = talkSession.createInbox();
    inbox.select(newConvo);
    inbox.mount(chatboxEl.current);
    alert(otherUser);
  }

  const handleNewChat = () => {
    setNewChatPop(true);
  }

  return (
    <div class="messenger-page">
      <div class="new-chat">
        <Popup trigger={<button type="button" class="btn btn-secondary" onClick={newChat}>New Chat</button>} 
                        open={newChatPop} onOpen={handleNewChat} position="right center" nested modal >
          <div class="card">
              <NewChatPop
                  trigger={newChatPop} 
                  setTrigger={setNewChatPop}
                  newChat={newChat}
              />   
          </div>
        </ Popup>
      </div>
      <div class="chat" ref={chatboxEl} />
    </div>
  )
} export default Messenger;
