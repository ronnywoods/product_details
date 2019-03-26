import React, { Component } from 'react';
import SmPicture from './SmPicture';

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user1: false,
      user2: false,
      user3: false,
      user4: false,
      user5: false,
    };

    this.handleEnter1 = this.handleEnter1.bind(this);
    this.handleLeave1 = this.handleLeave1.bind(this);
    this.handleEnter2 = this.handleEnter2.bind(this);
    this.handleLeave2 = this.handleLeave2.bind(this);
    this.handleEnter3 = this.handleEnter3.bind(this);
    this.handleLeave3 = this.handleLeave3.bind(this);
    this.handleEnter4 = this.handleEnter4.bind(this);
    this.handleLeave4 = this.handleLeave4.bind(this);
    this.handleEnter5 = this.handleEnter5.bind(this);
    this.handleLeave5 = this.handleLeave5.bind(this);
  }

  handleEnter1() {
    this.setState({ user1: true });
  }

  handleLeave1() {
    this.setState({ user1: false });
  }

  handleEnter2() {
    this.setState({ user2: true });
  }

  handleLeave2() {
    this.setState({ user2: false });
  }

  handleEnter3() {
    this.setState({ user3: true });
  }

  handleLeave3() {
    this.setState({ user3: false });
  }

  handleEnter4() {
    this.setState({ user4: true });
  }

  handleLeave4() {
    this.setState({ user4: false });
  }

  handleEnter5() {
    this.setState({ user5: true });
  }

  handleLeave5() {
    this.setState({ user5: false });
  }

  render() {
    const class1 = this.state.user1 ? 'share-username' : 'share-username hidden';
    const class2 = this.state.user2 ? 'share-username' : 'share-username hidden';
    const class3 = this.state.user3 ? 'share-username' : 'share-username hidden';
    const class4 = this.state.user4 ? 'share-username' : 'share-username hidden';
    const class5 = this.state.user5 ? 'share-username' : 'share-username hidden';

    return (
      <div className="share">
        <div className="title-1000">
          <h1> SHARE HOW YOU WEAR IT </h1>
          <p className="share-desc">
          Share a photo of your adidas favorite and appear in our showcase
          below. Make sure to tag your image with @adidas
          </p>
        </div>
        <div className="col-2-12 justify-content-center share-photo">
          <ul>
            <li>
              <div className="overlay-blk" onMouseEnter={this.handleEnter1} onMouseLeave={this.handleLeave1}>
                <img className="lrg-share img-fluid" src={this.props.shares.img1} />
              </div>
              <span className={class1}>{this.props.shares.user1}</span>
            </li>
          </ul>
          <ul>
            <SmPicture
              enter={this.handleEnter2}
              leave={this.handleLeave2}
              user={this.props.shares.user2}
              img={this.props.shares.img2}
              class={class2}
            />
            <SmPicture
              enter={this.handleEnter3}
              leave={this.handleLeave3}
              user={this.props.shares.user3}
              img={this.props.shares.img3}
              class={class3}
            />
          </ul>
          <ul>
            <SmPicture
              enter={this.handleEnter4}
              leave={this.handleLeave4}
              user={this.props.shares.user4}
              img={this.props.shares.img4}
              class={class4}
            />
            <SmPicture
              enter={this.handleEnter5}
              leave={this.handleLeave5}
              user={this.props.shares.user5}
              img={this.props.shares.img5}
              class={class5}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default Share;
