/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { FieldBase } from '..';
import t from '../../../utils/i18n';
import './DropZoneCmp.scss';

const DropZoneCmp = (props: any) => {
  const {
    field: { name },
    form: { setFieldValue },
    multiple,
  } = props;

  const [files, setFiles] = useState<any>({});
  const [value, setValue] = useState<any>({});

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple,
  });

  useEffect(() => {
    const keys = Object.keys(value);
    const str_value = keys.length ? btoa(JSON.stringify(value)) : '';
    setFieldValue(name, str_value);
  }, [name, setFieldValue, value]);

  useEffect(() => {
    const _files = multiple ? { ...files } : {};
    acceptedFiles.forEach((item: any) => {
      const { name } = item;
      _files[name] = item;
    });
    setFiles(_files);
  }, [acceptedFiles]);

  useEffect(() => {
    const keys = Object.keys(files);
    if (keys.length === 0) setValue('');
    else {
      let retValue: any = {};
      keys.forEach((key: any, n: number) => {
        const file = files[key];
        const reader = new FileReader();
        reader.onloadend = () => {
          retValue[key] = reader.result;
          if (keys.length === n + 1) setValue(retValue);
        };
        reader.readAsDataURL(file);
      });
    }
  }, [files]);

  const removeFile = (e: any, name: any) => {
    e.stopPropagation();
    const _files = { ...files };
    delete _files[name];
    setFiles(_files);
  };

  const acceptedFileItems = Object.keys(files).map((key: any) => {
    const file = files[key];
    const { path, size } = file;
    const file_parts = path.split('.');
    let ext = '';
    if (file_parts.length > 1) ext = file_parts.pop();
    const name = file_parts.join('.');

    return (
      <div key={path}>
        <div className="file-name">{name}</div>
        <div>.{ext}</div>
        <div>&nbsp;- {size} kb</div>
        <div>
          <BsTrash size="20px" style={{ margin: '2px 6px' }} onClick={e => removeFile(e, key)} />
        </div>
      </div>
    );
  });

  const removeAll = (e: any) => {
    e.stopPropagation();
    setFiles({});
  };

  const keys = Object.keys(files);
  const { length: totalFiles } = keys;

  return (
    <FieldBase {...props}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <div>
          <input {...getInputProps()} />
          <div className="cloud-upload">
            <AiOutlineCloudUpload size="50" />
          </div>
          {totalFiles === 0 && <div className="info">{t('dropzoneTitle')}</div>}
        </div>
        <aside>
          <div className="files">{acceptedFileItems}</div>
          {totalFiles > 0 && (
            <div className="resume">
              ({totalFiles} file{totalFiles !== 1 && 's'}) &nbsp;
              <label className="remove-all" onClick={removeAll}>
                Remove all
              </label>
            </div>
          )}
        </aside>
      </div>
    </FieldBase>
  );
};

export default DropZoneCmp;
