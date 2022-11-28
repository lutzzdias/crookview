import React, { useEffect, useState } from 'react';
import styles from '../styles/UploadAndDisplayImage.module.css';

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const getBlob = async (selectedImage) => {
      const blob = await fetch(selectedImage).then((x) => x.blob());
      return blob;
    };
    getBlob().then((response) => console.log(response));
  });
  return (
    <div className={styles.column}>
      {selectedImage && (
        <div className={styles.column}>
          <img
            className={styles.item}
            alt="Not found"
            width={'250px'}
            src={URL.createObjectURL(selectedImage)}
          />

          <button
            className={styles.item}
            onClick={() => setSelectedImage(null)}
          >
            Remove
          </button>
        </div>
      )}
      <input
        className={styles.item}
        type="file"
        name="image"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;
