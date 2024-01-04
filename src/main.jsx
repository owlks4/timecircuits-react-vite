import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.css';
import './style/tc.css';
import TimeCircuitLayer from './timecircuitLayer.jsx';
import ComicPanelBox from './comicPanelBox.jsx';
import CarPedal from './carPedal.jsx';
import Speedometer from './speedometer.jsx';
import FluxCapacitor from './fluxCapacitor.jsx';
import Book from './book.jsx';
import Keypad from './keypad.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

let destinationEntryMode = false;
let typedDigits = "";

function setDestinationEntryMode(b){
  destinationEntryMode = b;
}

let keysVisuallyDown = [false,false,false,
                        false,false,false,
                        false,false,false,
                        false,false,false];

document.onkeydown = function (e) {
  if (inputCharIsNumeric(e.key)){
    keypadPress(e.key);
    keysVisuallyDown[parseInt(e.key)] = true;
  }
  else if (e.key == "Backspace" || e.key == "." || e.key == "Delete"){
    keypadBackspace()
    keysVisuallyDown[10] = true;
  } else if (e.key == "Enter"){
    keysVisuallyDown[11] = true;
    keypadEnter()
  }
};

document.onkeyup = function (e) {
  if (inputCharIsNumeric(e.key)){
    keysVisuallyDown[parseInt(e.key)] = false;
  } else if (e.key == "Backspace" || e.key == "." || e.key == "Delete"){
    keysVisuallyDown[10] = false;
  } else if (e.key == "Enter"){
    keysVisuallyDown[11] = false;
  }
}

function inputCharIsNumeric(c){
  let asByte = c.charCodeAt(0)
  return asByte >= 0x30 && asByte <= 0x39;
}

function keypadPress(input){
  let key = input[0];

  if (inputCharIsNumeric(key)){ //if input char is numeric
    if (typedDigits.length < 12){
      typedDigits += key+"";
      scratchpadDate = getTimeFromString(typedDigits);
    }
  } else {
      if (key == '←'){
        keypadBackspace();
      } else if (key == '✓'){
        keypadEnter();
      }
    }

    if (typedDigits.length > 0){
      destinationEntryMode = true;
    }
}

function keypadBackspace(){
  typedDigits = typedDigits.slice(0,typedDigits.length - 1);
  scratchpadDate = getTimeFromString(typedDigits);
  if (typedDigits.length < 1){
    destinationEntryMode = false;
  }
}

function keypadEnter(){
  destinationTime = getTimeFromStringAndFillInTemplate(typedDigits,destinationTime);
  typedDigits = "";
  scratchpadDate = new Time(-1,-1,-1,-1,-1);
  destinationEntryMode = false;
}

function getMaxDayForMonth(y,m){
  let maxDay = 31;

  switch (m){
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      maxDay = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      maxDay = 30;
      break;
    default:
    if (isLeapYear(y)){
      maxDay = 29;
    } else {
      maxDay = 28;
    }
  }

  return maxDay;
}

function isLeapYear(y){
  if (y % 4 == 0){
    if (y % 100 == 0){
      if (y % 400 == 0){
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}

function getTimeFromStringAndFillInTemplate(s,t){

  if (s.length >= 2){
    t.month = parseInt(s.slice(0,2));
    if (t.month < 1){
      t.month = 1;
    } else if (t.month > 12){
      t.month = 12;
    }
  }

  if (s.length >= 4){
    t.day = parseInt(s.slice(2,4));
  }

  if (s.length >= 8){
    t.year = parseInt(s.slice(4,8));
  }

  if (s.length >= 10){
    t.hour = parseInt(s.slice(8,10));
    if (t.hour > 23){
      t.hour = 23;
    }
  }

  if (s.length >= 12){
    t.minute = parseInt(s.slice(10,12));
    if (t.minute > 59){
      t.minute = 59;
    }
  }

  let maxDayForMonth = getMaxDayForMonth(t.year, t.month)

  if (t.day > maxDayForMonth){
    t.day = maxDayForMonth;
  }

  return t;
}

function getTimeFromString(s){
  return getTimeFromStringAndFillInTemplate(s,new Time(-1,-1,-1,-1,-1))
}

class Time {
  constructor(month,day,year,hour,minute){
    this.month = month;
    this.day = day;
    this.year = year;
    this.hour = hour;
    this.minute = minute;
  }

  format(){
    return ({
      month: this.month == -1 ? "   " : (this.month == 0 ? months[0] : months[this.month-1]),
      day: this.day == -1 ? "   " : (this.day.toString().padStart(2,'0').replaceAll("1"," 1")),
      year: this.year == -1 ? "   " : (this.year.toString().padStart(4,'0').replaceAll("1"," 1")),
      hour: this.hour == -1 ? "   " : ((this.hour <= 12 ? this.hour : this.hour - 12).toString().padStart(2,'0').replaceAll("1"," 1")),
      minute: this.minute == -1 ? "   " : (this.minute.toString().padStart(2,'0').replaceAll("1"," 1"))
    });
  }

  isAm(){
    if (this.hour < 12){
      return true;
    }
    return false;
  }

  isPm(){
    return !this.isAm();
  }

  incrementMinute(){
    this.minute ++;
    if (this.minute >= 60){
      this.minute = 0;
      this.incrementHour();
    }
  }

  incrementHour(){
    this.hour ++;
    if (this.hour >= 24){
      this.hour = 0;
      this.incrementDay();
    }
  }

  incrementDay(){
    this.day++;
    if (this.day > getMaxDayForMonth(this.year, this.month)){
        this.day = 1;
        this.incrementMonth();
      }
  }

  incrementMonth(){
    this.month++;
    if (this.month >= 12){
      this.month = 1;
      this.year++;
    }
  } 
}

 

let destinationTime = new Time(10,26,1985,1,35);
let realDate = new Date();
let presentTime = new Time(realDate.getMonth()+1,
                           realDate.getDate(),
                           realDate.getFullYear(),
                           realDate.getHours(),
                           realDate.getMinutes());
let presentTimeSeconds = realDate.getSeconds();
let lastTimeDeparted = new Time(11,12,1955,22,4);
let scratchpadDate = new Time(-1,-1,-1,-1,-1);

function getDestinationTime(){
  return destinationTime.format();
}

function getPresentTime(){
  return presentTime.format();
}

function getLastTimeDeparted(){
  return lastTimeDeparted.format();
}

function secondPasses(){
  presentTimeSeconds += 1;
  if (presentTimeSeconds >= 60){
    presentTimeSeconds = 0;
    presentTime.incrementMinute();
  }
}

let secondsLastCheckedAt = 0;

function App() {
  const [frameTime, setFrameTime] = React.useState(Date.now());

  useEffect(() => {
    let frameId;
    const frame = time => {
      setFrameTime(time);
      frameId = requestAnimationFrame(frame);
      if (time >= secondsLastCheckedAt + 1000){
        secondsLastCheckedAt = time;
        secondPasses();
      }
    }
    requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (<main>
    <div className="thirdWidth">
      <div className="comic-panels-flex-container" id="firstColumn">
        <ComicPanelBox className="halfHeight" id="topLeftBox">
        Plutonium etc here
        </ComicPanelBox>
        <ComicPanelBox className="halfHeight" id="topLeftBox">
        <Book>
        </Book>
        </ComicPanelBox>
      </div>
    </div>
    <div className="thirdWidth">
      <div className="comic-panels-flex-container" id="secondColumn">
        <ComicPanelBox className="thirdHeight" id="topCentreBox">
          Profile view of car here with parallax background
        </ComicPanelBox>
        <ComicPanelBox className="thirdHeight">
          <div className="tc_full">
              <TimeCircuitLayer time = {destinationTime} colour="red" name="DESTINATION TIME"/>
              <TimeCircuitLayer time = {presentTime} colour = "green" name="PRESENT TIME"/>
              <TimeCircuitLayer time = {lastTimeDeparted} colour = "yellow" name="LAST TIME DEPARTED"/>
          </div>
         
        </ComicPanelBox>
        <ComicPanelBox className="thirdHeight almost-black" id="topCentreBox">
          <div className="inline-block">
            <Speedometer/>
            <br/>
            <div className="inline-block">
              Movable key like the
              <br/>
              Papers Please key
            </div>
            <div id="ignition">
              <div id="keyhole"/>
            </div>            
          </div>
          <div className="inline-block">
            time circuits switch
            <br/>
            <br/>
            <br/>
            <br/>
          </div>
          <div className="inline-block float-right">
            <CarPedal id="accelerator"/>
            <CarPedal id="brake"/>            
          </div>
        </ComicPanelBox>
      </div>
    </div>
    <div className="thirdWidth vAlignTop">
      <div className="comic-panels-flex-container" id="firstColumn">
      <ComicPanelBox className="halfHeight" id="topLeftBox">
      <div className="flex-container">
          <div className="halfWidth fullHeight">
          Digital terminal screen (for telling you what your current next steps are/giving an introduction to the project at the beginning)
          </div>
          <div className="halfWidth fullHeight">
          Doc's notebook explaining the fictional logic behind the car
          </div>
        </div>
        </ComicPanelBox>
      <ComicPanelBox className="halfHeight" id="topLeftBox">
        <div className="flex-container">
          <div className="halfWidth fullHeight">
          <Keypad keysVisuallyDown={keysVisuallyDown}></Keypad>
          </div>
          <div className="halfWidth fullHeight">
            <FluxCapacitor/>          
          </div>
        </div>
        </ComicPanelBox>
      </div>
    </div>
  </main>);
}

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

export {keypadPress,scratchpadDate,destinationEntryMode,setDestinationEntryMode,presentTimeSeconds}