import './style/tc.css';
import React from 'react';
import {destinationEntryMode, scratchpadDate, presentTimeSeconds} from './main.jsx';

class TimeCircuitLayer extends React.Component {
    constructor(props){ 
        super(props) 
            
        // Set initial state 
        this.state = {isRed: this.props.colour == "red"} 
        }

    render (){
        let secondsMod = presentTimeSeconds % 2;
        let colourIfOn = ((this.state.isRed && destinationEntryMode) ? "red-tc-entry-mode" : this.props.colour);

        return (
            <div className={"tc"} onClick={this.props.colour == "red" ? (() => this.askDestinationTime()) : null}>
                <div className="tc_sub">
                    <div className="preMonthGap"/>
                    <div className="month">
                        <div className="dymo dymoRed monthDymo">
                            MONTH
                        </div>
                        <div className={"timeCircuitReadout " + colourIfOn}>
                            {(destinationEntryMode && this.props.colour == "red") ? scratchpadDate.format().month : this.props.time.format().month}
                        </div>
                    </div>
                    <div className="preDayGap"/>
                    <div className="day">
                        <div className="dymo dymoRed dayDymo">
                            DAY
                        </div>
                        <div className={"timeCircuitReadout " + colourIfOn}>
                        {(destinationEntryMode && this.props.colour == "red") ? scratchpadDate.format().day : this.props.time.format().day}
                        </div>
                    </div>
                    <div className="preYearGap"/>
                    <div className="year">
                        <div className="dymo dymoRed yearDymo">
                            YEAR
                        </div>
                        <div className={"timeCircuitReadout " + colourIfOn}>
                            {(destinationEntryMode && this.props.colour == "red") ? scratchpadDate.format().year : this.props.time.format().year}
                        </div>
                    </div>
                    <div className="amPmGap">
                        <div className="dymo dymoRed amLabel">
                            AM
                        </div>
                        <div className={colourIfOn + " amPmIndicator " + (((destinationEntryMode && this.state.isRed) ? scratchpadDate.isAm() : this.props.time.isAm()) ? "" : "off")}>
                        ·
                        </div>
                        <div className="dymo dymoRed pmLabel">
                            PM
                        </div>
                        <div className={colourIfOn + " amPmIndicator " + (((destinationEntryMode && this.state.isRed) ? scratchpadDate.isPm() : this.props.time.isPm()) ? "" : "off")}>
                        ·
                        </div>
                    </div>
                    <div className="hour">
                        <div className="dymo dymoRed hourDymo">
                            HOUR
                        </div>
                        <div className={"timeCircuitReadout " + colourIfOn}>
                            {(destinationEntryMode && this.state.isRed) ? scratchpadDate.format().hour : this.props.time.format().hour}
                        </div>
                    </div>
                    <div className={((secondsMod == 0) || destinationEntryMode ? colourIfOn : "off") + " secondsIndicatorGap"}>
                        :
                    </div>
                    <div className="minute">
                        <div className="dymo dymoRed minDymo">
                            MIN
                        </div>
                        <div className={"timeCircuitReadout " + colourIfOn}>
                            {(destinationEntryMode && this.state.isRed) ? scratchpadDate.format().minute : this.props.time.format().minute}
                        </div>
                    </div>
                </div>
                <div className="tc_sub dymoBlackContainer">
                    <div className="dymo dymoBlack">
                        {this.props.name}
                    </div>
                </div>
            </div>
          );
    }
}

export default TimeCircuitLayer;
