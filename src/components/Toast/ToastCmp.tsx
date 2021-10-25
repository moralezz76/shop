import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import { removeToastAction } from '../../redux/global/actions';
import { getToasts } from '../../redux/global/selectors';
import t from '../../utils/i18n';
import './ToastCmp.scss';

const ToastCmp = (props: any) => {
  const { toasts = [], removeToast } = props;

  const [items, setItems] = useState<any>([]);
  const [visible, setVisible] = useState<any>(-1);

  useEffect(() => {
    const allIdToasts = toasts.reduce((ret: any, { id }: any) => {
      return [...ret, id];
    }, []);

    const callVisible = () => {
      setVisible([...allIdToasts]);
    };

    const removeNewToast = () => {
      const { id } = toasts.find(({ id }: any) => {
        const allIdItems = items.reduce((ret: any, { id }: any) => {
          return [...ret, id];
        }, []);
        return !allIdItems.includes(id);
      });
      setTimeout(() => {
        removeToast(id);
      }, 5000);
    };

    const add = toasts.length > items.length;
    if (add) {
      removeNewToast();
      setItems([...toasts]);
      setTimeout(() => {
        callVisible();
      }, 1);
    } else {
      callVisible();
      setTimeout(() => {
        setItems(toasts);
      }, 600);
    }
  }, [toasts]);

  const [scrollY, setScrollY] = useState('0px');

  useEffect(() => {
    const adjustScrollY = () => {
      const { scrollY } = window;
      setScrollY(scrollY + 'px');
    };
    adjustScrollY();
    window.addEventListener('scroll', adjustScrollY);
  }, []);

  return items.length ? (
    <div style={{ top: scrollY + 10 }} className="toast-container">
      {items.map((item: any) => {
        const { id, title, content } = item;
        const cn = classnames('toast', { visible: visible.includes(id) });
        return (
          <div key={`tst_${id}`} className={cn}>
            <div className="toast-body">
              <div
                className="close-button"
                onClick={() => {
                  removeToast(id);
                }}
              >
                <RiCloseFill size="20px" />
              </div>
              {title && <h4>{t(title)}</h4>}
              <div className="content">{t(content)}</div>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

const mapStateToProps = (state: RootState) => {
  return {
    toasts: getToasts(state),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      removeToast: removeToastAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ToastCmp);
