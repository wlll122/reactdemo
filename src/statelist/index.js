import { Component } from 'react';
// 保证所有组件的数据来自父组件
// 转换函数
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {

    if (props.celsius >= 100) {
        return <p>this water would boil.</p>
    }
    return <p>this water would not boil</p>
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}
class TemperatureInput extends Component {
    constructor(props) {
        super(props)
        this.state = { temperature: '' }
    }
    handleChange(e) {
        // 调用方法父级方法
        this.props.onTemperatureChange(e.target.value)
    }
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale
        return (
            <div>
                <header>输入温度数值 in  {scaleNames[scale]}</header>
                <input value={temperature} onChange={(e) => this.handleChange(e)} />
            </div>
        )
    }
}

// 使用context
function ToolBar(props) {
    return (
        <div>
            <ThemedButton theme={props.theme} />
        </div>
    )
}
// 数据按钮
class ThemedButton extends Component {
    render() {
        return <button theme={this.props.theme}>点击切换</button>
    }
}


class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = { temperature: '', scale: 'c' };
    }
    handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature })
    }
    handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature })
    }
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput scale='c'
                    temperature={celsius}
                    onTemperatureChange={(e) => this.handleCelsiusChange(e)}
                />
                <TemperatureInput scale='f'
                    temperature={fahrenheit}
                    onTemperatureChange={(e) => this.handleFahrenheitChange(e)}
                />
                <BoilingVerdict celsius={parseFloat(celsius)} />
                <ToolBar thtme='dark'/>
            </div>
        )
    }

}
export default Calculator