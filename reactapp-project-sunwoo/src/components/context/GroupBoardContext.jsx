import { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../config/firestoreConfig';

const GroupBoardContext = createContext();

export const GroupBoardProvider = ({ children }) => {
  const [groupBoard, setGroupBoard] = useState([]);

  const setGrbId = () => {
    const saved = localStorage.getItem('grbId');
    if(saved===undefined){
      localStorage.setItem('grbId',3000);
    }
  }
  
  const getGrbId = () => {
    return localStorage.getItem('grbId');
  }

  const updateGrbId = () => {
    const nowId = Number(localStorage.getItem('grbId'));
    localStorage.removeItem('grbId');
    localStorage.setItem('grbId', nowId+1);
  }

  const getGrbPost = async () => {
    const pubGroupBoardArr = [];
    const q = query(
      collection(firestore, 'group-board'),
      orderBy("postTime", "desc")
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let post = doc.data();
      pubGroupBoardArr.push({
        id: post.id,
        writer: post.writer,
        title: post.title,
        contents: post.contents,
        postTime: post.postTime,
        group: post.group
      });
    });
    setGroupBoard(pubGroupBoardArr);
  }

  const get12 = async() => {
    const snap = await getDoc(doc(firestore, 'posts', id))
    const post = snap.data();

    
  }
  
  useEffect(() => {
    setGrbId();
    getGrbPost();
  }, []);

  return (
    <GroupBoardContext.Provider value={{groupBoard, setGroupBoard, updateGrbId, getGrbId}}>
      {children}
    </GroupBoardContext.Provider>
  );
};

export const useGroupBoard = () => useContext(GroupBoardContext);