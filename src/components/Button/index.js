import React from 'react'
import classnames from 'classnames'
import styles from './index.module.css'

export default function Button({children, primary, onClick}) {

  const className = classnames(styles.button, {
    [styles.primary]: !!primary
  });

  return (
    <button className={className} onClick={onClick}>{children}</button>
  )
}
