import { Component } from "react";
import PropTypes from "prop-types";

export default class TimeSlicer extends Component {
  idleCallbackId = null;

  static propTypes = { children: PropTypes.node.isRequired };

  componentDidMount() {
    const { children } = this.props;

    this.mounted = true;
    this.previousChildren = children;
  }

  componentDidUpdate() {
    if (this.idleCallbackId) this.cancelNewChildrenRender();
    this.scheduleNewChildrenRender();
  }

  componentWillUnmount() {
    if (this.idleCallbackId) this.cancelNewChildrenRender();
  }

  scheduleNewChildrenRender() {
    const { children } = this.props;

    this.idleCallbackId = requestIdleCallback(() => {
      this.previousChildren = children;
      this.setState({});
    });
  }

  cancelNewChildrenRender() {
    cancelIdleCallback(this.idleCallbackId);
    this.idleCallbackId = null;
  }

  render() {
    const { children } = this.props;

    if (!this.mounted) return children;

    return this.previousChildren;
  }
}
