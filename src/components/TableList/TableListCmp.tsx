import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import DataGrid from 'react-data-grid';
import { connect } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import { Formatter, Loading } from '../../components';
import { requestAction } from '../../redux/global/actions';
import { getPath } from '../../utils/constants';
import t from '../../utils/i18n';
import Paginator from './Paginator/PaginatorCmp';
import './TableListCmp.scss';

const TableListCmp = (props: any) => {
  const {
    request,
    columns: _c,
    className,
    req,
    cWidth = {},
    formatter: _f = {},
    actions,
    perPage = 50,
    onInfoChange = () => {},
  } = props;

  const [global, setGlobal] = useState<any>({ rows: [], info: {} });
  const [inRequest, setInRequest] = useState(false);

  const { RowAction } = Formatter;
  const params = useParams();
  const route = useRouteMatch();
  const history = useHistory();

  let _a: any = [];
  if (actions) {
    _a = ['actions'];
    cWidth['actions'] = 100;
    _f['actions'] = <RowAction actions={actions} />;
  }

  const columns = () => {
    const { info } = global;
    return [..._a, ..._c].reduce((ret: any, item: any) => {
      return [
        ...ret,
        {
          key: item,
          name: t(item, 'column'),
          ...(cWidth[item] && { width: cWidth[item] }),
          ...(_f[item] && {
            formatter: ({ row }: any) =>
              React.cloneElement(_f[item], { value: row[item], row, info }),
          }),
        },
      ];
    }, []);
  };

  const handlePageChange = (page: any) => {
    history.push(getPath(route, { page }));
  };

  useEffect(() => {
    const onSuccess = (r: any) => {
      const { info, options = {} } = r;
      onInfoChange({ ...info, options });
      r.info && setGlobal(r);
    };
    const onFinally = (r: any) => {
      setInRequest(false);
    };

    setInRequest(true);
    request({ name: req, fields: { ...params, perPage } }, { onSuccess, onFinally }, false);
  }, [params]);

  const { rows, info } = global;

  const divEl: any = useRef();
  return (
    <div ref={divEl} className={classNames('table-list', className)}>
      <DataGrid columns={columns()} rows={rows} className={classNames('data-grid')} />
      <div className="content-header">
        <Paginator reqFields={{ ...info }} onPageChange={handlePageChange} />
      </div>
      <Loading show={inRequest} into={divEl} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      request: requestAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TableListCmp);

//export default TableListCmp;
