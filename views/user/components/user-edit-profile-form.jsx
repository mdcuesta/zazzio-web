import React from 'react';
import Url from '../../helpers/url-helper';

export default function EditProfileForm(props) {
  // birthday
  const dateOfBirth = props.profile.dateOfBirth;
  const bdayMonth = dateOfBirth !== null ? dateOfBirth.getMonth() + 1 : '';
  const bdayDay = dateOfBirth !== null ? dateOfBirth.getDate() : '';
  const bdayYear = dateOfBirth !== null ? dateOfBirth.getFullYear() : '';
  const dateOptions = [];
  const yearOptions = [];
  const year = new Date().getFullYear();
  for (let i = 1; i <= 31; i++) {
    dateOptions.push(
      <option
        value={i}
        selected={i === bdayDay}
      >
        {i}
      </option>
    );
  }

  for (let i = year - 1; i >= 1930; i--) {
    yearOptions.push(
      <option
        value={i}
        selected={i === bdayYear}
      >
        {i}
      </option>
    );
  }

  function getMonthOption(month, value, selected) {
    return (
      <option
        value={value}
        selected={value === selected}
      >
        {month}
      </option>
    );
  }

  const monthOptions = [
    getMonthOption('January', 1, bdayMonth),
    getMonthOption('February', 2, bdayMonth),
    getMonthOption('March', 3, bdayMonth),
    getMonthOption('April', 4, bdayMonth),
    getMonthOption('May', 5, bdayMonth),
    getMonthOption('June', 6, bdayMonth),
    getMonthOption('July', 7, bdayMonth),
    getMonthOption('August', 8, bdayMonth),
    getMonthOption('September', 9, bdayMonth),
    getMonthOption('October', 10, bdayMonth),
    getMonthOption('November', 11, bdayMonth),
    getMonthOption('December', 12, bdayMonth),
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
              name="firstName"
              value={props.profile.firstName}
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
              name="middleName"
              value={props.profile.middleName}
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
              name="lastName"
              value={props.profile.lastName}
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
              className="form-control select-width-auto"
              name="gender"
            >
              <option
                disabled
                value=""
                selected={props.profile.gender === ''}
              >
                Gender
              </option>
              <option
                value="male"
                selected={props.profile.gender === 'male'}
              >
                Male
              </option>
              <option
                value="female"
                selected={props.profile.gender === 'female'}
              >
                Female
              </option>
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
              className="form-control bday-select col-md-12 select-width-auto"
              name="bdayMonth"
            >
              <option
                disabled
                selected={dateOfBirth === null}
                value=""
              >
                Month
              </option>
              {monthOptions}
            </select>
            <select
              id="select-bday-day"
              className="form-control bday-select col-md-12 select-width-auto"
              name="bdayDate"
            >
              <option
                disabled
                selected={dateOfBirth === null}
                value=""
              >
                Day
              </option>
              {dateOptions}
            </select>
            <select
              id="select-bday-year"
              className="form-control bday-select col-md-12 select-width-auto"
              name="bdayYear"
            >
              <option
                disabled
                selected={dateOfBirth === null}
                value=""
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
          <div
            className="col-sm-9 edit-phone-numbers-container"
            id="phone-numbers-panel"
          >
            <ul className="list-unstyled">
              {props.profile.phoneNumbers.map((p) =>
              (
                <li className="group-mobile">
                  <div className="col-xs-6 col-sm-6 col-md-6 col-lg-8 number">
                    <span>
                      +{p.number}
                    </span>
                  </div>
                  {(p.isVerified ? <VerifiedPane /> : <UnVerifiedPane number={p.number} />)}
                  <div className="col-xs-2 col-sm-2 col-md-2 col-lg-1 number-delete">
                    <a
                      href={Url.action(`user/numbers/${p.number}/delete`)}
                    >
                      <i className="fa fa-remove" />
                    </a>
                  </div>
                </li>
              )
              )}
            </ul>
            <a
              className="edit-number-link"
              href={Url.action('user/numbers/add')}
            >
              <i className="fa fa-plus" />&nbsp;
              Add Mobile Number
            </a>
          </div>
        </div>
        <div className="row">
          <label
            className="col-sm-3 text-sm-right"
            htmlFor="txt-address"
            name="address"
          >
            Address
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              id="txt-address"
              className="form-control"
              value={props.profile.address}
              name="address"
            />
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
              name="about"
              value={props.profile.about}
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
  profile: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  csrfToken: React.PropTypes.string.isRequired,
};

function VerifiedPane() {
  return (
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3 verified">
      <span className="hidden-xs-down">
        Verified&nbsp;
      </span>
      <i className="fa fa-check-square-o" />
    </div>
  );
}

function UnVerifiedPane(props) {
  return (
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3 unverified ">
      <a
        href={Url.action(`user/numbers/${props.number}/request-verify`)}
      >
        Verify
      </a>
    </div>
  );
}

UnVerifiedPane.propTypes = {
  number: React.PropTypes.string.isRequired,
};
