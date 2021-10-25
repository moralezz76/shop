import classNames from 'classnames';
import React, { ReactNode, useEffect, useState } from 'react';
import TabChild from '../TabChild/TabChild';
import './TabContainerCmp.scss';

interface ITabContainerProps {
  children: ReactNode;
  name: string;
  activeIndex?: number;
  onClickTabItem?: (i: number) => void | null;
}

const TabContainer = (props: ITabContainerProps) => {
  const { children, name, activeIndex = 0, onClickTabItem = null } = props;
  const [activeTab, setActiveTab] = useState<number>(activeIndex);
  const [tabToggled, setTabToggled] = useState('');

  useEffect(() => {
    setActiveTab(activeIndex);
  }, [activeIndex]);

  const handleClickTabItem = (tab: number) => {
    setTabToggled('');
    onClickTabItem ? onClickTabItem(tab) : setActiveTab(tab);
  };

  const onTabToggle = () => {
    setTabToggled(tabToggled === '' ? 'expanded' : '');
  };

  return (
    <div className="tabs">
      <div className="tab-list">
        <div className={classNames('tab-menu', tabToggled)}>
          <ol>
            {React.Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                const { props } = child;
                const key = `${name}_${index}`;
                return React.cloneElement(child, {
                  index,
                  activeTab,
                  key,
                  handleClickTabItem,
                  ...props,
                });
              }
            })}
          </ol>
        </div>
      </div>
      <div className={classNames('tab-content', { 'menu-expanded': tabToggled === 'expanded' })}>
        {React.Children.map(children, (child, i) => {
          if (React.isValidElement(child)) {
            const {
              props: { children },
            } = child;
            return i === activeTab && children;
          }
        })}
      </div>
    </div>
  );
};

TabContainer.Tab = (props: any) => {
  return <TabChild {...props} />;
};

export default TabContainer;
