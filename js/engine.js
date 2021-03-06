//进行背景的绘制
window.onload = function back_init(){
    var canvas_back = document.getElementById('background');
    var ctx_back = canvas_back.getContext('2d');
    var path = new Path2D();
    for(let i = 0;i < 3;++i){
        path.moveTo(80*(i+1),0);
        path.lineTo(80*(i+1),320);
        path.moveTo(0,80*(i+1));
        path.lineTo(320,80*(i+1));
    }
    ctx_back.stroke(path);
}
//back_init();

var game_info = {
    block: [4],//二维数组用于记录2048的信息
}
var boxleft = 14;//还有几个格子

function init(){
        //先初始化数组
        for(var i = 0;i < 4;++i){
            var b = [4];
            for(var j = 0;j < 4;++j){
                b[j] = 0;
            }
            game_info.block[i] = b;
        }


        var x1 = Math.floor(Math.random() * 4);
        var y1 = Math.floor(Math.random() * 4);
        var x2 = Math.floor(Math.random() * 4);
        var y2 = Math.floor(Math.random() * 4);
        if(x1 == x2 && y1 == y2){
            y2 = (y1 + 1)%4;
        }
        //初始化好两个点

        console.log(x1);
        console.log(y1);
        console.log(game_info.block,1,1);
        game_info.block[x1][y1] = 2;
        game_info.block[x2][y2] = 2;
        console.log(game_info.block,1,1);
}
init();

window.onload = function draw(){
    var canvas_game = document.getElementById('game');
    var ctx = canvas_game.getContext('2d');
    var path1 = new Path2D();
    var path2 = new Path2D();
    for(let i = 0;i < 4;++i){
        for(let j = 0;j < 4;++j){
            if(game_info.block[i][j] != 0){
                ctx.font = "50px serif";
                ctx.fillText("" + game_info.block[i][j], 25 + 80*j,58 + 80*i);
            }
            path1.rect(5 + 80*i,5 + 80*j,70,70);
        }
    }
    ctx.stroke(path1);
}

//刷新画板
function flush(){
    var canvas_game = document.getElementById('game');
    var ctx = canvas_game.getContext('2d');
    ctx.clearRect(0,0,320,320); // clear canvas
    var path1 = new Path2D();
    var path2 = new Path2D();
    for(let i = 0;i < 4;++i){
        for(let j = 0;j < 4;++j){
            if(game_info.block[i][j] != 0){
                if(game_info.block[i][j] < 16){
                    ctx.font = "50px serif";
                    ctx.fillText("" + game_info.block[i][j], 25 + 80*j,58 + 80*i);
                }
                else if(game_info.block[i][j] < 128){
                    ctx.font = "40px serif";
                    ctx.fillText("" + game_info.block[i][j], 20 + 80*j,53 + 80*i);
                }
                else if(game_info.block[i][j] < 1024){
                    ctx.font = "40px serif";
                    ctx.fillText("" + game_info.block[i][j], 10 + 80*j,53 + 80*i);
                }
                else{
                    //win
                    alert("you win");
                    reset();
                }
            }
            path1.rect(5 + 80*i,5 + 80*j,70,70);
        }
    }
    ctx.stroke(path1);
}

//判定函数
function judge(){
    if(boxleft > 0){
        return false;
    }
    for(var i = 0;i < 3;++i){
        if(game_info.block[0][i] == game_info.block[1][i] || game_info.block[0][i+1] == game_info.block[0][i]){
            return false;
        }
    }
    if(game_info.block[0][3] == game_info.block[1][3]){
        return false;
    }

    for(var i = 0;i < 3;++i){
        if(game_info.block[2][i] == game_info.block[3][i] || game_info.block[2][i+1] == game_info.block[2][i] || 
        game_info.block[2][i] == game_info.block[1][i]){
            return false;
        }
    }
    if(game_info.block[2][i] == game_info.block[3][i] || game_info.block[2][i] == game_info.block[1][i]){
        return false;
    }

    return true;
}

//游戏结束后的重启函数
function reset(){
    init();
    boxleft = 14;
    flush();
}

document.onkeydown = function(e){
    var debug = "box: " + boxleft;
    console.log(debug);
    if(e.keyCode == 37){
        //向左
        //对game_info进行改变
        for(let i = 0; i < 4;++i){
            //先全部移动
            let count = 0;
            for(let j = 0;j < 4;++j){
                if(game_info.block[i][j] != 0){
                    var tmp = game_info.block[i][j];
                    game_info.block[i][j] = 0;
                    game_info.block[i][count] = tmp;
                    count++;
                }
            }

            //对于相同的元素合并
            for(let j = 0;j < 4;++j){
                if(j == 3){
                    break;
                }
                if(game_info.block[i][j] == game_info.block[i][j+1] && game_info.block[i][j] != 0){
                    console.log("bomb");
                    var tmp = game_info.block[i][j];
                    game_info.block[i][j] = 2*tmp;
                    game_info.block[i][j+1] = 0;
                    boxleft++;
                    j++;
                }
            }

            //再全部移动
            count = 0;
            for(let j = 0;j < 4;++j){
                if(game_info.block[i][j] != 0){
                    var tmp = game_info.block[i][j];
                    game_info.block[i][j] = 0;
                    game_info.block[i][count] = tmp;
                    count++;
                }
            }
        }
        console.log(game_info.block,1,1);
        //随机生成一个元素，并判断游戏是否结束
        var distance = Math.floor(Math.random() * boxleft);
        console.log(distance);
        console.log(boxleft);
        let box_count = 0;
        for(let i = 0;i < 4;i++){
            if(box_count > distance)
                break;
            for(let j = 0;j < 4;j++){
                if(game_info.block[i][j] == 0){
                    if(box_count == distance){
                        console.log("hit");
                        var jug = Math.floor(Math.random() * 2);
                        if(jug == 1){
                            game_info.block[i][j] = 2;
                        }
                        else{
                            game_info.block[i][j] = 4;
                        }
                        box_count++;
                        boxleft--;
                        break;
                    }
                    box_count++;
                }
            }
        }


    }
    if(e.keyCode == 38){
        //向上
        for(let i = 0; i < 4;++i){
            //先全部移动
            let count = 0;
            for(let j = 0;j < 4;++j){
                if(game_info.block[j][i] != 0){
                    var tmp = game_info.block[j][i];
                    game_info.block[j][i] = 0;
                    game_info.block[count][i] = tmp;
                    count++;
                }
            }

            //对于相同的元素合并
            for(let j = 0;j < 4;++j){
                if(j == 3){
                    break;
                }
                if(game_info.block[j][i] == game_info.block[j+1][i] && game_info.block[j][i] != 0){
                    var tmp = game_info.block[j][i];
                    game_info.block[j][i] = 2*tmp;
                    game_info.block[j+1][i] = 0;
                    boxleft++;
                    j++;
                }
            }

            //再全部移动
            count = 0;
            for(let j = 0;j < 4;++j){
                if(game_info.block[j][i] != 0){
                    var tmp = game_info.block[j][i];
                    game_info.block[j][i] = 0;
                    game_info.block[count][i] = tmp;
                    count++;
                }
            }
        }
        console.log(game_info.block,1,1);
        //随机生成一个元素，并判断游戏是否结束
        var distance = Math.floor(Math.random() * boxleft);
        let box_count = 0;
        console.log(distance);
        console.log(boxleft);
        for(let i = 0;i < 4;i++){
            if(box_count > distance)
                break;
            for(let j = 0;j < 4;j++){
                if(game_info.block[i][j] == 0){
                    if(box_count == distance){
                        console.log("hit");
                        var jug = Math.floor(Math.random() * 2);
                        if(jug == 1){
                            game_info.block[i][j] = 2;
                        }
                        else{
                            game_info.block[i][j] = 4;
                        }
                        boxleft--;
                        box_count++;
                        break;
                    }
                    box_count++;
                }
            }
        }
    }
    if(e.keyCode == 39){
        //向右
        //对game_info进行改变
        for(let i = 0; i < 4;++i){
            //先全部移动
            let count = 3;
            for(let j = 3;j > -1;--j){
                if(game_info.block[i][j] != 0){
                    var tmp = game_info.block[i][j];
                    game_info.block[i][j] = 0;
                    game_info.block[i][count] = tmp;
                    count--;
                }
            }

            //对于相同的元素合并
            for(let j = 3;j > -1;--j){
                if(j == 0){
                    break;
                }
                if(game_info.block[i][j] == game_info.block[i][j-1] && game_info.block[i][j] != 0){
                    var tmp = game_info.block[i][j];
                    game_info.block[i][j] = 2*tmp;
                    game_info.block[i][j-1] = 0;
                    boxleft++;
                    j--;
                }
            }

            //再全部移动
            count = 3;
            for(let j = 3;j > -1;--j){
                if(game_info.block[i][j] != 0){
                    var tmp = game_info.block[i][j];
                    game_info.block[i][j] = 0;
                    game_info.block[i][count] = tmp;
                    count--;
                }
            }
        }
        console.log(game_info.block,1,1);
        //随机生成一个元素，并判断游戏是否结束
        var distance = Math.floor(Math.random() * boxleft);
        let box_count = 0;
        console.log(distance);
        console.log(boxleft);
        for(let i = 0;i < 4;i++){
            if(box_count > distance)
                break;
            for(let j = 0;j < 4;j++){
                if(game_info.block[i][j] == 0){
                    if(box_count == distance){
                        console.log("hit");
                        var jug = Math.floor(Math.random() * 2);
                        if(jug == 1){
                            game_info.block[i][j] = 2;
                        }
                        else{
                            game_info.block[i][j] = 4;
                        }
                        boxleft--;
                        box_count++;
                        break;
                    }
                    box_count++;
                    
                }
            }
        }
    }
    if(e.keyCode == 40){
        //向下
        console.log("okk3");
        for(let i = 0; i < 4;++i){
            //先全部移动
            let count = 3;
            for(let j = 3;j > -1;--j){
                if(game_info.block[j][i] != 0){
                    var tmp = game_info.block[j][i];
                    game_info.block[j][i] = 0;
                    game_info.block[count][i] = tmp;
                    count--;
                }
            }

            //对于相同的元素合并
            for(let j = 3;j > -1;--j){
                if(j == 0){
                    break;
                }
                if(game_info.block[j][i] == game_info.block[j-1][i] && game_info.block[j][i] != 0){
                    var tmp = game_info.block[j][i];
                    game_info.block[j][i] = 2*tmp;
                    game_info.block[j-1][i] = 0;
                    boxleft++;
                    j--;
                }
            }

            //再全部移动
            count = 3;
            for(let j = 3;j > -1;--j){
                if(game_info.block[j][i] != 0){
                    var tmp = game_info.block[j][i];
                    game_info.block[j][i] = 0;
                    game_info.block[count][i] = tmp;
                    count--;
                }
            }
        }
        console.log(game_info.block,1,1);
        //随机生成一个元素，并判断游戏是否结束
        var distance = Math.floor(Math.random() * boxleft);
        let box_count = 0;
        console.log(distance);
        console.log(boxleft);
        for(let i = 0;i < 4;i++){
            if(box_count > distance)
                break;
            for(let j = 0;j < 4;j++){
                if(game_info.block[i][j] == 0){
                    if(box_count == distance){
                        console.log("hit");
                        var jug = Math.floor(Math.random() * 2);
                        if(jug == 1){
                            game_info.block[i][j] = 2;
                        }
                        else{
                            game_info.block[i][j] = 4;
                        }
                        box_count++;
                        boxleft--;
                        break;
                    }
                    box_count++
                    
                }
            }
        }
    }
    flush();
    if(judge() == true){
        alert("game over");
        reset();
    }
}
