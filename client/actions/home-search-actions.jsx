import Dispatcher from '../dispatcher';
import HomeSearchConstants from '../constants/home-search-constants';

class HomeSearchActions {
  setSelectedSearchType(searchType) {
    Dispatcher.dispatchViewAction({
      actionType: HomeSearchConstants.SET_SEARCH_TYPE,
      selectedSearchType: searchType,
    });
  }
}

export default new HomeSearchActions();
