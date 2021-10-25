import { FormEasy } from '../..';
import { Formatter } from '../../';
import './PaginatorCmp.scss';

const PaginatorCmp = (props: any) => {
  const { reqFields, onPageChange } = props;

  const { total = 0 } = reqFields;
  const { NextPage, PrevPage, PageShowing } = Formatter;

  const options = Array.from({ length: total }, (k, value) => {
    return { value: value + 1, label: value + 1 };
  });

  const handleFieldChange = (attr: any) => {
    const { name, value } = attr;
    switch (name) {
      case 'page':
        onPageChange && onPageChange(value);
        break;
    }
  };

  const fields = {
    showing: <PageShowing />,
    before: <PrevPage onPageChange={onPageChange} />,
    page: {
      type: 'select',
      options,
      noTitle: true,
      menuPlacement: 'top',
      fieldStyle: {
        width: 75,
      },
    },
    separ: <>/ </>,
    total: {
      type: 'text',
      isDisabled: true,
      noTitle: true,
      fieldStyle: {
        width: 75,
      },
    },
    next: <NextPage onPageChange={onPageChange} />,
  };

  return (
    <div className="paginator">
      <div className="paginator-content">
        <FormEasy
          className="one-line"
          initialValues={reqFields}
          onFieldChange={handleFieldChange}
          fields={fields}
        />
      </div>
    </div>
  );
};

export default PaginatorCmp;
