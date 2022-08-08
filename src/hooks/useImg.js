import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect } from 'react';

const useImg = () => {
  useEffect(() => {
    const storageRef = ref(storage, `images/${image.name}--${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (progress <= 99) {
          setLoading(true);
        }
        if (progress === 100) {
          toast.success('art was uploaded');
        }
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImage(downloadURL);
            console.log('File available at', downloadURL);
            navigate('/gallery');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  });

  return <div></div>;
};

export default useImg;
