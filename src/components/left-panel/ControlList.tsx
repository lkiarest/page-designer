import React from 'react'
import elements from '../../controls/antd'
import ElementCategory, { categoryList } from '../../core/element/ElementCategory'
import styles from './index.module.less'
import { ElementContructor } from '../../core/element/IElement'
import ControlItem from './ControlItem'

export default class LeftPanel extends React.Component {
  render() {
    const categoryElements: Map<ElementCategory, [ElementContructor]> = elements.reduce((ret: Map<ElementCategory, [ElementContructor]>, item) => {
      const category = item.category

      if (ret.has(category)) {
        ret.get(category)!.push(item)
      } else {
        ret.set(category, [item])
      }

      return ret
    }, new Map())

    return (
      <div className={styles.panel}>
        {
          categoryList.map(cat => (
            <div key={cat.title} className={styles.categroy}>
              <div className={styles.categroy__title}>{cat.title}</div>
              <div className={styles.categroy__body}>
                {
                  categoryElements.get(cat.type) ? categoryElements.get(cat.type)!.map(elem => (
                    <ControlItem key={elem.displayName} control={elem} />
                  )) : null
                }
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
