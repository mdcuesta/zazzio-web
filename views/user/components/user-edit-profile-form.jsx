import React from 'react';
import Url from '../../helpers/url-helper';

export default function EditProfileForm(props) {
  const dateOptions = [];
  const yearOptions = [];
  const year = new Date().getFullYear();

  for (let i = 1; i <= 31; i++) {
    dateOptions.push(<option value={i}>{i}</option>);
  }

  for (let i = year - 1; i >= 1930; i--) {
    yearOptions.push(<option value={i}>{i}</option>);
  }

  const monthOptions = [
    <option value="1">January</option>,
    <option value="2">February</option>,
    <option value="3">March</option>,
    <option value="4">April</option>,
    <option value="5">May</option>,
    <option value="6">June</option>,
    <option value="7">July</option>,
    <option value="8">August</option>,
    <option value="9">September</option>,
    <option value="10">October</option>,
    <option value="11">November</option>,
    <option value="12">December</option>,
  ];

  return (
    <div className="card-block edit-profile-form">
      <form
        action={Url.action('user/profile')}
        method="post"
      >
        <input
          type="hidden"
          name="_csrf"
          value={props.csrfToken}
        />
        <div className="row">
          <label
            className="col-sm-3 text-sm-right"
            htmlFor="txt-first-name"
          >
            First Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              id="txt-first-name"
              className="form-control"
              value={props.user.profile.firstName}
            />
          </div>
        </div>
        <div className="row">
          <label
            className="col-sm-3 text-sm-right"
            htmlFor="txt-middle-name"
          >
            Middle Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              id="txt-middle-name"
              className="form-control"
              value={props.user.profile.middleName}
            />
          </div>
        </div>
        <div className="row">
          <label
            className="col-sm-3 text-sm-right"
            htmlFor="txt-last-name"
          >
            Last Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              id="txt-last-name"
              className="form-control"
              value={props.user.profile.lastName}
            />
          </div>
        </div>
        <div className="row">
          <label
            className="col-sm-3 text-sm-right"
            htmlFor="txt-email-address"
          >
            Email Address
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              id="txt-email-address"
              className="form-control"
              disabled
              value={props.user.email}
            />
          </div>
        </div>
        <div className="row">
          <label
            className="col-sm-3 text-sm-right"
            htmlFor="select-gender"
          >
            I Am
          </label>
          <div className="col-sm-9">
            <select
              id="select-gender"
              className="form-control"
            >
              <option
                disabled
                selected
              >
                Sex
              </option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>
        <div className="row">
          <label
            className="col-sm-3 text-sm-right"
            htmlFor="select-bday-month"
          >
            Birthday
          </label>
          <div className="col-sm-9">
            <select
              id="select-bday-month"
              className="form-control bday-select col-md-12"
            >
              <option
                disabled
                selected
              >
                Month
              </option>
              {monthOptions}
            </select>
            <select
              id="select-bday-day"
              className="form-control bday-select col-md-12"
            >
              <option
                disabled
                selected
              >
                Day
              </option>
              {dateOptions}
            </select>
            <select
              id="select-bday-year"
              className="form-control bday-select col-md-12"
            >
              <option
                disabled
                selected
              >
                Year
              </option>
              {yearOptions}
            </select>
          </div>
        </div>
        <div className="row">
          <label
            className="col-sm-3 text-sm-right"
            htmlFor="select-bday-month"
          >
            Mobile Numbers
          </label>
          <div className="col-sm-9">
            <div className="input-group input-group-mobile">
              <span className="input-group-addon hidden-md-down">
                PH
              </span>
              <input
                type="text"
                className="form-control"
                disabled
              />
              <div className="input-group-addon verified text-left">
                <i className="fa fa-check-square-o" />
                &nbsp;Verified
              </div>
              <div className="input-group-addon input-group-delete">
                <a href={Url.action('user/profile/mobile-number/number/delete')}>
                  <i className="fa fa-remove" />
                </a>
              </div>
            </div>
            <div className="input-group input-group-mobile">
              <span className="input-group-addon hidden-md-down">
                PH
              </span>
              <input
                type="text"
                className="form-control"
                disabled
              />
              <a
                className="input-group-addon unverified text-left"
                href={Url.action('user/profile/mobile-number/number/verify')}
              >
                <i className="fa fa-minus-square-o" />
                &nbsp;Verify
              </a>
              <div className="input-group-addon input-group-delete">
                <a href={Url.action('user/profile/mobile-number/number/delete')}>
                  <i className="fa fa-remove" />
                </a>
              </div>
            </div>
            <div>
              <a
                href={Url.action('user/profile/add/mobile-number')}
                className="add-number-link"
              >
                <i className="fa fa-plus" />&nbsp;Add a mobile number
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <label
            className="col-sm-3 text-sm-right"
            htmlFor="txt-address"
          >
            Address
          </label>
          <div className="col-sm-9">
            <input type="text" id="txt-address" className="form-control" />
          </div>
        </div>
        <div className="row">
          <label
            className="col-sm-3 text-sm-right"
            htmlFor="txt-address"
          >
            About Yourself
          </label>
          <div className="col-sm-9">
            <textarea
              className="form-control"
              rows="5"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9 offset-sm-3 text-md-right">
            <button
              className="btn btn-primary btn-profile-save"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

EditProfileForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  csrfToken: React.PropTypes.string.isRequired,
};
