/* eslint-disable no-sequences */
/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { createImage, updateImage } from '../API/imageData';
import { storage } from '../utils/client';
import { useAuth } from '../utils/context/authContext';

export default function ImageEditor() {
  const fileInput = document.querySelector('.file-input');
  const filterOptions = document.querySelectorAll('.filter button');
  const filterName = document.querySelector('.filter-info .name');
  const filterValue = document.querySelector('.filter-info .value');
  const filterSlider = document.querySelector('.slider input');
  const rotateOptions = document.querySelectorAll('.rotate button');
  const previewImg = document.querySelector('.preview-img img');
  const resetFilterBtn = document.querySelector('.reset-filter');
  const [imageUrl, setImageUrl] = useState('');
  const didMount = React.useRef(false);
  const { user } = useAuth();
  const [randomInt, setRandomInt] = useState(0);
  // const chooseImgBtn = document.querySelector('.choose-img');
  // const saveImgBtn = document.querySelector('.save-img');
  function getRandomInt() {
    return setRandomInt(Math.floor(Math.random() * 10000));
  }
  useEffect(() => {
    getRandomInt();
  }, [imageUrl, user.displayName, user.uid]);
  useEffect(() => {
    if (didMount.current) {
      const Payload = {
        image_url: `${imageUrl}`, uid: user.uid, date_added: new Date().toLocaleString(), username: user.displayName, image_title: 'title', category: 'category', description: 'description',
      };
      createImage(Payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateImage(patchPayload);
      });
    } else { didMount.current = true; }
  }, [imageUrl, user.displayName, user.uid]);

  let brightness = '100'; let saturation = '100'; let inversion = '0'; let
    grayscale = '0';
  let rotate = 0; let flipHorizontal = 1; let
    flipVertical = 1;
  const loadImage = () => {
    const file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener('load', () => {
      resetFilterBtn.click();
      document.querySelector('.container').classList.remove('disable');
    });
  };
  const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  };
  filterOptions.forEach((option) => {
    option.addEventListener('click', () => {
      document.querySelector('.active').classList.remove('active');
      option.classList.add('active');
      filterName.innerText = option.innerText;
      if (option.id === 'brightness') {
        filterSlider.max = '200';
        filterSlider.value = brightness;
        filterValue.innerText = `${brightness}%`;
      } else if (option.id === 'saturation') {
        filterSlider.max = '200';
        filterSlider.value = saturation;
        filterValue.innerText = `${saturation}%`;
      } else if (option.id === 'inversion') {
        filterSlider.max = '100';
        filterSlider.value = inversion;
        filterValue.innerText = `${inversion}%`;
      } else {
        filterSlider.max = '100';
        filterSlider.value = grayscale;
        filterValue.innerText = `${grayscale}%`;
      }
    });
  });
  const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector('.filter .active');
    if (selectedFilter.id === 'brightness') {
      brightness = filterSlider.value;
    } else if (selectedFilter.id === 'saturation') {
      saturation = filterSlider.value;
    } else if (selectedFilter.id === 'inversion') {
      inversion = filterSlider.value;
    } else {
      grayscale = filterSlider.value;
    }
    applyFilter();
  };
  rotateOptions.forEach((option) => {
    option.addEventListener('click', () => {
      if (option.id === 'left') {
        rotate -= 90;
      } else if (option.id === 'right') {
        rotate += 90;
      } else if (option.id === 'horizontal') {
        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
      } else {
        flipVertical = flipVertical === 1 ? -1 : 1;
      }
      applyFilter();
    });
  });
  const resetFilter = () => {
    brightness = '100'; saturation = '100'; inversion = '0'; grayscale = '0';
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
  };
  const saveImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
      ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    fetch(link.href)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `${randomInt}`, { type: 'image/jpeg' });
        const uploadTask = async () => storage.ref(`images/${file.name}`).put(file);
        const delayFunction = async () => {
          // eslint-disable-next-line no-unused-vars
          const delayingUploadTask = await uploadTask();
          storage.ref('images').child(file.name).getDownloadURL().then((url) => {
            setImageUrl(url);
          });
        };
        delayFunction();
      });
    link.click();
    console.warn(imageUrl);
  };
  // filterSlider.addEventListener('input', updateFilter);
  // resetFilterBtn.addEventListener('click', resetFilter);
  // saveImgBtn.addEventListener('click', saveImage);
  // fileInput.addEventListener('change', loadImage);
  // chooseImgBtn.addEventListener('click', () => fileInput.click());
  return (
    <div className="container disable">
      <h2>Image Editor</h2>
      <div className="wrapper">
        <div className="editor-panel">
          <div className="filter">
            <label className="title">Filters</label>
            <div className="options">
              <button id="brightness" className="active">Brightness</button>
              <button id="saturation">Saturation</button>
              <button id="inversion">Inversion</button>
              <button id="grayscale">Grayscale</button>
            </div>
            <div className="slider">
              <div className="filter-info">
                <p className="name">Brighteness</p>
                <p className="value">100%</p>
              </div>
              <input type="range" defaultValue="100" min="0" max="200" onChange={updateFilter} />
            </div>
          </div>
          <div className="rotate">
            <label className="title">Rotate & Flip</label>
            <div className="options">
              <button id="left"><i className="fa-solid fa-rotate-left" />flip left</button>
              <button id="right"><i className="fa-solid fa-rotate-right" />flip right</button>
              <button id="horizontal"><i className="bx bx-reflect-vertical" />flip horizontal</button>
              <button id="vertical"><i className="bx bx-reflect-horizontal" />flip vertical</button>
            </div>
          </div>
        </div>
        <div className="preview-img">
          <img src="image-placeholder.svg" alt="preview-img" />
        </div>
      </div>
      <div className="controls">
        <button className="reset-filter" onClick={resetFilter}>Reset Filters</button>
        <div className="row">
          <input type="file" className="file-input" accept="image/*" hidden onChange={loadImage} />
          <button className="choose-img" onClick={() => fileInput.click()}>Choose Image</button>
          <button className="save-img" onClick={saveImage}>Save Image</button>
        </div>
      </div>
    </div>
  );
}
