import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firestoreConfig';

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([false]);

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
    <GroupContext.Provider value={{ groups, setGroups}}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);