import React, { useState } from 'react';
import './styles.css';

const CreateNewArtworkScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(file);
  };

  return (
    <div className="create-artwork-screen-container">
      <span className="create-artwork-header">Create a New Artwork</span>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        <input
          type="file"
          name="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default CreateNewArtworkScreen;
