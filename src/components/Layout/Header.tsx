import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import HandIcon from './HandIcon'
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Gitmefy</h1>
        <HandIcon />
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </Fragment>
  );
};

export default Header;
