/**
 * 状态变化记录，
 * 可基于此模块实现 redo/undo 功能
 */
import deepEqual from 'lodash.isequal'

type RecordType<T> = {
  time: Date,
  value: T,
}

// 默认可记录 100 条操作
const DEFAULT_SIZE: number = 100

class Records<T> {
  // 记录列表
  _recordList: Array<RecordType<T>> = []
  // 当前位置
  _current: number = -1
  // 保存列表最大长度
  size: number = 0

  constructor({ size = DEFAULT_SIZE } = {}) {
    this.size = size
  }

  // 增加记录
  add(value: T) {
    // 防止重复添加
    if (!value || deepEqual(this.getValue(), value)) {
      return
    }

    // 超出限制大小，删除旧的元素
    if (this._recordList.length === this.size) {
      this._recordList.shift()
    }

    this._recordList.push({
      time: new Date(),
      value
    })

    // 调整队列
    this._current = this._current + 1
    this._recordList.length = this._current + 1
  }

  hasPrev(): boolean {
    return this._current > 0
  }

  hasNext(): boolean {
    return this._current < this._recordList.length - 1
  }

  prev(): T | undefined {
    if (!this.hasPrev()) {
      return undefined
    }

    this.setCurrent(this._current - 1)
    return this.getValue()
  }

  next(): T | undefined {
    if (!this.hasNext()) {
      return undefined
    }

    this.setCurrent(this._current + 1)
    return this.getValue()
  }

  // 获取当前记录点的值
  getValue(): T | undefined {
    if (this._current < 0 || this._current >= this._recordList.length) {
      return undefined
    }

    // console.log('current', this._current)
    return this._recordList[this._current] && this._recordList[this._current].value
  }

  // 设置当前记录点
  setCurrent(current: number): boolean {
    if (current < 0 || current >= this._recordList.length) {
      return false
    }

    this._current = current
    return true
  }
}

export default Records
