import React from 'react';
import Url from '../../helpers/url-helper';

export default function DropdownLink(props) {
  return (
    <a
      className="nav-link dropdown-toggle"
      href={Url.action(props.link)}
      data-toggle="dropdown"
      role="button"
      aria-haspopup="true"
      aria-expanded="false"
      id={props.id}
    >
      {props.text}
    </a>
  );
}

DropdownLink.propTypes = {
  id: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
};
