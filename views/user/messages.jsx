import React from 'react';
import UserPageLayout from './user-pages-layout';
import UserProfilePanel from './components/user-profile-panel';
import Url from '../helpers/url-helper';
import ResourceHelper from '../helpers/resource-helper';

export default function Messages(props) {
  const RES_DASHBOARD = ResourceHelper.getResource('user-dashboard', props.locale);
  return (
    <UserPageLayout
      title={RES_DASHBOARD.title}
      scripts={[Url.cdn('javascripts/user-messages')]}
      styles={[Url.cdn('stylesheets/user-messages')]}
      csrfToken={props.csrfToken}
      user={props.user}
      page="messages"
      locale={props.locale}
      route={props.route}
    >
      <div className="row main-content">
        <div className="col-sm-12 col-md-4 col-lg-3">
          <UserProfilePanel
            user={props.user}
            resource={RES_DASHBOARD}
          />
          <div className="card">
            <div className="card-header">
              {RES_DASHBOARD.quickLinks}
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
              {RES_DASHBOARD.messages} (0 {RES_DASHBOARD.new})
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
                {RES_DASHBOARD.allMessages}
              </a>
            </div>
          </div>
        </div>
      </div>
    </UserPageLayout>
  );
}

Messages.propTypes = {
  csrfToken: React.PropTypes.string.isRequired,

  // default properties
  route: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired,
  locale: React.PropTypes.string.isRequired,
};

