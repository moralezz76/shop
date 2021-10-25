import { useEffect, useState } from 'react';
import JSONViewer from 'react-json-view';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import { Tabs } from '../../components';
import { requestAction } from '../../redux/global/actions';
import t from '../../utils/i18n';
import MainLayout from '../MainLayout/MainLayout';
import './LogDetailsView.scss';

const LogDetailsView = (props: any) => {
  const { request } = props;
  const params = useParams();
  const [logData, setLogData] = useState<any>({});
  useEffect(() => {
    const onSuccess = (data: any) => {
      setLogData(data);
    };

    const onError = (v: any) => {};

    request(
      { name: 'log-details.get', fields: params },
      {
        onSuccess,
        onError,
      }
    );
  }, []);

  const info = logData['info'];

  return (
    <MainLayout>
      <div className="log-details">
        <div className="content-body">
          <JSONViewer
            name={false}
            src={info}
            displayObjectSize={false}
            displayDataTypes={false}
            theme="monokai"
          />
        </div>
        <Tabs name="logTabs">
          {Object.keys(logData)
            .filter((i: any) => i !== 'info')
            .map((log: any) => {
              return (
                <Tabs.Tab title={t(log, 'tab')}>
                  <div className="content-body">
                    <JSONViewer
                      name={false}
                      src={logData[log]}
                      displayObjectSize={false}
                      displayDataTypes={false}
                      theme="monokai"
                    />
                  </div>
                </Tabs.Tab>
              );
            })}
        </Tabs>
      </div>
    </MainLayout>
  );
};

//export default LogDetailsView;

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
export default connect(mapStateToProps, mapDispatchToProps)(LogDetailsView);
