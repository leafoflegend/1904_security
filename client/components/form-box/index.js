import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

class FormBox extends Component {
  render() {
    const { children, SubmitButton } = this.props;

    const elements = Children.toArray(children);

    return (
      <div style={styles.container}>
        {elements.map(element => cloneElement(element, { style: styles.row }))}
        <SubmitButton />
      </div>
    );
  }
}

FormBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default FormBox;
