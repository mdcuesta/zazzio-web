const CSRF_HEADER = 'X-CSRF-Token';

function setCSRFToken(securityToken) {
  jQuery.ajaxPrefilter((options, _, xhr) => {
    if (!xhr.crossDomain) {
      xhr.setRequestHeader(CSRF_HEADER, securityToken);
    }
  });
}

setCSRFToken($('meta[name="csrf-token"]').attr('content'));
