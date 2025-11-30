import { observer } from 'mobx-react-lite';
import { ChangeInput } from '../../UI/inputs/ChangeInput';
import { CreateFormItem } from './CreateFormItem';
import { ErrorString } from './ErrorString';
import { ResetIconButton } from './ResetIconButton';

const CreateFormInputItem = observer(
  ({ heading, inputName, errorText, inputItemParams, inputItemFn }) => {
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
    return (
      <CreateFormItem heading={heading}>
        <ChangeInput
          name={inputName}
          value={mutableInputValue}
          onChange={e =>
            setInputValueAndShowResetBtn(
              e,
              setMutableInputValue,
              setMutableObjIsReset,
              mutableObjIsReset,
              checkIsNumber
            )
          }
          disabled={isInputDisabled}
        />
        <ResetIconButton
          isResetBtnShow={mutableObjIsReset}
          onClick={e => clearInputAndSetFocus(e, setMutableInputValue, setMutableObjIsReset)}
          disabled={!mutableObjIsReset}
        />
        <ErrorString error={errorValue(errorText, mutableInputValue, isCheckValue)} />
      </CreateFormItem>
    );
  }
);

export { CreateFormInputItem };
