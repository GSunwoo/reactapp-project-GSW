import '../../../css/Chat.css';
import { realtime, storage } from "../../../config/firestoreConfig";
import { ref as r_ref, child, set, onValue, push } from 'firebase/database';
import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const scrollTop = (chatWindow) => {
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

const isImage = (file) => {
  let ext = file.slice(file.lastIndexOf('.') + 1).toLowerCase();
  const imageExt = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "tiff", "tif",
    "ico", "heic", "heif", "dds", "apng", "raw", "cr2", "nef", "arw", "exr"];
  for (let i = 0; i < imageExt.length; i++) {
    if (ext === imageExt[i]) return true;
  }
  return false;
}

function GroupChat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  const roomName = searchParams.get('roomName');
  const chatWindow = useRef();
  const [chatData, setChatData] = useState('');

  const imageRef = roomId;
  const [fileSelected, setFileSelcted] = useState(false);
  const [nowFile, setNowFile] = useState(null);
  const [nowFileName, setNowFileName] = useState(null);
  const [nowFileURL, setNowFileURL] = useState(null);

  const [imageUrls, setImageUrls] = useState({});

  function messageWrite(chatRoom, chatId, chatMessage, date, time, file) {
    const newPostKey = push(child(r_ref(realtime), 'tempValue')).key;
    if (file) {
      set(r_ref(realtime, chatRoom + '/' + newPostKey), {
        id: chatId,
        message: chatMessage,
        date: date,
        time: time,
        file: file
      });
    }
    else {
      set(r_ref(realtime, chatRoom + '/' + newPostKey), {
        id: chatId,
        message: chatMessage,
        date: date,
        time: time,
      });
    }
    console.log('입력성공');
  }


  const dbRef = r_ref(realtime, roomId);
  
  useEffect(() => {
    const unsubscribe = onValue(dbRef, async (snapshot) => {
      let showDiv = [];
      let prevId = '';
      let prevDate = '';
      const tempImageUrls = { ...imageUrls }; // 기존 이미지들 유지
      const fetchPromises = [];

      const messages = [];

      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        messages.push({ key: childSnapshot.key, ...childData });

        if (childData.file && !tempImageUrls[childData.file]) {
          const promise = getDownloadURL(ref(storage, childData.file))
            .then((url) => {
              tempImageUrls[childData.file] = url;
            })
            .catch((err) => {
              console.error('이미지 불러오기 실패:', err);
            });

          fetchPromises.push(promise);
        }
      });

      // 모든 이미지 URL을 비동기로 먼저 받아옴
      await Promise.all(fetchPromises);
      setImageUrls(tempImageUrls); // 한 번만 setState

      // 렌더링
      messages.forEach((msg) => {
        const currDate = msg.date;
        const currId = msg.id;
        const fileUrl = msg.file ? tempImageUrls[msg.file] : null;

        if (currDate !== prevDate) {
          showDiv.push(<div className='date-bar' key={'date-' + currDate}>{currDate}</div>);
        }

        const imgTag = fileUrl ? (
          <div><img src={fileUrl} style={{ maxWidth: '150px', maxHeight: '220px' }} alt="uploaded" /></div>
        ) : null;

        if (currId === userId) {
          showDiv.push(
            <div key={msg.key} style={{ textAlign: "right" }}>
              <span>{msg.time}</span>
              <div className="myMsg">
                {imgTag}
                {msg.message}
              </div>
            </div>
          );
        } else {
          if (prevId !== currId) {
            showDiv.push(
              <div key={'name-' + currId}>
                <div className="chatName" style={{ textAlign: 'left', fontSize: '0.8em', fontWeight: 'bold' }}>
                  {currId}
                </div>
              </div>
            );
          }
          showDiv.push(
            <div key={msg.key + '-msg'}>
              <div className="yourMsg">
                {imgTag}
                {msg.message}
              </div>
              <span>{msg.time}</span>
            </div>
          );
        }

        prevId = currId;
        prevDate = currDate;
      });

      setChatData(showDiv);
    });

    return () => unsubscribe(); // 클린업
  }, [dbRef, userId]);

  useEffect(() => {
    const fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setNowFileURL(imageUrl);
      }
    });
  }, [fileSelected])

  return (<>
    <div className="chat">
      <h2>{roomName} 그룹 톡방</h2>
      대화명 : {userId} &nbsp;&nbsp;
      <button id='closeBtn' onClick={() => { window.self.close(); }}>채팅종료</button>
      <div id="chatWindow" ref={chatWindow}>
        {chatData}
      </div>
      <div>
        <form onSubmit={async (e) => {
          e.preventDefault();
          let chatRoom = e.target.chatRoom.value;
          let chatId = e.target.chatId.value;
          if (chatId === '') {
            alert('대화명을 입력하세요');
            return;
          }
          let message = e.target.message.value;
          let fileURL;
          if (nowFileName) {
            fileURL = imageRef + '/' + nowFileName;
          }
          if (fileSelected) {
            const fileRef = ref(storage, fileURL)
            await uploadBytes(fileRef, nowFile);
          }
          else {
            if (message === '') {
              alert('메세지를 입력하세요');
              return;
            }
          }

          const [date, time] = nowDate();
          messageWrite(chatRoom, chatId, message, date, time, fileURL);
          e.target.message.value = '';
          e.target.fileInput.value = '';
          setFileSelcted(false);

          setTimeout(() => {
            scrollTop(chatWindow.current);
          }, 100);
        }}>
          <input type='hidden' name="chatRoom" value={roomId} />
          <input type='hidden' name="chatId" value={userId} />
          <input type="file" id='fileInput' hidden onChange={(e) => {
            if (!isImage(document.getElementById('fileInput').files[0].name)) {
              alert('이미지만 가능');
              document.getElementById('fileInput').value = '';
              return;
            }
            setNowFile(document.getElementById('fileInput').files[0]);
            setNowFileName(document.getElementById('fileInput').files[0].name);
            setFileSelcted(true);
          }} />
          <input type="text" name="message" id='msg' />
          <button type="submit" className='sub-btn'>전송</button>
          {fileSelected ?
            <><img src={nowFileURL} style={{ maxWidth: '250px', maxHeight: '250px' }} /><button type='button' className='sub-btn' onClick={() => {
              setFileSelcted(false);
              setNowFile(null);
              setNowFileName(null);
            }}>취소</button></> : <></>
          }
          <label htmlFor="fileInput" className='btn'>파일첨부</label>
        </form>
      </div>
    </div>
  </>);
}
export default GroupChat;