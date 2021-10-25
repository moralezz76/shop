import { useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { Formatter, FormEasy, TableList } from '../../components';
import { getPath } from '../../utils/constants';
import t from '../../utils/i18n';
import MainLayout from '../MainLayout/MainLayout';
import './LogsView.scss';

const LogsView = (props: any) => {
  const { FieldToInfo, ValueTag, LinkedTo } = Formatter;

  const columns = ['userName', 'date', 'time', 'method', 'file'];
  const cWidth = { id: 30, file: 250, userName: 200, method: 20 };

  const { page, user, date }: any = useParams();
  const history = useHistory();
  const route = useRouteMatch();
  const [opts, setOpts] = useState<any>({});

  const actions = [
    {
      visible: true,
      icon: 'edit',
      cb: (row: any) => {
        //console.log(row);
      },
    },
  ];

  const f = {
    userName: <FieldToInfo infoField="users" prefix="u" />,
    method: <ValueTag />,
    file: <LinkedTo field="path" />,
  };

  const toLabelValue = (params: any) => {
    return Object.keys(params).reduce((ret: any, value: any) => {
      const label: string = params[value];
      return [...ret, { label: t(`${label}`, ''), value }];
    }, []);
  };

  const { users = {}, logdate = {} } = opts;
  const fields = {
    ...(Object.keys(opts).length > 0 && {
      logdate: {
        type: 'select',
        noTitle: true,
        options: toLabelValue(logdate),
        req: 'log-dates-options.get',
        fieldStyle: {
          width: 200,
        },
      },
      user: {
        type: 'select',
        options: [...toLabelValue(users)],
        fixOptions: toLabelValue({ all: t('allUsers') }),
        req: 'log-users-options.get',
        noTitle: true,
        fieldStyle: {
          width: 200,
        },
      },
    }),
  };

  const handleInfoChange = ({ options }: any) => {
    setOpts(options);
  };

  const iValues = { user: `${user}`, logdate: date };

  const handleFieldChange = ({ name, value }: any) => {
    let param: any = { date: value };
    switch (name) {
      case 'logdate': // first param
        break;
      case 'user':
        param = { user: value };
    }
    history.push(getPath(route, param));
  };

  return (
    <MainLayout>
      <div className="logs-view">
        <div className="content-header">
          <FormEasy
            className="one-line"
            initialValues={iValues}
            onFieldChange={handleFieldChange}
            fields={fields}
          />
        </div>
        <TableList
          columns={columns}
          cWidth={cWidth}
          className="data-grid"
          req="logs.get"
          formatter={f}
          actions={actions}
          page={parseInt(page)}
          onInfoChange={handleInfoChange}
        />
      </div>
    </MainLayout>
  );
};

export default LogsView;
