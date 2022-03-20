function Mine(tr, td, mineNum) {
    this.tr = tr; // 行数
    this.td = td // 列数
    this. mineNum = mineNum // 雷数

    this.squares = [] // 二维数组， 每个单元格存储的信息
    this.tds = [] // 每个单元格的DOM
    this.restNum = mineNum // 剩余雷的数量
    this.allRight = false // 是否排除所有雷

    this.parent = document.querySelector('.gameBox')
}

// 创建随机数组
Mine.prototype.randomNum = function() {
    var square = new Array(this.tr * this.td)

    for (var i = 0; i < square.length; i++) {
        square[i] = i
    }

    square.sort(function() { return 0.5 - Math.random()})
    
    return square.slice(0, this.mineNum)
}

Mine.prototype.init = function() {
    var rn = this.randomNum();
    var n = 0;

    for (var i  = 0; i < this.tr; i ++) {
        this.squares[i] = [];

        for (var j = 0; j < this.td; j ++) {
            // 判定， 若条件成立， 则表述该索引为雷
            if (rn.indexOf(++n) != -1) {
                this.squares[i][j] = { type: 'mine', x: j, y: i }
            } else {
                this.squares[i][j] = { type: 'number', x: j, y: i, value: 0}
            }
        }
    }

    this.mineNumDom = document.querySelector('.mineNum')
    this.mineNumDom.innerHTML = this.restNum

    // 取消右键点击出现菜单栏事件
    this.parent.oncontextmenu = function() {
        return false;
    }

    this.updateNum()
    this.createDom()
}

Mine.prototype.findArround = function(square) {
    var x = square.x;
    var y = square.y;
    var result = [];
    for (var i = x - 1; i <= x + 1; i ++) {
        for (var j = y - 1; j <= y + 1; j ++) {
            if (
                i < 0 ||
                i > this.td - 1 ||
                j < 0 ||
                j > this.tr - 1 ||
                ( i == x && j == y ) ||
                this.squares[j][i].type == 'mine'
            ) {
                continue
            } else {
                result.push([j, i])
            }
        }
    }
    return result;
}

Mine.prototype.updateNum = function() {
    for (var i = 0; i < this.tr; i ++) {
        for (var j = 0; j < this.td; j ++) {
            // 只更新雷周围的数字
            if (this.squares[i][j].type == 'number') {
                continue;
            }
            var num = this.findArround(this.squares[i][j])
            
            for (var k = 0; k < num.length; k ++) {
                this.squares[num[k][0]][num[k][1]].value += 1;
            }
        }
    }
}

Mine.prototype.createDom = function() {
    var that = this;
    var table = document.createElement('table');

    for (var i = 0; i< this.tr; i ++) {
        var domTr = document.createElement('tr');
        this.tds[i] = [];

        for (var j = 0; j < this.td; j ++) {
            var domTd = document.createElement('td');
            this.tds[i][j] = domTd
            
            domTd.pos = [i,j];

            domTd.onmousedown = function() {
                that.play(event, this)
            }


            domTr.appendChild(domTd)
        }

        table.appendChild(domTr)
    }

    this.parent.innerHTML = ''

    this.parent.appendChild(table)
}

Mine.prototype.play = function(ev, obj) {
 var that = this

 // 鼠标左键触发事件
 if (ev.which == 1) {
     var curSquare = this.squares[obj.pos[0]][obj.pos[1]]

     var cl = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
     
     // 用户点击到数字
     if(curSquare.type == 'number') {
         // 非零
         obj.innerHTML = curSquare.value
         obj.className = cl[curSquare.value]

         // 用户点击 0 的业务逻辑
        if (curSquare.value == 0) {
            obj.innerHTML = '';

            function getAllZero(square) {
                var around = that.findArround(square)

                for (var i = 0; i < around.length; i ++) {
                    var x = around[i][0];
                    var y = around[i][1];

                    that.tds[x][y].className = cl[that.squares[x][y].value]

                    // 如果以某个单元格为中心找到为 0， 则调用递归
                    if (that.squares[x][y].value == 0) {
                        // 防止重复查找， 递归进入死循环
                        if (!that.tds[x][y].check) {
                            that.tds[x][y].check = true
                            getAllZero(that.squares[x][y]) 
                        }
                    } else {
                        // 找到不为 0 的单元格
                        that.tds[x][y].innerHTML = that.squares[x][y].value
                    }
                }
            }
            getAllZero(curSquare)
        }
        
     } else {
         // 用户点击到雷的事件处理
         this.gameOver(obj)
     }
 }

 // 鼠标右键触发事件
 if (ev.which == 3) {
    // 判断是否为数字， 若为数字则不插旗
    if (obj.className && obj.className != 'flag') {
        return;
    }

    //切换 class 
    obj.className = obj.className == 'flag' ? '' : 'flag'

    // 剩余雷数处理
    if (obj.className == 'flag') {
        this.mineNumDom.innerHTML = --this.restNum
    } else {
        this.mineNumDom.innerHTML = ++this.restNum
    }

    // 判定是否所有的旗子都选中了雷
    if (this.restNum == 0) {
        var n = 0;
        for ( var i = 0; i< this.squares.length; i ++) {
            for (var j = 0; j < this.squares.length; j ++) {
                if (this.tds[i][j].className == 'flag' && this.squares[i][j].type == 'mine') {
                    n ++;
                }
            }
        }
        if (n == 10) {
            alert('You Win')
        } else {
            alert('扫雷都不会玩？')
            this.gameOver(obj)
        }
    }
 }
}

Mine.prototype.gameOver = function(clickTd) {
    // 显示雷
    for (var i = 0;i < this.tr; i ++) {
        for (var j = 0; j < this.td; j ++) {
            if (this.squares[i][j].type == 'mine') {
                this.tds[i][j].className = 'mine'
            }
            // 清空鼠标点击事件
            this.tds[i][j].onmousedown = null;
        }
    }
    // 添加雷的属性
    if (clickTd) {
        clickTd.style.backgroundColor = '#f00';
    }
}

var btns = document.querySelectorAll('.level button') // 获取所有button
var mine = null // 存储mine实例
var ln = 0; // 设置button属性
var arr = [[9,9,10],[16,16,40],[28,28,99]]

for (let i = 0; i < btns.length - 1; i ++) {
    // 绑定点击事件
    btns[i].onclick = function() {
        btns[ln].className = '';
        this.className = 'active'

        mine = new Mine(...arr[i])

        mine.init()

        ln = i;
    }
}

// 默认点击初级
btns[0].onclick()
btns[3].onclick = function() {
    mine.init()
}
