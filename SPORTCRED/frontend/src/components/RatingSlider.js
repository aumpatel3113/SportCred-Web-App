import React from 'react';
import styled from 'styled-components';

const sliderThumbStyles = () => (`
  width: 20px;
  height: 20px;
  background: #f2d0ae;
  border-radius: 20px 20px;
  cursor: pointer;
  border: 2.5px solid #945625;
  -webkit-transition: .2s;
  transition: opacity .2s;
`);

const Styles = styled.div`
  align-items: center;
  color: rgb(206, 206, 206);
  margin-top: 0vh;
  margin-bottom: 1vh;

  .value {
    flex: 1;
    font-size: 14px;
    padding-top: 1vh;
    font-family: 'Noto Sans JP', sans-serif;
  }

  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 60%;
    height: 4px;
    border-radius: 5px;
    background: rgb(190, 125, 72);
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props)}
    }

    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }
`;

export default class Slider extends React.Component {
    state = {
        value: this.props.ratingValue
    }

    handleOnChange = (e) => {
        const { value } = e.target;
        this.props.handleRatingUpdate(this.props.postNum, value);
        this.setState({ value });
    }

    render() {
        return (
            <Styles >
                <div><input type="range" min={0} max={100} value={this.state.value} className="slider" onChange={this.handleOnChange} /></div>
                <div className="value">Score: {this.state.value}</div>
            </Styles>
        )
    }
}