import '../../../css/Chat.css';
import { realtime } from "../../../config/firestoreConfig";
import {ref ,child, set, onValue, push} from 'firebase/database';
import { useRef,useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";

const scrollTop = (chatWindow) => {
  console.log('scrollTop 호출됨');
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function nowDate() {
  const now = new Date();

  const pad = (num) => String(num).padStart(2, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1); // 0-based
  const day = pad(now.getDate());

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());

  return [`${year}년 ${month}월 ${day}일`, `${hours}:${minutes}`];
}

function GroupChat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  const roomName = searchParams.get('roomName');
  const chatWindow = useRef();
  const [chatData, setChatData] = useState('');

  function messageWrite (chatRoom, chatId, chatMessage, date, time) {
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    set(ref(realtime, chatRoom+'/'+newPostKey),{
      id: chatId,
      message: chatMessage,
      date: date,
      time: time
    });
    console.log('입력성공');
  }

  const dbRef = ref(realtime, roomId);
  useEffect(()=>{
    onValue(dbRef,(snapshot)=>{

      setTimeout(() => {
        scrollTop(chatWindow.current);
      }, 100);
      let showDiv = [];
      let prevId = '';
      let prevDate = '';
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        console.log('curr', childData.id);
        console.log('prev', prevId);
        let currId = childData.id;
        let currDate = childData.date;
        if(currDate!==prevDate){
          showDiv.push(<div className='date-bar'>{currDate}</div>)
        }
        if(childData.id===userId){
          showDiv.push(<div style={{'textAlign' : "right"}}>
            <span>{childData.time}</span>
            <div className="myMsg">
            {childData.message}
          </div>
          </div>);
        }
        else{
          if(prevId!==currId){
          showDiv.push(<div>
            <div className="chatName" style={{'textAlign' : "left", 'fontSize' : '0.6em'}}>
              {childData.id}
            </div>
          </div>);
          }
          showDiv.push(<div><div className='yourMsg'>{childData.message}</div><span>{childData.time}</span></div>);
        }
        prevId = childData.id;
        prevDate = currDate;
      });
      setChatData(showDiv);
    });
    scrollTop(chatWindow.current);
  },[]);

  return (<>
    <div className="App">
      <h2>{roomName} 그룹 톡방</h2>
      대화명 : {userId} &nbsp;&nbsp;
      <button id='closeBtn' onClick={()=>{window.self.close();}}>채팅종료</button>
      <div id="chatWindow" ref={chatWindow}>
        {chatData}
      </div>
      <div>
        <form onSubmit={(e)=>{
          e.preventDefault();
          let chatRoom = e.target.chatRoom.value;
          let chatId = e.target.chatId.value;
          if(chatId===''){
            alert('대화명을 입력하세요');
            return;
          }
          let message = e.target.message.value;
          if(message===''){
            alert('메세지를 입력하세요');
            return;
          }
          console.log('submit', chatRoom, chatId, message);
          const [date, time] = nowDate();
          messageWrite(chatRoom, chatId, message, date, time);
          e.target.message.value='';
        }}>
          <input type='hidden' name="chatRoom" value={roomId}/>
          <input type='hidden' name="chatId" value={userId}/>
          <input type="text" name="message"/>
          <button type="submit">전송</button>
        </form>
      </div>
    </div>
  </>); 
}
export default GroupChat;