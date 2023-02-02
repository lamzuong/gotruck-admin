import classNames from 'classnames/bind';
import styles from './MyMenu.module.scss';

import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MyMenu({ children, items = [], width = '200px', offset = [50, 8] }) {
  const renderItems = () => {
    return (
      <div className={cx('menu-list')} style={{ width }}>
        {items.map((item, index) => (
          <Link className={cx('menu-item')} key={index} to={item.to}>
            <div className={cx('item-title')}>{item.title}</div>
            {item.numberNotify ? (
              <div className={cx('number-notify')}>
                {item.numberNotify > 0 ? item.numberNotify : null}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Tippy
        interactive
        delay={[0, 200]}
        offset={offset}
        placement="bottom-end"
        render={() => renderItems()}
      >
        {children}
      </Tippy>
    </div>
  );
}

export default MyMenu;
