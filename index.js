import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './GLOBAL_CSS/globalstyle.styl'
// import { BrowserRouter, Route, NavLink } from 'react-router-dom'
const MainDisplay1 = (props)=>{
    if(props.page ==1 || props.page ==2) return (
            <p id="paper1Text" className='paper1Text'>{props.messageWritten}</p>
    )
    else return (
            <p id="paper1Text" className = 'paper1Text'>Stay with me in <span id="year">{props.messageWritten}</span></p>
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
        
        this.paper1 = document.getElementById('paper1')
        this.paper2 = document.getElementById('paper2')
        this.paper1Text = document.getElementById('paper1Text')
        this.container = document.getElementById('container')
        this.topMarginRoot = document.getElementById('topMarginRoot')
        this.paper1Side = document.getElementById('paper1').offsetLeft 

        this.paper1Text.style.left = `${this.paper1Side}px` //set text to be on top of paper 
        
        window.addEventListener('resize', ()=>{
            this.paper1Text.style.left = document.getElementById('paper1').offsetLeft 
        })
        setTimeout(()=>{this.__MAIN_RENDER_ENGINE__()}, 4000)
    }
    moveBackground = (x, y)=>{
        if(window.bgInterval) clearInterval(window.bgInterval)
        if(x == 0){
            window.bgInterval = setInterval(()=>{ 
                this.container.style.backgroundPositionX = `${x}%`
                x++
                if(x==200) x = 0
            }, y)} //MOVING BACKGROUND ANIMATION SPEED
        else if(x == 300){
            clearInterval(window.bgInterval)
            this.container.style.backgroundPositionX = `${x}%`
            this.moveBackground(0, 250)
        }
    }
    writeText = (y)=>{
        let i = 0
        let writingInterval = setInterval(()=>{ //TEXT WRITING ANIMATION
            this.setState({
                messageWritten: this.state.messageWritten + this.state.message[i]
            })
            i++
            if(i == this.state.message.length){
                clearInterval(writingInterval)
            }
        }, (y/this.state.message.length)) //WRITING ANIMATION SPEED
    }
    flicker = (x, y)=>{
        let scoreAppearance = true
        let flickeringInterval = setInterval(()=>{  //FLICKERING ANIMATION 
            if(x > 0){
                if(scoreAppearance){
                    this.setState({
                        messageWritten: `${this.state.messageWritten}_`
                    })
                }
                else{
                    this.setState({
                        messageWritten: this.state.messageWritten.replace('_', '')
                    })
                }
                x--
                scoreAppearance = !scoreAppearance
            }
            else{
                clearInterval(flickeringInterval)
            }
        }, y/x)//FLICKERING ANIMATION SPEED
    }
    removeText = (y)=>{
        i = this.state.messageWritten.length-1
        let textRemovalInterval = setInterval(()=>{
            this.setState({messageWritten: this.state.messageWritten.replace(this.state.messageWritten[i], '')})
            i--
            if(this.state.messageWritten.length == 0){ 
                clearInterval(textRemovalInterval)
            }
        }, y/this.state.messageWritten.length) //TEXT REMOVAL ANIMATION SPEED
    }
    straightenPapers = ()=>{
        this.paper2.classList.add('straightened')
    }
    slideToRight = ()=>{
        this.paper2.classList.add('slidRight')
        container.style.backgroundColor = '#272727'
        
        setTimeout(()=>{
            this.paper1.classList.add('slidRight')
            topMarginRoot.classList.add('slidRight')
        }, 50) //TIME FOR MOVEMENT START OF SECOND PAPER
    }
    transformPapers = ()=>{
        this.paper2.classList.add('ndDisplayYell')
        this.paper1.classList.add('ndDisplay')
        this.topMarginRoot.style.color = '#ffffff'
        this.paper1Text.style.left = '10%'
    }
    getDisplayBack = ()=>{
        this.paper1Text.style.marginLeft = this.topMarginRoot.style.marginLeft = 0 
        this.paper1.classList.remove('slidRight')
        this.paper2.classList.remove('slidRight')
        this.paper1.classList.add('ndDisplayAll')
        this.paper2.classList.add('ndDisplayAll')
        this.paper1Text.classList.add('display2Font')
        
        // this.setState({
        //     message: 'A year just passed and our friendship is only getting stronger_'
        // })
        
    }
    addYellowBorders = ()=>{
        this.paper1Text.classList.add('yellowTopBorder')
        document.getElementById('canvas').style.visibility = 'visible'
    }
    scaleUp = ()=>{
        this.paper1Text.classList.remove('yellowTopBorder')
        this.paper2.style.setProperty('visibility', 'hidden')
        this.paper1.style.setProperty('transform', 'scale(2)')
        this.paper1Text.style.setProperty('transform-origin', 'center')
        canvas.style.setProperty('display', 'none')
        this.paper1Text.style.setProperty('visibility', 'hidden')
        this.paper1Text.style.setProperty('margin-left', 'auto')
        this.paper1Text.style.setProperty('left', '0')
        this.paper1Text.style.setProperty('margin-left', 'auto')
        this.paper1Text.style.setProperty('max-width', 'auto')
    }
    fadeIn = ()=>{
        canvas.classList.add('zcanvas')
        this.paper1Text.style.setProperty('font-family', 'mainDisplayFont2')
        this.paper1Text.style.setProperty('visibility', 'visible')
        this.container.style.setProperty('background', 'white')
        this.paper1Text.classList.add('centeredDisplay')
        this.paper1Text.style.setProperty('transform', 'scale(1)')
    }
    finalDisplay = ()=>{
        this.paper1Text.classList.add('zfinalDisplay')
    }
    __MAIN_RENDER_ENGINE__ = ()=>{
        /* IN MOST FUNCTIONS USING 2 PARAMETERS, THE FIRST IS THE CONDITION AND THE SECOND IS THE SPEED OF THE ANIMATION
        NO FUNCTION IS BASED ON ANY OTHER FUNCTION, ALL ARE INDEPENDENT AND ARE EXECUTED BASED ON THE MAIN RENDER ENGINE. 
        SPEEDS ARE PASSED IN AS TOTAL AMOUNT OF MILLISECONDS REQUIRED FOR THE WHOLE PROCESS OF A FUNCTION */
        /*******************
        ROADMAP OF FUNCTIONS WITH INTERVAL USAGE
        1. MOVE BACKGROUND [POSITION (0-300),THE ACTUAL SPEED OF THE BACKGROUND MOVEMENT] 
        2. WRITE TEXT [ TOTAL TIME ] 
        3. FLICKER [ TOTAL FLICKERS, TOTAL TIME ] 
        4. REMOVE TEXT [ TOTAL TIME ]
        5. STRAIGHTEN PAPERS [ 500 MS ]
        6. MOVE BACKGROUND [ 300 ]
        7. SLIDE TO RIGHT [ 500-550 MS ]
        8. TRANSFORM PAGE SIZES [ 500 MS ]
        9. GET 2ND DISPLAY SCREEN [ 500 MS ]
        10. WRITE TEXT [ TOTAL TIME ] 
        11. ADD YELLOW BORDERS [ 500 MS ]
        12. REMOVE TEXT [ 100 MS ]
        12. SCALE UP THE PAPERS AND ZOOM IN
        13. FADE TEXT INTO DISPLAY [ 500 MS ]
        *******************/
        this.mainTimeController = 5000
        this.mainTimeDivisor = 
        this.moveBackground('fast', 250)
        this.writeText(this.mainTimeController - 500)
        setTimeout(()=>{this.flicker(6, 4000)}, this.mainTimeController)
        setTimeout(()=>{this.removeText(1000)}, this.mainTimeController + 4000)
        setTimeout(()=>{this.straightenPapers()}, this.mainTimeController + 5000)
        setTimeout(()=>{this.moveBackground(300, 250)}, this.mainTimeController + 5500)
        setTimeout(()=>{this.slideToRight()}, this.mainTimeController + 5500)
        setTimeout(()=>{this.transformPapers()}, this.mainTimeController + 6050)
        setTimeout(()=>{this.getDisplayBack()}, this.mainTimeController + 6550)
        setTimeout(()=>{this.addYellowBorders();this.setState({message: 'A year just passed and we are only getting stronger!'}); this.writeText(500);}, this.mainTimeController + 7550)
        setTimeout(()=>{this.removeText(100)}, this.mainTimeController + 11550)
        setTimeout(()=>{this.scaleUp()}, this.mainTimeController + 12550)
        setTimeout(()=>{this.setState({message: 'Stay with me in...'}); this.fadeIn();}, this.mainTimeController + 13550)
        setTimeout(()=>{this.writeText(200)}, this.mainTimeController + 13850)
        setTimeout(()=>{this.setState({messageWritten: '2019'}); this.finalDisplay();}, this.mainTimeController + 15850)
        setTimeout(()=>{document.getElementById('madeWithLoveBy').classList.add('madeWithLoveByVis')}, this.mainTimeController + 17000)
    }
    
    render(){
        return(
            <>
                <div id="paper2" className="npaper2"></div>
                <div id="paper1" className="npaper1"></div>
                <MainDisplay1 messageWritten={this.state.messageWritten} page={this.state.page} year={this.state.year}/>
            </>
        )
    }
}

ReactDOM.render(<MainDisplay/>, document.getElementById('mainDisplayRoot'))

    var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, drawCircle2, drawCircle3, i, range, xpos;
    NUM_CONFETTI = 20;
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
