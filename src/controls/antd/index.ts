/**
 * 导出所有控件类型
 */
import PlainText from './PlainText'
import Link from './Link'
import Input from './Input'
import TextArea from './TextArea'
import Select from './Select'
import TreeSelect from './TreeSelect'
import Row from './Row'
import Col from './Col'
import Form from './Form'
import Button from './Button'
import Icon from './Icon'
import Radio from './Radio'
import Checkbox from './Checkbox'
import Switch from './Switch'
import Cascader from './Cascader'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import Rate from './Rate'
import Slider from './Slider'
import Transfer from './Transfer'
// import Affix from './Affix'
// import Breadcrumb from './Breadcrumb'
// import Dropdown from './Dropdown'
import Menu from './Menu'
import Pagination from './Pagination'
import PageHeader from './PageHeader'
import Steps from './Steps'
// new-comp-import - 不要删除或修改此行，用于自动生成组件
import { ElementContructor } from '../../core/element/IElement'

const elements: Array<ElementContructor> = [
  Icon,
  PlainText,
  Link,
  Button,
  Form,
  Input,
  TextArea,
  Select,
  // TreeSelect,
  Row,
  Col,
  Radio,
  Checkbox,
  Switch,
  // Cascader,
  DatePicker,
  TimePicker,
  Slider,
  Rate,
  // Transfer,
  // // Affix,
  // // Breadcrumb,
  // // Dropdown,
  // Menu,
  // Pagination,
  // PageHeader,
  // Steps,
  // new-comp-list - 不要删除或修改此行，用于自动生成组件
]

export default elements
