import React, { useState } from 'react';
import { EditorOptions } from 'typescript';
import './styles.css';
import { Artwork, Critique } from '../../store/artwork/types';
import { uploadArtworkToCloud } from '../../store/artwork/actions';
import Card from '../Card/Card';
import Tag from '../Tag/Tag';
import CritiqueComponent from '../CritiqueComponent/CritiqueComponent';

interface Props {
  artwork?: Artwork | null;
}

let host: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  host = `http://${window.location.hostname.concat(':6969')}`;
} else {
  host = 'public-address-for-some-remote-box';
}

const colors = [
  '#5fe382',
  '#3fd9c2',
  '#7589eb',
  '#c55bcf',
  '#a4db81',
  '#e6b04c',
  '#ed9c7b',
];

const EditPopup: React.FC<Props> = (props: Props) => {
  const [title, setTitle] = useState(props.artwork?.title ?? '');
  const [artist, setArtist] = useState(props.artwork?.artist ?? '');
  const [description, setDescription] = useState(
    props.artwork?.description ?? '',
  );
  const [imageURLs, setImageURLS] = useState(props.artwork?.imageURLs ?? ['']);
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState(props.artwork?.tags ?? [['', '']]);
  const [newTag, setNewTag] = useState('');
  const [critiques, setCritiques] = useState(props.artwork?.critiques ?? []);
  // const [newCritique, setNewCritique] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(file); // eslint-disable-line no-console
  };

  return (
    <Card>
      <div className="create-artwork-screen-container">
        <span className="create-artwork-header">Create a New Critique</span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="info-row">
            <input
              className="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="info-row">
            <input
              className="author"
              type="text"
              name="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          {tags.map((tag) => (
            <>
              <Tag
                key={`${tag[0]}${tag[1]}`}
                name={tag[0]}
                backgroundColor={tag[1]}
              />
              <input
                key={`X${tag[0]}${tag[1]}`}
                type="button"
                value="X"
                onClick={() => {
                  setTags(
                    tags
                      .slice(0, tags.indexOf(tag))
                      .concat(tags.slice(tags.indexOf(tag) + 1, tags.length)),
                  );
                }}
              />
            </>
          ))}
          <input
            className="title"
            type="text"
            name="tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <input
            type="button"
            value="+"
            onClick={() => {
              setTags(
                tags.concat([
                  [newTag, colors[Math.floor(Math.random() * colors.length)]],
                ]),
              );
            }}
          />
          <img src={imageURLs[0]} alt="artwork" />
          <input
            type="file"
            name="file"
            onChange={(e) => {
              if (e.target.files) {
                setImageURLS([URL.createObjectURL(e.target.files[0])]);
                setFile(e.target.files[0]);
              }
            }}
          />
          <div className="info-row">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {critiques.map((critique, i) => (
            <>
              <CritiqueComponent
                key={`${critique.title}${critique.critic}`}
                critique={critique}
                setCritique={(crit: Critique) => {
                  const newCritiques = Array.from(critiques);
                  newCritiques[i] = crit;
                  setCritiques(newCritiques);
                }}
              />
              <input
                key={`X${critique.title}${critique.critic}`}
                type="button"
                value="X"
                onClick={() => {
                  setCritiques(
                    critiques
                      .slice(0, critiques.indexOf(critique))
                      .concat(
                        critiques.slice(
                          critiques.indexOf(critique) + 1,
                          critiques.length,
                        ),
                      ),
                  );
                }}
              />
            </>
          ))}
          {/* <input
            className="title"
            type="text"
            name="tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          /> */}
          <input
            type="button"
            value="+"
            onClick={() => {
              setCritiques(
                critiques.concat([
                  {
                    title: '',
                    critic: '',
                    transcript: '',
                    audioURL: '',
                    tags: [['', '']],
                  },
                ]),
              );
            }}
          />

          <input
            type="submit"
            value="Create"
            onClick={(e) => {
              window.location.reload();
              uploadArtworkToCloud(
                host,
                {
                  title,
                  artist,
                  imageURLs,
                  description,
                  tags,
                  critiques,
                },
                file,
              );
            }}
          />
        </form>
      </div>
    </Card>
  );
};

EditPopup.defaultProps = {
  artwork: null,
};

export default EditPopup;
