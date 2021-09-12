import classnames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import { removeModalAction } from '../../redux/global/actions';
import { getModals } from '../../redux/global/selectors';
import './DialogCmp.scss';

const DialogCmp = (props: any) => {
  const { modals = [], removeModal, scrollY } = props;
  const modalEl = useRef<any>();

  const [dialogs, setDialogs] = useState<any>([]);
  const [visible, setVisible] = useState(-1);

  useEffect(() => {
    const add = modals.length > dialogs.length;
    if (add) {
      setDialogs([...modals]);
      setTimeout(() => {
        setVisible(modals.length - 1);
      }, 1);
    } else {
      setVisible(modals.length - 2);
      setTimeout(() => {
        setDialogs(modals);
      }, 500);
    }

    //if (modals.length) {
    document.body.style.overflow = modals.length ? 'hidden' : '';
    //}
  }, [modals]);

  return dialogs.length ? (
    <div
      style={{ top: scrollY }}
      className={classnames('modal', { visible: visible >= 0 })}
      ref={modalEl}
    >
      {dialogs.map((item: any, n: number) => {
        const { title, content, buttons } = item;
        const cn = classnames('dialog', { visible: n <= visible });

        return (
          <div key={`dlg_${n}`} className={cn}>
            <div
              className="close-button"
              onClick={() => {
                removeModal();
              }}
            >
              <RiCloseFill size="26px" />
            </div>
            {title && <div className="title">{title}</div>}
            <div className="content">{content}</div>
            {buttons && <div className="buttons">{buttons}</div>}
          </div>
        );
      })}
    </div>
  ) : null;
};

const mapStateToProps = (state: RootState) => {
  return {
    modals: getModals(state),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      removeModal: removeModalAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DialogCmp);

//export default DialogCmp;
