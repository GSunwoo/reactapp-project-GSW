import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../config/firestoreConfig';

const PublicContext = createContext();

export const PublicProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const setPubId = () => {
    const saved = localStorage.getItem('pubId');
    if(saved===undefined){
      localStorage.setItem('pubId',3000);
    }
  }
  
  const getPubId = () => {
    return localStorage.getItem('pubId');
  }

  const updatePubId = () => {
    const nowId = Number(localStorage.getItem('pubId'));
    localStorage.removeItem('pubId');
    localStorage.setItem('pubId', nowId+1);
  }

  const getPubPost = async () => {
    const pubPostsArr = [];
    const q = query(
      collection(firestore, 'public_post'),
      orderBy("postTime", "desc")
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let post = doc.data();
      pubPostsArr.push({
        id: post.id,
        writer: post.writer,
        title: post.title,
        contents: post.contents,
        postTime: post.postTime
      });
    });
    setPosts(pubPostsArr);
  }

  useEffect(() => {
    setPubId();
    getPubPost();
  }, []);

  return (
    <PublicContext.Provider value={{posts, setPosts, updatePubId, getPubId}}>
      {children}
    </PublicContext.Provider>
  );
};

export const usePublic = () => useContext(PublicContext);