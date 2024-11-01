import React from 'react';

// const timeElement = document.getElementById('time-left');

class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      session: 'session',
      break: 'break',
      isPause: true,
      isPlaying: 'session',
      breakLength: 5,
      sessionLength: 25,
      timer: 1500,
      mins: 25,
      times: 25 * 60,
    }
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleCountdown = this.handleCountdown.bind(this);
    this.handlePlayStop = this.handlePlayStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  

  componentDidMount() {
    this.interval = setInterval(() => {
      
        this.handleCountdown()
      
      
    }, 1000);
  }
  componentWillUnmount() { 
    clearInterval(this.interval);
  }
  
  handleIncrement(e){
    
    if(this.state.breakLength < 60 && e.target.value == 'break'){
      
      this.setState({
        breakLength: this.state.breakLength + 1,
      });
      
    }
    else if(this.state.sessionLength < 60 && e.target.value == 'session'){
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        times: (this.state.sessionLength + 1) * 60 
      });
    }
    
  }
  handleDecrement(e){
    if(this.state.breakLength > 1 && e.target.value == 'break'){
      this.setState({
        breakLength: this.state.breakLength - 1, 
      });
    }
    else if(this.state.sessionLength > 1 && e.target.value == 'session'){
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        times: (this.state.sessionLength - 1) * 60
      });
    }
  }
  
  handleCountdown(){
    
    
    let minutes = Math.floor(this.state.times / 60);
    let seconds = this.state.times % 60;
    
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('time-left').innerHTML = `<b>${minutes}</b>:<b>${seconds}</b>`;
   // document.getElementById('time-left').innerHTML = `${minutes}:${seconds}`;
    
    if(this.state.times > -1 && !this.state.isPause) {
      this.setState({times: this.state.times - 1});
      
    }
    if(this.state.times === -1){
      let myAudio = document.getElementById('beep');
      myAudio.currentTime = 0;
      myAudio.play();
      setTimeout(() => myAudio.play(), 1000);
      
     
        if(this.state.isPlaying !== 'session'){
          this.setState({
            isPlaying: 'session',
            times: (this.state.sessionLength ) * 60,
            
          })
        }else{
          this.setState({
            isPlaying: 'break',
            times: (this.state.breakLength) * 60,  
          })
        }
        
        
        
        
    }
  }
  
  handlePlayStop(){
    if(this.state.isPause === false){
      this.setState({
        isPause: true
      });
    }else{
      this.setState({
        isPause: false
      });
    }
    console.log(this.state.isPause)
  }
  
  handleReset(){
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      times: 25 * 60,
      isPause: true,
      isPlaying: 'session'
    });
    console.log("reset");
    let myAudio = document.getElementById('beep');
      myAudio.pause();
      myAudio.currentTime = 0;
  }
  
  
  render(){
    
    return(
      <div className="container">
        <div className="row" id="setLength-div">
          {/* For Break-Length  */}
          <div className="length-div"> 
            <div className="upper-row">
              <p id="break-label" className="upper-label">Break Length</p>
            </div>
            <div className="lower-row">
              <button id="break-decrement" className="btn btn-dark" onClick={(e)=>this.handleDecrement(e, 'value')} value={this.state.break} disabled={(!this.state.isPause)}><i className="fa-solid fa-circle-arrow-down fa-xl" disabled></i></button>
              <input type="number" id="break-length" className="input-length" value={this.state.breakLength}  min="1" max="60"  disabled/>
              <button id="break-increment" className="btn btn-dark" onClick={(e)=>this.handleIncrement(e, 'value')} value={this.state.break} disabled={(!this.state.isPause)}><i className="fa-solid fa-circle-arrow-up fa-xl"></i></button>
            </div>
          </div>
            
          {/* For Session-Length  */}
          <div  className="length-div">   
            <div className="upper-row">
              <p id="session-label" className="upper-label">Session Length</p>
            </div>
            <div className="lower-row">
              <button id="session-decrement" className="btn btn-dark" onClick={(e)=>this.handleDecrement(e, 'value')} value={this.state.session} disabled={(!this.state.isPause)}><i className="fa-solid fa-circle-arrow-down fa-xl"></i></button>
              <input type="number" id="session-length" className="input-length" value={this.state.sessionLength}  min="1" max="60"  disabled/>
              <button id="session-increment" className="btn btn-dark" onClick={(e)=>this.handleIncrement(e, 'value')} value={this.state.session} disabled={(!this.state.isPause)}><i className="fa-solid fa-circle-arrow-up fa-xl" ></i></button>
            </div>
          </div>
        </div>
            
        <div className="row" id="timer-div">     
          <div> 
            {/**<input type="text"  id="timer-label" value={this.state.isPlaying === 'session' ? "SESSION" : "BREAK"} disabled /> */}
            <p id="timer-label" className="hidden-timeLeft">{this.state.isPlaying === 'session' ? "SESSION" : "BREAK"}</p>
            
              <div className="clock-box" id="time">
                {/*<p id="time-left">25:00</p> */}
                <p id="time-left"><b>25</b>:<b>00</b></p> 
                <div id="spacing"> <br /></div>
                <div id="buttons-div">
                  <div>
                    <button className="btn btn-dark" id="start_stop" onClick={this.handlePlayStop}><i className="fa-solid fa-play fa-x1"></i> <i className="fa-solid fa-pause"></i></button>   
                  </div>
                  <div id="otherSpace"></div>
                  <div>
                    <button className="btn btn-dark" id="reset" onClick={this.handleReset}><i className="fa-solid fa-arrows-rotate fa-x1"></i></button>
                  </div>
                </div>
            </div>
          </div>
        </div>
        
        <div className="row" id="audio-div" >
          <audio className="clip" id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
        
       </div>
    );
  }
}
export default Clock;