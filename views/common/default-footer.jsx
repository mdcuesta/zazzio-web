import React from 'react';
import Url from '../helpers/url-helper';
import ResourceHelper from '../helpers/resource-helper';

export default function DefaultFooter(props) {
  const RES_FOOTER = ResourceHelper.getResource('footer', props.locale);

  return (
    <div className="footer">
      <div className="container">
        <div className="col-xs-6 col-sm-6 col-md-3 text-left">
          <ul className="list-footer">
            <li>
              <a
                href={Url.action('en')}
                className={`lang-link${(props.locale === 'en' ? ' active' : '')}`}
              >
                {RES_FOOTER.english}
              </a>
            </li>
            <li>
              <a
                href={Url.action('tl')}
                className={`lang-link${(props.locale === 'tl' ? ' active' : '')}`}
              >
                {RES_FOOTER.tagalog}
              </a>
            </li>
            <li>
              <a
                href={Url.action('cx')}
                className={`lang-link${(props.locale === 'cx' ? ' active' : '')}`}
              >
                {RES_FOOTER.bisaya}
              </a>
            </li>
          </ul>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-3 text-left">
          <h5>{RES_FOOTER.browse}</h5>
          <ul className="list-footer">
            <li>
              <a href={Url.action('condominiums')}>
                Condominiums
              </a>
            </li>
            <li>
              <a href={Url.action('house-and-lot')}>
                House and Lot
              </a>
            </li>
            <li>
              <a href={Url.action('property-developers')}>
                Property Developers
              </a>
            </li>
          </ul>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-3 text-left">
          <h5>{RES_FOOTER.areas}</h5>
          <ul className="list-footer">
            <li>
              <a href={Url.action('metro-manila')}>
                Metro Manila
              </a>
            </li>
            <li>
              <a href={Url.action('pampanga')}>
                Pampanga
              </a>
            </li>
            <li>
              <a href={Url.action('cebu')}>
                Cebu
              </a>
            </li>
            <li>
              <a href={Url.action('davao')}>
                Davao
              </a>
            </li>
          </ul>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-3 text-left">
          <h5>{RES_FOOTER.company}</h5>
          <ul className="list-footer">
            <li>
              <a href={Url.action('about-us')}>
                {RES_FOOTER.companyLinks.about}
              </a>
            </li>
            <li>
              <a href={Url.action('careers')}>
                {RES_FOOTER.companyLinks.careers}
              </a>
            </li>
            <li>
              <a href={Url.action('blog')}>
                {RES_FOOTER.companyLinks.blog}
              </a>
            </li>
            <li>
              <a href={Url.action('policies')}>
                {RES_FOOTER.companyLinks.policies}
              </a>
            </li>
            <li>
              <a href={Url.action('terms')}>
                {RES_FOOTER.companyLinks.terms}
              </a>
            </li>
          </ul>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 join-us-container text-xs-center">
          <h5>{RES_FOOTER.joinUs}</h5>
          <ul className="list-inline list-join-us">
            <li className="list-inline-item">
              <a href="https://www.facebook.com">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.linkedin.com">
                <i className="fa fa-linkedin" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.twitter.com">
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.google.com">
                <i className="fa fa-google-plus" />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.instagram.com">
                <i className="fa fa-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

DefaultFooter.propTypes = {
  locale: React.PropTypes.string.isRequired,
};
