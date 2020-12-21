import React, { Component } from 'react'
import { View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Popup from '../Popup/index'
import Toast from '../Toast/index'


class Root extends Component {
  render() {
    return (
      <View 
        ref={c => (this._root = c)}
        {...this.props}
      >
        {this.props.children}
        <Popup
          ref={c => {
            if (c) Popup.popupInstance = c
          }}
        />
        
        <Toast 
          ref={c => {
            if (c) Toast.toastInstance = c
          }}
        />
      </View>
    )
  }
}

Root.propTypes = {
  ...ViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
}

export default Root