'use strict';

jest.unmock('../root');

import * as Root from '../root';
esimport {MockRequest, MockResponse} from '../../__test-utils__/mocks';

/**
 * RootController Tests
 */
describe('RootController', () => {

  let target = null;  

  beforeEach(() => {
    target = new Root.RootController();
  });

  /**
   * Method: index Tests
   */
  describe('Method: index', () => {
    let req, res;
    
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
      const title = Root.TITLE;
      expect(res.render.mock.calls[0][1].title).toEqual(title);
    });
  });
});