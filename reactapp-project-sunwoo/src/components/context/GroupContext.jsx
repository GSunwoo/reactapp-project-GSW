import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../config/firestoreConfig';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);

  const setGrPostId = () => {
    const saved = localStorage.getItem('groupPost');
    if(saved==undefined){
      localStorage.setItem('groupPost', 1500);
    }
  }

  const updateGrPostId = () =>{
    const saved = Number(localStorage.getItem('groupPost'));
    localStorage.removeItem('groupPost');
    localStorage.setItem('groupPost', saved+1);
  } 

  const setIdNum = () => {
    const saved = localStorage.getItem('groupId');
    if(!saved){
      localStorage.setItem('groupId', 1);
    }
  }

  const updateIdNum = () =>{
    const saved = Number(localStorage.getItem('groupId'));
    localStorage.removeItem('groupId');
    localStorage.setItem('groupId', saved+1);
  } 

  const getGroup = async () => {
    const groupsArr = [];
    const q = query(
      collection(firestore, 'groups'),
      orderBy('id','asc')
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let group = doc.data();
      groupsArr.push({
        id: group.id,
        groupName: group.groupName,
        member: group.member,
        comment: group.comment,
        owner: group.owner
      });
    });
    setGroups(groupsArr);
  }

  useEffect(() => {
    getGroup();
    setGrPostId();
    setIdNum();
  }, []);

  return (
    <GroupContext.Provider value={{groups, setGroups, updateIdNum, updateGrPostId, setIdNum}}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);