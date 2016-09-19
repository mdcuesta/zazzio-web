import React from 'react';
import DefaultLayout from '../layout';

export default function FBLoginReturnPage() {
  return (
    <DefaultLayout>
      <script
        dangerouslySetInnerHTML={{ __html: `
          if (window.opener) {
              window.opener.focus();
              window.opener.location.reload(true);
          }
          window.close();
      ` }}
      />
    </DefaultLayout>
  );
}
