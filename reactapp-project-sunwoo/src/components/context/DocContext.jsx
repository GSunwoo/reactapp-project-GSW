import { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../config/firestoreConfig';

const DocContext = createContext();

export const DocProvider = ({ children }) => {
  const [docs, setDocs] = useState([]);

  const setDocId = () => {
    const saved = localStorage.getItem('docId');
    if(!saved){
      localStorage.setItem('docId',4500);
    }
  }

  const updateDocId = () => {
    const nowId = Number(localStorage.getItem('docId'));
    localStorage.removeItem('docId');
    localStorage.setItem('docId', nowId+1);
  }

  const getDocPost = async () => {
    const docsArr = [];
    const q = query(
      collection(firestore, 'doc_post'),
      orderBy("postTime", "desc")
    )
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let post = doc.data();
      docsArr.push({
        id: post.id,
        writer: post.writer,
        title: post.title,
        contents: post.contents,
        file: post.file,
        postTime: post.postTime
      });
    });
    setDocs(docsArr);
  }

  useEffect(() => {
    setDocId();
    getDocPost();
  }, []);

  return (
    <DocContext.Provider value={{docs, setDocs, updateDocId, setDocId}}>
      {children}
    </DocContext.Provider>
  );
};

export const useDoc = () => useContext(DocContext);