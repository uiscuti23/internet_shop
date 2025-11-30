import cl from '../../../styles/adminpg/create_ui/create_form_file.module.css';
import closeIcon from '../../../assets/types_page/close.png';
import { useRef } from 'react';

const CreateFormFile = ({ fileInputName, fileData, selectFile, resetFileData }) => {
  const coverRef = useRef();
  const { file, fileName, imgSrc } = fileData;
  return (
    <div
      className={cl.file}
      onClick={e => {
        if (e.target === coverRef.current) e.preventDefault();
      }}>
      <div className={cl.file_cover} ref={coverRef}></div>
      <div className={cl.file_item}>
        <input className={cl.file_input} type='file' name={fileInputName} onChange={selectFile} />
        <div className={cl.file_button}>{file ? 'Re-select' : 'Choose file'}</div>
      </div>
      {imgSrc ? (
        <div className={cl.file_preview}>
          <img src={imgSrc} alt='' />
        </div>
      ) : (
        <span className={cl.status_span}>no file chosen</span>
      )}
      {imgSrc && <div className={cl.file_name}>{fileName}</div>}
      {imgSrc && (
        <div className={cl.clear_file}>
          <div className={cl.clear_file_item} onClick={resetFileData}>
            <img className={cl.clear_file_image} src={closeIcon} alt='close' />
            <span className={cl.clear_file_text}>remove</span>
          </div>
        </div>
      )}
    </div>
  );
};

export { CreateFormFile };
