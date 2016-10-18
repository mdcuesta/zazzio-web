import React from 'react';
import Url from '../helpers/url-helper';

export default function DefaultFooter() {
  return (
    <div className="footer">
      <div className="container">
        <div className="col-xs-6 col-sm-6 col-md-3 text-xs-center text-sm-center text-md-left">
          <ul className="list-footer">
            <li>
              <a href={Url.action('en')}>
                English
              </a>
            </li>
            <li>
              <a href={Url.action('tl')}>
                Tagalog
              </a>
            </li>
            <li>
              <a href={Url.action('cx')}>
                Bisaya
              </a>
            </li>
          </ul>
        </div>
        <div className="col-xs-6 col-sm-6 col-md-3 text-xs-center text-sm-center text-md-left">
          <h5>Browse</h5>
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
        <div className="col-xs-6 col-sm-6 col-md-3 text-xs-center text-sm-center text-md-left">
          <h5>Areas</h5>
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
        <div className="col-xs-6 col-sm-6 col-md-3 text-xs-center text-sm-center text-md-left">
          <h5>Company</h5>
          <ul className="list-footer">
            <li>
              <a href={Url.action('about-us')}>
                About
              </a>
            </li>
            <li>
              <a href={Url.action('careers')}>
                Careers
              </a>
            </li>
            <li>
              <a href={Url.action('blog')}>
                Blog
              </a>
            </li>
            <li>
              <a href={Url.action('policies')}>
                Policies
              </a>
            </li>
            <li>
              <a href={Url.action('terms')}>
                Terms
              </a>
            </li>
          </ul>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 join-us-container text-xs-center">
          <h5>Join Us On</h5>
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
