import React, { Component } from 'react'
import PropTypes from 'prop-types'

const defaultSize = 300

const style = {
  container: {
    display: 'inline-block',
    overflow: 'hidden',
    verticalAlign: 'top',
    background: '#f6f6f6',
    position: 'relative'
  },
  a: {
    display: 'block'
  }
}

class _Image extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.onError != nextProps.onError || this.props.src != nextProps.src) {
      return true
    }
    return false
  }
  render() {
    return (
      <img
        width='100%'
        src={this.props.src}
        data-src={this.props.src}
        onError={this.props.onError}
        style={{ display: 'block' }}
      />
    )
  }
}

export default class Image extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    url: PropTypes.string,
    href: PropTypes.string
  }
  static defaultProps = {
    href: 'javascript:void(0)'
  }
  constructor(props) {
    super(props)
    this.state = {
      src: props.src,
      error: false
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.state.src != nextProps.src) {
      this.setState({ src: nextProps.src, error: false })
    }
  }

  onError = event => {
    this.setState({ error: true })
  }

  render() {
    const imgProps = Object.assign({}, this.props)
    const width = imgProps.width || 'auto'
    const height = imgProps.height || 'auto'
    if (imgProps.src) {
      delete imgProps.src
    }
    if (imgProps.width && imgProps.height) {
      delete imgProps.height
    }
    const imgStyle = {
      width: width,
      height: height
    }
    Object.assign(imgStyle, style.container, this.props.style || {}, {
      border: (this.state.error ? '0.02rem' : '0rem') + ' dashed #f6f6f6'
    })
    return (
      <div style={imgStyle}>
        {this.state.error ? null : (
          <a style={style.a} href={this.getHref()}>
            <_Image src={this.state.src} onError={this.onError}></_Image>
          </a>
        )}
      </div>
    )
  }

  getHref = () => {
    if (this.props.href && this.props.href.length > 0) {
      return this.props.href
    }
    return 'javascript:void(0)'
  }
}
