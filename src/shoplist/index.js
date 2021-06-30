import { Component } from 'react';
import './index.css'

function Header() {
    return <h1>使用header</h1>
}
function Clock(props) {
    return (
        <div className='clock'>
            <h1>Clocks</h1>
            <h3>It is {props.date.toLocaleTimeString()}</h3>
        </div>
    )
}

// 类名组件

class NewClocks extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(), count: 0 };
        this.handleClick = this.handleClick.bind(this)
    }
    tick() {
        // 重新设定state值,不能直接修改state数值
        this.setState({
            date: new Date()
        })
    }
    componentDidMount() {
        console.log('组件设置之后');
        this.timerid = setInterval(() => {
            this.tick();
        }, 1000)
    }
    componentWillUnmount() {
        console.log('组件即将卸载');
        clearInterval(this.timerid)
    }
    handleClick(val, vals) {
        console.log(val);
        console.log(vals);
        this.setState({
            count: 100
        })
    }
    render() {
        return (
            <div className='clock'>
                {/* 使用箭头函数可以忽略this绑定问题 */}
                <h3 onClick={(e) => this.handleClick('组件id', e)}> headers-组件化 </h3>
                当前的时间 {this.state.date.toLocaleString()}
                <h3>
                    当前数值{this.state.count}
                </h3>
            </div>
        )
    }
}

//条件渲染
function UserGreeting() {
    return <h1>welcome back!</h1>
}
function GustGreeseting() {
    return <h1>plase sign up!</h1>
}
function GettingGrop(val) {
    if (val.isLogin) {
        return <UserGreeting />
    }
    return <GustGreeseting />
}
// 列表渲染
function ListRender() {
    const arr = [1, 2, 1, 2, 1, 2, 1, 4];
    // 必须添加key值,key值应该由父级组件提供
    const itemlist = arr.map((e, ind) => {
        return <li key={ind.toString()}>{e}</li>
    })
    return (
        <ul>
            {itemlist}
        </ul>
    )
}
// 表单组件

class NameFrom extends Component {
    constructor(props) {
        super(props)
        this.state = { value: '', textearea: '' }
    }
    handleSubmit(e) {
        console.log(this.state.value);
    }
    handlechange(e) {
        console.log(e);
        this.setState({
            value: e.target.value
        })
    }
    handleArea(e) {
        this.setState({
            textearea: e.target.value
        })
    }
    render() {
        return (
            <from onSubmit={() => { this.handleSubmit() }}>
                <label >
                    <input type="text" value={this.state.value} onChange={(e) => { this.handlechange(e) }} />
                </label>
                <input type="submit" value="提交" />
                <label >
                    文章:
                    <textarea value={this.state.textearea} onChange={e => { this.handleArea(e) }} cols="30" rows="10">
                    </textarea>
                </label>
            </from>
        )
    }
}
// 温度
function BoilingVerdict(props){
    if (props.celsius >= 100) {
        return <p>the water would boil</p>
    }
    return <p>this water not boil</p>
}
// 温度展示组件
class Calculator extends Component{
    constructor(props){
        super(props)
        this.state = { temerature: ''}
    }
    handleChange(e){
        this.setState({
            temerature:e.target.value
        })
    }
    render(){
        const temerature = this.state.temerature;
        return (
            <div>
                <div>
                    Enter temperature in case:
                </div>
                <input value={temerature} onChange={(e) => this.handleChange(e)}/>
                <BoilingVerdict celsius={parseFloat(temerature)}/>
            </div>
        )
    }

}

// 抽离组件
const scaleName = {
    c:'Celsius',
    f:'Fahrenheit'
}
// 转换函数
function toCel(fahrenheit){
    return (fahrenheit -32) * 5 / 9;
}
function toHrea(celsius){
    return (celsius * 9 / 5) + 32;
}
// 处理方法
function tryConvert(temperature,convert){
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return ''
    }
    const output = convert(input)
    const rounded = Math.round(output * 1000) /1000;
    return rounded.toString();
}
class TemperatureInput extends Component{
    constructor(props){
        super(props)
        this.state = {temperature : ''}
    }
    handleChange(e){
        this.setState({
            temperature:e.target.value
        })
    }
    render(){
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
            <div>
                Enter temperature in {scaleName[scale]}
                <div>
                    <input value={temperature} onChange={(e) => this.handleChange(e)} />
                </div>
            </div>
        )
    }
}
class TemplateGrop extends Component{
    render(){
        return (
            <div>
                <TemperatureInput scale='c'/>
                <TemperatureInput scale='f'/>
            </div>
        )
    }
}

class ShopList extends Component {
    constructor(props) {
        super(props)
        this.state = { isShow: false }
    }
    handleChange() {
        // 修改组件状态
        this.setState({
            isShow: !this.state.isShow
        })
    }
    render() {
        return (
            <div className='lsit-tab'>
                <h1>Shopping List for {this.props.name}</h1>
                <Header />
                <Clock date={new Date()} />
                <NewClocks />
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>

                <button onClick={() => { this.handleChange() }}> 切换状态 </button>
                <GettingGrop isLogin={this.state.isShow} />
                <ListRender />
                <NameFrom />
                <Calculator/>
                <br />
                <TemplateGrop/>
            </div>
        )
    }
}

export default ShopList;