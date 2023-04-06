import React from "react";
import '../css/Messenger.css';
import Talk from "talkjs";
import { useEffect, useState, useRef } from "react";
import axios from "axios";



function Messenger (){
  const chatboxEl = useRef();
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

  useEffect( () => {
    Talk.ready.then(() => markTalkLoaded(true));
    const username = localStorage.getItem("userid");
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
      // const currentUser = new Talk.User({
      //   id: '10',
      //   name: 'Will TEST2',
      //   email: 'willtest@example.com',
      //   photoUrl: 'henry.jpeg',
      //   welcomeMessage: 'Hello!',
      //   role: 'default',
      // });

      setTalkCurUser(currentUser);

      const otherUser = new Talk.User({
        id: '2',
        name: 'Jessica Wells',
        email: 'jessicawells@example.com',
        photoUrl: 'jessica.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 'tqVUhZE8',
        me: currentUser,
      });

      // const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      // const conversation = session.getOrCreateConversation(conversationId);
      // conversation.setParticipant(currentUser);
      // conversation.setParticipant(otherUser);

      // const chatbox = session.createChatbox();
      // chatbox.select(conversation);
      // chatbox.mount(chatboxEl.current);
      const inbox = session.createInbox();
      //inbox.onSelectConversation(conversation);
      inbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded && userGot]);

  const newChat = () => {
    // const otherUser = new Talk.User({
    //   id: '2',
    //   name: 'Jessica Wells',
    //   email: 'jessicawells@example.com',
    //   photoUrl: 'jessica.jpeg',
    //   welcomeMessage: 'Hello!',
    //   role: 'default',
    // });
    // const conversationId = Talk.oneOnOneId(talkCurUser, otherUser);
    // const conversation = talkSession.getOrCreateConversation(conversationId);
    // conversation.setParticipant(talkCurUser);
    // conversation.setParticipant(otherUser);

  }

  return (
    <div class="messenger-page">
      <div class="new-chat">
        <button type="button" class="btn btn-secondary" onClick={newChat}>New Chat</button>
      </div>
      <div class="chat" ref={chatboxEl} />
    </div>
  )
} export default Messenger;


{/*https://retool.com/blog/building-a-react-navbar/ */}