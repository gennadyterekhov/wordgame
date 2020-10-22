'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { likesNumber: 0 };
  }

  render() {
    return e(
      'button',
      { onClick: () => this.setState({ likesNumber: this.state.likesNumber + 1 }) },
      'Likes: ' + String(this.state.likesNumber)
    );
  }
}


const domContainer = document.querySelector('#reactRoot');
ReactDOM.render(e(LikeButton), domContainer);