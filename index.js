import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './GLOBAL_CSS/globalstyle.styl'
// import { BrowserRouter, Route, NavLink } from 'react-router-dom'
const MainDisplay1 = (props)=>{
    if(props.page ==1 || props.page ==2) return (
        <>
            <div id="paper2" className="npaper2"></div>
            <div id="paper1" className="npaper1"></div>
            <p id="paper1Text">{props.messageWritten}</p>
        </>
    )
    else return (
        <>
            <p id="paper1Text">Stay with me in <span id="year">{props.year}</span></p>
        </>
    )
}

class MainDisplay extends Component{
    state={
        page: 1, 
        message: "We had an amazing year together and for that I'm grateful", 
        underscore: '_', 
        messageWritten: [], 
        appearance: false, 
        year: '____'
    }
    componentDidMount(){
        let paper1Side = document.getElementById('paper1').offsetLeft 
        let paper1Text = document.getElementById('paper1Text')

        paper1Text.style.left = `${paper1Side}px` //set text to be on top of paper 
        paper1Text.style.top = `${document.getElementById('paper1').offsetTop + 100}px` //set text to be on top of paper
        
        this.moveBackground(10)
        this.writeText(0)
    }
    moveBackground = (x)=>{
        if(x == 10){
        window.bgInterval = setInterval(()=>{ 
            x++
            document.getElementById('container').style.backgroundPositionX = `${x}%`
        }, 250)} //MOVING BACKGROUND ANIMATION SPEED
        else{
            x = 0
            clearInterval(window.bgInterval)
            document.getElementById('container').style.backgroundPositionX = `${300}%`
            this.moveBackground(10)
        } 
    }
    writeText = (x)=>{
        let i = 0 
        let viewUpdate = []
        let writingInterval = setInterval(()=>{ //TEXT WRITING ANIMATION
            let stateInsider = [...this.state.message]
            viewUpdate.push(stateInsider[i])
            this.setState({
                messageWritten: viewUpdate.join('')
            })
            i++
            if(i == this.state.message.length){
                clearInterval(writingInterval)
                if(x == 0) this.flicker()
            }
        }, 35) //WRITING ANIMATION SPEED
    }
    flicker = ()=>{
        let scoreAppearance = true
        let defaultMsg = this.state.messageWritten
        let intervalCount = 5

        let flickeringInterval = setInterval(()=>{  //FLICKERING ANIMATION 
            if(intervalCount > 0){
                if(scoreAppearance){
                    this.setState({
                        messageWritten: `${this.state.messageWritten}_`
                    })
                }
                else{
                    this.setState({
                        messageWritten: `${defaultMsg}`
                    })
                }
                intervalCount--;
                scoreAppearance = !scoreAppearance
            }
            else{
                clearInterval(flickeringInterval)
                this.removeText(0)
            }
        }, 200)//FLICKERING ANIMATION SPEED
    }
    removeText = (x)=>{
        let textRemovalInterval = setInterval(()=>{
            let defaultMsg = [...this.state.messageWritten]
            let dump = defaultMsg.splice(defaultMsg.length -1, 1) //dumped value, not used
            
            this.setState({messageWritten: [...defaultMsg]})
            
            if(this.state.messageWritten.length == 0){ 
                clearInterval(textRemovalInterval)
                if(x == 0) this.straightenPapers()
            }
        }, 25) //TEXT REMOVAL ANIMATION SPEED
    }
    straightenPapers = ()=>{
        paper2.classList.add('straightened')
        setTimeout(this.slideToRight, 500)
    }
    slideToRight = ()=>{
        paper2.classList.add('slidRight')
        container.style.backgroundColor = '#272727'
        
        setTimeout(()=>{
            paper1.classList.add('slidRight')
            topMarginRoot.classList.add('slidRight')
            this.moveBackground(20)
        }, 50) //TIME FOR MOVEMENT START
        setTimeout(this.transformPapers, 800)
    }
    transformPapers = ()=>{
        paper2.classList.add('ndDisplayYell')
        paper1.classList.add('ndDisplay')
        topMarginRoot.style.color = '#ffffff'
        paper1Text.style.left = '10%'
        
        setTimeout(this.getDisplayBack, 2000)
    }
    getDisplayBack = ()=>{
        paper1Text.style.marginLeft = topMarginRoot.style.marginLeft = 0 
        paper1.classList.remove('slidRight')
        paper2.classList.remove('slidRight')
        paper1.classList.add('ndDisplayAll')
        paper2.classList.add('ndDisplayAll')
        paper1Text.classList.add('display2Font')
        
        this.setState({
            message: 'A year just passed and our friendship is only getting stronger_'
        })
        setTimeout(()=>{
            paper1Text.classList.add('yellowTopBorder');
            this.writeText(1); 
            document.getElementById('canvas').style.visibility = 'visible';
        }, 400)
        
        setTimeout(()=>{this.removeText(1)}, 3000)
        setTimeout(()=>{this.setState({
            message: 'Screw Shaarooooooty! <3'
        });this.writeText(1)}, 5200)
    }
    
    render(){
        return(
            <MainDisplay1 messageWritten={this.state.messageWritten} page={this.state.page} year={this.state.year}/>
        )
    }
}

ReactDOM.render(<MainDisplay/>, document.getElementById('mainDisplayRoot'))

    var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, drawCircle2, drawCircle3, i, range, xpos;
    NUM_CONFETTI = 30;
    COLORS = [
      [235, 90, 70],
      [97, 189, 79],
      [242, 214, 0],
      [0, 121, 191],
      [195, 119, 224]
    ];
    PI_2 = 2 * Math.PI;
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    window.w = 0;
    window.h = 0;
    window.resizeWindow = function() {
      window.w = canvas.width = window.innerWidth;
      return window.h = canvas.height = window.innerHeight
    };
    window.addEventListener("resize", resizeWindow, !1);
    window.onload = function() {
      return setTimeout(resizeWindow, 0)
    };
    range = function(a, b) {
      return (b - a) * Math.random() + a
    };
    drawCircle = function(a, b, c, d) {
      context.beginPath();
      context.moveTo(a, b);
      context.bezierCurveTo(a - 17, b + 14, a + 13, b + 5, a - 5, b + 22);
      context.lineWidth = 2;
      context.strokeStyle = d;
      return context.stroke()
    };
    drawCircle2 = function(a, b, c, d) {
      context.beginPath();
      context.moveTo(a, b);
      context.lineTo(a + 6, b + 9);
      context.lineTo(a + 12, b);
      context.lineTo(a + 6, b - 9);
      context.closePath();
      context.fillStyle = d;
      return context.fill()
    };
    drawCircle3 = function(a, b, c, d) {
      context.beginPath();
      context.moveTo(a, b);
      context.lineTo(a + 5, b + 5);
      context.lineTo(a + 10, b);
      context.lineTo(a + 5, b - 5);
      context.closePath();
      context.fillStyle = d;
      return context.fill()
    };
    xpos = 0.9;
    document.onmousemove = function(a) {
      return xpos = a.pageX / w
    };
    window.requestAnimationFrame = function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
        return window.setTimeout(a, 5)
      }
    }();
    Confetti = function() {
      function a() {
        this.style = COLORS[~~range(0, 5)];
        this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
        this.r = ~~range(2, 6);
        this.r2 = 2 * this.r;
        this.replace()
      }
      a.prototype.replace = function() {
        this.opacity = 0;
        this.dop = 0.03 * range(1, 4);
        this.x = range(-this.r2, w - this.r2);
        this.y = range(-20, h - this.r2);
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = range(0, 2) + 8 * xpos - 5;
        return this.vy = 0.7 * this.r + range(-1, 1)
      };
      a.prototype.draw = function() {
        var a;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity +=
          this.dop;
        1 < this.opacity && (this.opacity = 1, this.dop *= -1);
        (0 > this.opacity || this.y > this.ymax) && this.replace();
        if (!(0 < (a = this.x) && a < this.xmax)) this.x = (this.x + this.xmax) % this.xmax;
        drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
        drawCircle3(0.5 * ~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
        return drawCircle2(1.5 * ~~this.x, 1.5 * ~~this.y, this.r, this.rgb + "," + this.opacity + ")")
      };
      return a
    }();
    confetti = function() {
      var a, b, c;
      c = [];
      i = a = 1;
      for (b = NUM_CONFETTI; 1 <= b ? a <= b : a >= b; i = 1 <= b ? ++a : --a) c.push(new Confetti);
      return c
    }();
    window.step = function() {
      var a, b, c, d;
      requestAnimationFrame(step);
      context.clearRect(0, 0, w, h);
      d = [];
      b = 0;
      for (c = confetti.length; b < c; b++) a = confetti[b], d.push(a.draw());
      return d
    };
    step();;
