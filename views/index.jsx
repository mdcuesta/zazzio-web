'use strict';

import React, {Component} from 'react';
import DefaultLayout from './layout';
import HomeSearch from './components/home-search';
import NavBar from './components/navbar';

/**
 * Index View
 */
export default class Index extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const textFacebookLogin = 'Log in with Facebook';
    const hrefLogin = '/login/facebook';

    const text = (<p>
          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt diam vel leo venenatis suscipit. Sed commodo viverra massa sed facilisis. Phasellus vel lacus enim. Integer ultricies scelerisque diam at tincidunt. Sed tincidunt, mi nec fermentum faucibus, lectus lectus aliquet risus, a semper ante lectus vel felis. Quisque sed orci est. Mauris varius dolor velit, a maximus dui interdum nec. Sed consectetur metus in sapien finibus cursus ut quis dolor. Sed aliquet at arcu sit amet gravida. Curabitur eu ullamcorper mauris. Phasellus molestie aliquet porttitor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Mauris metus ex, egestas et maximus vitae, aliquet a justo. Curabitur ultricies metus at massa tempor fermentum. Etiam at ullamcorper odio. Aenean quis commodo leo. Proin porttitor erat sit amet ligula pharetra vulputate. Aliquam in hendrerit est. Quisque molestie accumsan justo, a euismod orci dictum sit amet. Phasellus sed risus mauris.

Aliquam id tempus massa, in dictum lacus. In sapien leo, luctus eu feugiat volutpat, semper eu ligula. In mattis ornare diam. In hac habitasse platea dictumst. In at erat magna. Maecenas dictum turpis eget porttitor imperdiet. Sed orci sapien, lacinia non ornare at, fringilla ut lorem. Curabitur in sagittis orci. Mauris vel ante at est tempus volutpat. Ut magna leo, tempus ac dui in, tristique auctor quam. Donec eu egestas nisl. Sed et mattis tortor, eget elementum elit. Nulla ultrices eleifend diam id vehicula.

Ut vel enim vestibulum, fermentum libero venenatis, commodo nisi. Pellentesque vulputate sem egestas, ullamcorper nulla id, convallis mauris. Aliquam ac congue sem. Donec porta justo vitae rhoncus finibus. In faucibus tellus at fringilla volutpat. Nulla vel urna sit amet eros vestibulum egestas. Nam sodales vitae orci a molestie. Maecenas vel odio in tortor ultricies malesuada nec non mauris. Suspendisse imperdiet volutpat scelerisque. Praesent nunc metus, suscipit id sem ut, vehicula lacinia velit.

Sed id efficitur ante. Integer vitae efficitur est, vitae tempus sem. Aenean pharetra, mauris at lobortis feugiat, metus lectus molestie turpis, at consectetur purus justo in dui. Duis a lobortis ligula, eu molestie tellus. Nunc euismod nisl sapien, ac auctor eros ornare elementum. Sed dictum eros volutpat ex bibendum, sit amet molestie turpis porta. Donec vitae sagittis purus. Sed id nibh suscipit, pulvinar nisl ut, aliquet augue. Nullam sem lacus, efficitur eu nibh eu, blandit placerat odio. Vestibulum congue tincidunt mi, vitae imperdiet quam cursus nec. Donec mollis suscipit aliquam. Fusce ut sem id velit fringilla porta sit amet et libero.
        </p>);

    return(
      <DefaultLayout title={this.props.title} 
                     jsbundle = '/javascripts/index.js'
                     cssbundle = '/stylesheets/index.css'>
        <NavBar />
        <HomeSearch />
        
        <div id='content'></div>
      </DefaultLayout>
    );
  }
};