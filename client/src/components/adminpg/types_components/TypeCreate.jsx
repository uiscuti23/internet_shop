import cl from '../../../styles/adminpg/types/types_create.module.css';
import { useEffect, useState } from 'react';
import { CtaButton } from '../../UI/buttons/CtaButton';
import { Success } from '../../animation/Success';
import { createType } from '../../../http/TypeApi';
import { useAuth } from '../../../hook/useAuth';
import { observer } from 'mobx-react-lite';
import { CreateFormInputItem } from '../create_components/CreateFormInputItem';
import { CreateFormFileItem } from '../create_components/CreateFormFileItem';

const TypeCreate = observer(
  ({
    types,
    isActive,
    setIsActive,
    setIsParentActiveValue,
    setSelectedItemValue,
    setSelectedItemId,
  }) => {
    const { getTypes, sleep, closePopup } = useAuth();
    const typeOrder = types.length + 1;

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [imgSrc, setImgSrc] = useState(null);

    const [inputValue, setInputValue] = useState('');
    const [isResetBtnShow, setIsResetBtnShow] = useState(false);

    const [isCheckValue, setIsCheckValue] = useState(false);

    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [isSuccessActive, setIsSuccessActive] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      setIsCheckValue(false);
    }, [isActive]);

    const resetData = () => {
      setInputValue('');
      resetFileData();
    };
    const resetFileData = e => {
      if (e) e.preventDefault();
      setFileName('');
      setImgSrc(null);
      setFile(null);
    };

    const setAnimationState = bool => {
      setIsSuccessActive(bool);
      setIsInputDisabled(bool);
    };

    const selectFile = e => {
      e.preventDefault();
      const selectedFile = e.target.files[0] ?? null;
      if (selectedFile) {
        setFileName(selectedFile.name || 'unnamed');
        setImgSrc(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
      } else {
        resetData();
      }
      e.target.value = null;
    };

    const clickHandler = e => {
      e.preventDefault();
      addNewObj(addParams, paramsKeys, createType, getTypes);
    };

    const addParams = [inputValue, typeOrder, file];
    const paramsKeys = ['name', 'order', 'img'];

    const addNewObj = async (paramsArr, paramsKeys, createObj, getObj) => {
      try {
        setIsCheckValue(true);
        if (
          paramsArr.map(item => !!item).includes(false) ||
          paramsArr.length !== paramsKeys.length
        ) {
          return;
        }
        setIsError(false);
        const formData = new FormData();
        paramsKeys.forEach((i, ind) => formData.append(i, paramsArr[ind]));

        const res = await createObj(formData);
        if (res) {
          setAnimationState(true);
          getObj();
          await sleep(1800);
          await closePopup(setIsActive, false, setIsParentActiveValue);
          if (setSelectedItemValue && setSelectedItemId) {
            setSelectedItemValue(res.name);
            setSelectedItemId(res.id);
          }
          setIsActive(false);
          setAnimationState(false);
          resetData();
          setIsResetBtnShow(false);
          setIsCheckValue(false);
        } else {
          setIsError(true);
        }
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    const setInputValueAndShowResetBtn = (
      e,
      setName,
      setIsReset,
      isShow,
      checkIsNumber = false
    ) => {
      let inputText = e.target.value;
      if (checkIsNumber && isNaN(inputText.at(-1))) {
        inputText = inputText.slice(0, -1);
      }

      setName(inputText);
      if (!inputText.length) setIsReset(false);
      if (inputText.length && !isShow) setIsReset(true);
    };

    const clearInputAndSetFocus = (e, setName, setIsReset) => {
      e.preventDefault();
      setName('');
      e.target.closest('button').previousElementSibling.focus();
      setIsReset(false);
    };

    const errorValue = (errMsg, checkVal, isCheck) => {
      return isCheck && !checkVal?.length ? errMsg : '';
    };

    const inputItemParams = {
      mutableInputValue: inputValue,
      setMutableInputValue: setInputValue,
      mutableObjIsReset: isResetBtnShow,
      setMutableObjIsReset: setIsResetBtnShow,
      isInputDisabled,
      isCheckValue,
    };

    const inputItemFn = { setInputValueAndShowResetBtn, clearInputAndSetFocus, errorValue };

    return (
      <div className={cl.create_type}>
        <form className={cl.type__form}>
          <CreateFormInputItem
            heading={'Type name'}
            inputName={'new_type'}
            errorText={'fill in the field'}
            inputItemParams={inputItemParams}
            inputItemFn={inputItemFn}
          />
          <CreateFormFileItem
            heading={'Attach a photo'}
            inputName={'type_file'}
            errorText={'select a file'}
            fileData={{ file, fileName, imgSrc }}
            fileItemFn={{ selectFile, resetFileData, errorValue }}
            isCheckValue={isCheckValue}
          />
          <div className={cl.button__row}>
            <CtaButton onClick={clickHandler} disabled={isInputDisabled}>
              Add type
            </CtaButton>
            <Success
              message={'type updated!'}
              errorText={"couldn't add a type"}
              isSuccessActive={isSuccessActive}
              isError={isError}
            />
          </div>
        </form>
      </div>
    );
  }
);

export { TypeCreate };
