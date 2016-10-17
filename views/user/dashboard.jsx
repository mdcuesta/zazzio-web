import React from 'react';
import UserPageLayout from './user-pages-layout';
import UserProfilePanel from './components/user-profile-panel';
import Url from '../helpers/url-helper';

export default function Dashboard(props) {
  return (
    <UserPageLayout
      title="Dashboard - Zazzio"
      scripts={[Url.cdn('javascripts/user-dashboard')]}
      styles={[Url.cdn('stylesheets/user-dashboard')]}
      csrfToken={props.csrfToken}
      user={props.user}
      page="dashboard"
      locale={props.locale}
    >
      <div className="row main-content">
        <div className="col-sm-12 col-md-4 col-lg-3">
          <UserProfilePanel user={props.user} />
          <div className="card">
            <div className="card-header">
              Quick Links
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-9">
          <div className="card">
            <div className="card-block">
              <blockquote className="card-blockquote">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Messages (0 new)
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
              </blockquote>
            </div>
            <div className="card-footer">
              <a href={Url.action('user/messages')}>
                All messages
              </a>
            </div>
          </div>
        </div>
      </div>
    </UserPageLayout>
  );
}

Dashboard.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
  locale: React.PropTypes.string,
};

