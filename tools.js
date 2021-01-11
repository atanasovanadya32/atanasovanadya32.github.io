const getMousePos = (ev) => {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (ev.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (ev.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

const dist = (pos1, pos2) => Math.sqrt(((pos1.x - pos2.x) * (pos1.x - pos2.x)) + ((pos1.y - pos2.y) * (pos1.y - pos2.y)))

const rand = v => v * Math.random()

const negrand = v => v * (Math.random() - Math.random())

const roundrand = v => Math.round(Math.random() * v)

const rangerand = range => range.min + (Math.random() * (range.max - range.min))

const sqr = v => v *v

const thetaCalc = (pos,pose) => {
    let Dx = pos.x - pose.x;
        if(Dx == 0){Dx = 0.001};
    let Dy = pos.y - pose.y;
    let ti = Math.atan(Math.abs((Dy)/(Dx)));
    //corrects negatives and over 360s
    if(ti<0){ti=Math.PI+ti};
    if(ti>Math.PI*2){ti=ti-Math.PI*2};
    //correct angles to quadrants
    if(Dx<0 && Dy>0){ti=ti}; //q 1
    if(Dx>0 && Dy>0){ti=Math.PI-ti}; //q 2
    if(Dx>0 && Dy<0){ti=Math.PI+ti}; //q 3
    if(Dx<0 && Dy<0){ti=Math.PI*2-ti}; //q 4
    //bordeline cases (90,180,270,360)
    if(Dx==0){if(Dy>0){ti=Math.PI/2};if(Dy<0){ti=Math.PI*1.5}};
    if(Dy==0){if(Dx>0){ti=Math.PI};if(Dx<0){ti=Math.PI}};
    //return theta
    return ti
}

const circ = (ctx, pos, r, col) => {
    ctx.beginPath()
    ctx.fillStyle = col || 'rgb(245,100,80)'
    ctx.arc(pos.x, pos.y, r, 0, 8)
    ctx.fill()
}