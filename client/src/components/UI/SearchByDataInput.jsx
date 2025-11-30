import cl from '../../styles/UI/inputs/search_by_data_input.module.css';
import { useRef, useState } from 'react';
import { ChangeInput } from './inputs/ChangeInput';
import { ResetIconButton } from '../adminpg/create_components/ResetIconButton';
import { CreateFormItem } from '../adminpg/create_components/CreateFormItem';
import { ErrorString } from '../adminpg/create_components/ErrorString';
import { useAuth } from '../../hook/useAuth';
import { observer } from 'mobx-react-lite';
import closeIcon from '../../assets/types_page/close.png';

const SearchByDataInput = observer(
  ({
    data,
    heading,
    inputName,
    errorText,
    inputItemParams,
    inputItemFn,
    isActive,
    setIsActive,
    setSecondIsActive,
    selectedValue,
    setSelectedValue,
    setSelectedItemId,
  }) => {
    const {
      mutableInputValue,
      setMutableInputValue,
      mutableObjIsReset,
      setMutableObjIsReset,
      isInputDisabled,
      isCheckValue,
      checkIsNumber,
    } = inputItemParams;
    const { setInputValueAndShowResetBtn, clearInputAndSetFocus, errorValue } = inputItemFn;

    const [isAreaHasItems, setIsAreaHasItems] = useState(false);

    const area = useRef();
    const isShowError = !isAreaHasItems && Boolean(mutableInputValue);

    const { openPopup } = useAuth();

    const createSearchVar = item => {
      if (!mutableInputValue) return item;
      let isNotFound = false;

      let result = -1;

      const indexArray = Array.from(mutableInputValue).map(i => {
        result = item.name.toLowerCase().indexOf(i.toLowerCase(), result + 1);
        if (result === -1) {
          isNotFound = true;
        }
        return result;
      });
      if (isNotFound) return item;
      return { ...item, searchCoin: indexArray };
    };

    const highlightStrings = item => {
      let arr = [];
      let pos = 0;
      const str = item.name;

      const indexes = item.searchCoin;

      indexes.forEach(i => {
        if (i === pos) {
          if (i !== 0) {
            const lastObj = arr.at(-1);
            const lastInd = lastObj.ind;

            arr = arr.slice(0, -1).concat({
              ...lastObj,
              sub: lastObj.sub + str[i],
              ind: [lastInd[0], i],
              maxLength: lastObj.maxLength + 1,
            });
          } else {
            arr = [...arr, { sub: str[i], isHighlight: true, ind: [i], maxLength: 1, str }];
          }
        } else {
          arr = [
            ...arr,
            {
              sub: str.slice(pos, i),
              isHighlight: false,
              ind: i === pos + 1 ? [pos] : [pos, i - 1],
              str,
            },
            { sub: str[i], isHighlight: true, ind: [i], maxLength: 1, str },
          ];
        }
        pos = i + 1;
      });
      if (str.length - 1 !== indexes.at(-1)) {
        arr = [
          ...arr,
          { sub: str.slice(pos), isHighlight: false, ind: [pos, str.length - 1], str },
        ];
      }

      const highSortedArr = arr
        .filter(i => i.isHighlight === true)
        .sort((a, b) =>
          a.maxLength === b.maxLength ? a.ind[0] - b.ind[0] : b.maxLength - a.maxLength
        );

      return { ...item, substrings: arr, substrRating: highSortedArr };
    };

    const sortItems = (a, b) => {
      let pos = 0;
      let res = null;

      res = sortByLength(a, b, res, pos);

      while (res === null) {
        pos += 1;
        res = sortByObjExistenceAndLength(a, b, res, pos);

        if (pos > 10 && res === null) {
          res = 0;
          break;
        }
      }

      function sortByLength(a, b, res, pos) {
        if (a.substrRating[pos].maxLength !== b.substrRating[pos].maxLength) {
          res = b.substrRating[pos].maxLength - a.substrRating[pos].maxLength;
        } else if (a.substrRating[pos].ind[0] !== b.substrRating[pos].ind[0]) {
          res = a.substrRating[pos].ind[0] - b.substrRating[pos].ind[0];
        }
        return res;
      }

      function sortByObjExistence(a, b, res, pos) {
        if (a.substrRating[pos]?.maxLength && !b.substrRating[pos]?.maxLength) {
          res = -1;
        } else if (!a.substrRating[pos]?.maxLength && b.substrRating[pos]?.maxLength) {
          res = 1;
        } else if (!a.substrRating[pos]?.maxLength && !b.substrRating[pos]?.maxLength) {
          res = 0;
        }
        return res;
      }

      function sortByObjExistenceAndLength(a, b, res, pos) {
        res = sortByObjExistence(a, b, res, pos);

        if (res === null) {
          res = sortByLength(a, b, res, pos);
        }
        return res;
      }

      return res;
    };

    return (
      <>
        <div className={cl.search_by_data}>
          <div className={cl.creat_form_item_wrapper}>
            <CreateFormItem heading={heading}>
              <ChangeInput
                name={inputName}
                value={mutableInputValue}
                onChange={async e => {
                  await setInputValueAndShowResetBtn(
                    e,
                    setMutableInputValue,
                    setMutableObjIsReset,
                    checkIsNumber
                  );
                  setIsAreaHasItems(Boolean(area.current.children.length));
                }}
                disabled={Boolean(selectedValue) || isInputDisabled}
                isHide={Boolean(selectedValue)}
              />
              <ResetIconButton
                isResetBtnShow={mutableObjIsReset && selectedValue.length === 0}
                onClick={e => clearInputAndSetFocus(e, setMutableInputValue, setMutableObjIsReset)}
                disabled={Boolean(selectedValue) || !mutableObjIsReset}
              />
              <ErrorString
                error={errorValue(errorText, selectedValue, isCheckValue, isShowError)}
              />
              {selectedValue.length !== 0 && (
                <div className={cl.searchBlock}>
                  <span className={cl.searchBlock__value}>{selectedValue}</span>
                  <div
                    className={cl.searchBlock__close}
                    onClick={() => {
                      setSelectedValue('');
                      setSelectedItemId(null);
                      setMutableObjIsReset(false);
                    }}>
                    <img src={closeIcon} alt='close' />
                  </div>
                </div>
              )}
              {data && data.length !== 0 && selectedValue.length === 0 && (
                <div ref={area} className={cl.var_area}>
                  {data
                    .slice()
                    .map(i => createSearchVar(i))
                    .filter(i => i.hasOwnProperty('searchCoin'))
                    .map(i => highlightStrings(i))
                    .sort(sortItems)
                    .map(item => (
                      <div
                        key={item.id}
                        className={cl.var_item}
                        onClick={() => {
                          setMutableInputValue('');
                          setSelectedValue(item.name);
                          setSelectedItemId(item.id);
                        }}>
                        {item.substrings.map(i => (
                          <span key={i.ind[0]} className={i.isHighlight ? cl.highlight : ''}>
                            {i.sub}
                          </span>
                        ))}
                      </div>
                    ))}
                </div>
              )}
            </CreateFormItem>
          </div>
          <div className={cl.create_new_btn_wrapper}>
            <button
              className={cl.crate_new_btn}
              onClick={e => {
                e.preventDefault();
                openPopup(setSecondIsActive, isActive, setIsActive);
              }}>
              create new
            </button>
          </div>
        </div>
      </>
    );
  }
);

export { SearchByDataInput };
