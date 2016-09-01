import * as RootController from '../root';
import { MockRequest, MockResponse } from '../../__test-utils__/mocks';

jest.unmock('../root');
jest.unmock('../../__test-utils__/mocks');

/**
 * RootController Tests
 */
describe('RootController', () => {
  let target = null;

  beforeEach(() => {
    target = RootController;
  });

  /**
   * Method: index Tests
   */
  describe('Method: index', () => {
    let req;
    let res;
    beforeEach(() => {
      req = new MockRequest();
      res = new MockResponse();

      target.index(req, res);
    });

    it('should render index view', () => {
      const view = 'index';
      expect(res.render.mock.calls[0][0]).toEqual(view);
    });

    it('should pass a model to the view', () => {
      expect(res.render.mock.calls[0][1]).not.toBe(null);
    });

    it('should set title', () => {
      const title = target.TITLE;
      expect(res.render.mock.calls[0][1].title).toEqual(title);
    });
  });
});
