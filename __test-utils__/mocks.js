/* eslint-disable */
/**
 * MockRequest
 * Used for Mocking Express Request
 */
export class MockRequest {}

/**
 * MockResponse
 * Used for Mocking Express Response
 */
export class MockResponse {}
MockResponse.prototype.redirect = jest.fn();
MockResponse.prototype.render = jest.fn();