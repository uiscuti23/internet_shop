import { observer } from 'mobx-react-lite';
import { CreateFormFile } from './CreateFormFile';
import { CreateFormItem } from './CreateFormItem';
import { ErrorString } from './ErrorString';

const CreateFormFileItem = observer(
  ({ heading, inputName, errorText, fileData, fileItemFn, isCheckValue }) => {
    const { file } = fileData;
    const { selectFile, resetFileData, errorValue } = fileItemFn;

    return (
      <CreateFormItem heading={heading}>
        <CreateFormFile
          fileInputName={inputName}
          fileData={fileData}
          selectFile={selectFile}
          resetFileData={resetFileData}
        />
        <ErrorString error={errorValue(errorText, file?.name, isCheckValue)} />
      </CreateFormItem>
    );
  }
);

export { CreateFormFileItem };
