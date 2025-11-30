import cl from '../styles/basketpg/basket_page.module.css';
import { observer } from 'mobx-react-lite';
import { NewModal } from '../components/NewModal';
import { useAuth } from '../hook/useAuth';

import React, { useState } from 'react';

const BasketPage = observer(() => {
  const { openPopup, closePopup } = useAuth();

  const [deviceModalIsActive, setDeviceModalIsActive] = useState(false);
  const [brandModalIsActive, setBrandModalIsActive] = useState(false);

  return (
    <div className={cl.basket}>
      <h2>Slice</h2>
      <button style={{ width: 120 }} onClick={() => openPopup(setDeviceModalIsActive)}>
        open popup
      </button>
      <NewModal
        isActive={deviceModalIsActive}
        setIsActive={setDeviceModalIsActive}
        closePopup={closePopup}
        title={'add device'}>
        <div>
          <h3>Device content</h3>
          <button
            style={{ width: 120 }}
            onClick={() =>
              openPopup(setBrandModalIsActive, deviceModalIsActive, setDeviceModalIsActive)
            }>
            open popup
          </button>
        </div>
      </NewModal>
      <NewModal
        isActive={brandModalIsActive}
        setIsActive={setBrandModalIsActive}
        closePopup={closePopup}
        isNested={true}
        setIsParentActiveValue={setDeviceModalIsActive}
        title={'add brand'}>
        brand content
      </NewModal>
    </div>
  );
});

export { BasketPage };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import cl from '../styles/basketpg/basket_page.module.css';

// import React, { useState } from 'react';

// const Block = ({ children }) => {
//   return <div className={cl.block}>{children}</div>;
// };

// const BoxRow = ({ children }) => {
//   return <div className={cl.box__row}>{children}</div>;
// };

// const Box = ({ value, highlighted }) => {
//   if (value) {
//     return (
//       <div className={cl.box}>
//         <BoxSpan value={value} />
//       </div>
//     );
//   }
//   return <div className={cl.box}></div>;
// };

// const BoxSpan = ({ value }) => {
//   return <div className={cl.box__span}>{value}</div>;
// };

// const BasketPage = () => {
//   const [inputValue, setInputValue] = useState('');

//   const crateString = str => Array.from(str);
//   const arr = crateString(inputValue);

//   return (
//     <div className={cl.basket}>
//       <h2>Slice</h2>
//       <input
//         type='text'
//         style={{ width: '40%', marginBottom: 32 }}
//         value={inputValue}
//         onChange={e => setInputValue(e.target.value)}
//       />
//       <Block>
//         <BoxRow>
//           {arr.map((i, ind) => (
//             <Box key={ind} value={i} />
//           ))}
//         </BoxRow>
//       </Block>
//     </div>
//   );
// };

// export { BasketPage };

// CREATE functions
// const resetData = () => {
//   stores.create.setObjName('');
//   resetFileData();
// };
// const resetFileData = e => {
//   if (e) e.preventDefault();
//   stores.create.setFileName('');
//   stores.create.setImgSrc(null);
//   stores.create.setFile(null);
// };

// const setAnimationState = bool => {
//   stores.create.setIsSuccessActive(bool);
//   stores.create.setIsInputDisabled(bool);
// };

// const selectFile = e => {
//   e.preventDefault();
//   const selectedFile = e.target.files[0] ?? null;
//   if (selectedFile) {
//     stores.create.setFileName(selectedFile.name || 'unnamed');
//     stores.create.setImgSrc(URL.createObjectURL(selectedFile));
//     stores.create.setFile(selectedFile);
//   } else {
//     resetData();
//   }
// };

// const addNewElem = async (paramsArr, paramsKeys, createObj, getObj) => {
//   try {
//     stores.create.setIsCheckValue(true);
//     if (paramsArr.map(item => !!item).includes(false) || paramsArr.length !== paramsKeys.length) {
//       return;
//     }
//     stores.create.setIsError(false);
//     const formData = new FormData();
//     paramsKeys.forEach((i, ind) => formData.append(i, paramsArr[ind]));

//     const res = await createObj(formData);
//     if (res) {
//       setAnimationState(true);
//       getObj();
//       await sleep(1800);
//       stores.modal.setIsActive(false);
//       setAnimationState(false);
//       resetData();
//       stores.create.setIsResetBtnShow(false);
//       stores.create.setIsCheckValue(false);
//     } else {
//       stores.create.setIsError(true);
//     }
//   } catch (err) {
//     console.log(err.response.data.message);
//   }
// };

// const setObjNameAndShowResetBtn = e => {
//   stores.create.setObjName(e.target.value);
//   if (e.target.value.length && !stores.create.isResetBtnShow)
//     stores.create.setIsResetBtnShow(true);
// };

// const clearInputAndSetFocus = (e, setName, setIsReset) => {
//   e.preventDefault();
//   setName('');
//   e.target.closest('button').previousElementSibling.focus();
//   setIsReset(false);
// };

// const errorValue = (errMsg, checkVal) => {
//   return stores.create.isCheckValue && !checkVal?.length ? errMsg : '';
// };
