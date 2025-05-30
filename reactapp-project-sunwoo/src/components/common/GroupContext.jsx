import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firestoreConfig';
import Cookies from 'js-cookie';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [nextId, setNextId] = useState(1);

  const setIdNum = () => {
    const nowId = Number(localStorage.getItem('groupId'));
    if(!isNaN(nowId)){
      setNextId(nowId+1);
    }
  }

  const updateIdNum = () => {
    const nowId = Number(localStorage.getItem('groupId'));
    localStorage.removeItem('groupId');
    localStorage.setItem('groupId', nowId+1);
  }

  const getGroup = async () => {
    const groupsArr = [];
    const querySnapshot = await getDocs(collection(firestore, 'groups'));
    querySnapshot.forEach((doc) => {
      let group = doc.data();
      groupsArr.push({
        id: group.id,
        groupName: group.groupName,
        member: group.member,
        comment: group.comment
      });
    });
    setGroups(groupsArr);
  }

  useEffect(() => {
    getGroup();
  }, []);

  return (
    <GroupContext.Provider value={{groups, setGroups, nextId, setIdNum, updateIdNum}}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);