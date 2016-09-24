import React from 'react';
import Layout from './email-layout';
import Url from './helpers/url-helper';

export default function ConfirmationEmail(props) {
  return (
    <Layout title="Complete your zazz.io account registration">
      <p>Hi {props.firstName},</p>
      <p>
        Congratulations your account has been created.
      </p>
      <p>
        Please click on the link below to confirm your account.
      </p>
      <p>
        <a
          href={Url.action(`sign-up/account/confirm/${props.confirmationCode}`)}
        >
          {Url.action(`sign-up/account/confirm/${props.confirmationCode}`)}
        </a>.
      </p>
      <p>
        If this is not you please click the link below to cancel the account.
      </p>
      <p>
        <a
          href={Url.action(`sign-up/account/cancel/${props.confirmationCode}`)}
        >
          {Url.action(`sign-up/account/cancel/${props.confirmationCode}`)}
        </a>.
      </p>
      <p>
        Thank you. :)
      </p>
    </Layout>
  );
}

ConfirmationEmail.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  confirmationCode: React.PropTypes.string.isRequired,
};

