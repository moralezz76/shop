import React from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { BsCaretRightFill, BsList, BsSearch, BsThreeDots, BsTrash } from 'react-icons/bs';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaFacebook,
  FaFileContract,
  FaUserCog,
  FaUserEdit,
} from 'react-icons/fa';
import { ImGoogle3 } from 'react-icons/im';
import { RiShoppingBasketFill, RiShutDownFill } from 'react-icons/ri';
import { TiPlusOutline } from 'react-icons/ti';
import './IconCommon.scss';

const IconCommon = (props: any) => {
  const { type = '', ...rest } = props;

  const refs: any = {
    trash: <BsTrash {...rest} />,
    caret: <BsCaretRightFill {...rest} />,
    search: <BsSearch {...rest} />,
    list: <BsList {...rest} />,
    plus: <TiPlusOutline {...rest} />,
    dots: <BsThreeDots {...rest} />,
    dashboard: <AiFillDashboard {...rest} />,
    users: <FaUserCog {...rest} />,
    exit: <RiShutDownFill {...rest} />,
    products: <RiShoppingBasketFill {...rest} />,
    facebook: <FaFacebook {...rest} />,
    google: <ImGoogle3 {...rest} />,
    edit: <FaUserEdit {...rest} />,
    logs: <FaFileContract {...rest} />,
    next: <FaAngleDoubleRight {...rest} />,
    before: <FaAngleDoubleLeft {...rest} />,
  };

  return refs[type] || null;
};

export default IconCommon;
