
var boot = {
    create: function () {

		game.input.maxPointers = 1;
		game.stage.disableVisibilityChange = true;
        game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        game.stage.scale.minWidth = 320;
        game.stage.scale.minHeight = 480;
        game.stage.scale.maxWidth = 640;
        game.stage.scale.maxHeight = 960;
        game.stage.scale.forceLandscape = true;
        game.stage.scale.pageAlignHorizontally = true;
        game.stage.scale.setScreenSize(true);
        
        game.stage.backgroundColor = '#999'
        
        game.state.add('load', load)
        game.state.add('menu', menu)
        game.state.add('play', play)
        game.state.add('gameover', gameover)
        
        this.game.state.start('load')

	}
}
var load = {
    preload: function(){
        game.load.image("w1", "assets/w/a.png")
        game.load.image("w2", "assets/w/f.png")
        game.load.image("w3", "assets/w/t.png")
        game.load.image("w4", "assets/w/l.png")
        game.load.image("w5", "assets/w/y.png")
        game.load.image("w6", "assets/w/z.png")
        game.load.image("stbtn", "assets/start.png")
        
        game.load.audio("audio1", ["assets/sound/bgm.ogg", "assets/sound/bgm.wav"])
        game.load.audio("audio2", ["assets/sound/514892_Short-Loop.mp3", "assets/sound/514892_Short-Loop.ogg"])
        game.load.audio("click", ["assets/sound/sound1.mp3"])
        game.load.audio("over", ["assets/sound/sound3.mp3"])
        
        
        
        game.load.onFileComplete.add(this.fileLoaded, this)
        game.load.onLoadComplete.add(this.loadCompleted, this);

        var style = { font: "20pt Courier", fill: "#333", strokeThickness: 2 }
		var s = game.add.text(game.world.centerX, 400, 'loadding...', style);
		s.anchor.setTo(0.5, 0.5);
        
        
    },
    fileLoaded: function(progress, key, success, remaining, total) {
        var graphics
        graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x777777, 1);
        graphics.drawRect(70, 444, 500, 40);
        graphics.beginFill(0x555555, 1);
        graphics.drawRect(70, 444, 500*progress/100, 40);
    },
    loadCompleted: function(){
        
        
        this.game.state.start('menu')
        //console.log('sucess!!')
    }

}
var sound = {}
var usersource = 0
var menu = {
    create: function(){

        sound.menu = game.add.audio("audio1", 1, !0)
        sound.play = game.add.audio("audio2", 1, !0)
        sound.click = game.add.audio("click", 1, !0)
        sound.over = game.add.audio("over", 1, !0)

        sound.menu.play('',0,1,true)
        sound.play.stop()
        
        var button = game.add.button(game.world.centerX, 500, 'stbtn', this.startplay, this, null, 1, 0);
        button.anchor.setTo(0.5, 0.5);
        //button.events.onInputDown.add(this.startplay, this);
        //game.input.onDown.add(this.startplay, this)
        
        var style = { font: "30pt 'microsoft yahei'", fill: "#333", strokeThickness: 2 }
		var s = game.add.text(game.world.centerX, 222, '连线', style);
		s.anchor.setTo(0.5, 0.5);
        
        var style1 = { font: "20pt 'microsoft yahei'", fill: "#444"}
		var s1 = game.add.text(game.world.centerX, 280, 'a game', style1);
		s1.anchor.setTo(0.5, 0.5);
        
        var style2 = { font: "14pt 'microsoft yahei'", fill: "#fff", align: "center"}
		var s2 = game.add.text(game.world.centerX, 400, '说明：触摸图标并向周围八个方向拖动，超过三个相同的会消除得分\n一次性连线图标越多所得分数越高\n小伙伴们，120秒！ 你能连多少?', style2);
		s2.anchor.setTo(0.5, 0.5);
        
    },
    startplay: function(){
        this.game.state.start('play')
    }
}

var play = {
    
    preload : function(){
        
    },
    create : function(){
        this.dia = 100 
        this.sourceNum = 0
        this.lastselect = null
        this.move = false
        this.lasttime = 120
        this.startTime = game.time.now
		this.select = game.add.group()
        this.Groupeobjs = game.add.group()
		
		//this.delPoints = []
        
        this.Groupeobjs.y = 222
        this.select.y = 222

        for(var i=0; i<6; i++){
        
            for(var j=0; j<6; j++){
                var flips  = this.addnewobj(i*this.dia+30, j*this.dia)
                flips.r = j
                flips.c = i
                flips.n = 'w'+i+'-'+j
                this.Groupeobjs.add(flips)
                
                
                
            }
        
        }
        
        //source
        var sourcestyle = { font: "25pt 'microsoft yahei'", fill: "#333" }
		this.source = game.add.text(game.world.centerX, 50, '分数: 0', sourcestyle)
		this.source.anchor.setTo(0.5, 0.5)
        //time
        var timestyle = { font: "20pt 'microsoft yahei'", fill: "#555" }
		this.timet = game.add.text(game.world.centerX, 100, '时间: '+this.lasttime, timestyle)
		this.timet.anchor.setTo(0.5, 0.5)
        
        
        
//        game.input.onDown.add(this.funcDown, this)
		game.input.onUp.add(this.funcUp, this)
        
        sound.play.play('',0,1,true)
        sound.play.volume = 0.8
        sound.menu.stop()

    },
    
    render: function(){
        
        
    },
    update: function(){
        
        var that = this
        //console.log(this.Groupeobjs)
        
        this.Groupeobjs.forEach(function(item){
            
            if(item.y < item.r*that.dia){
                item.y = item.y + (item.r*that.dia - item.y) * 0.15
            }else{
                item.y = item.r*that.dia
            }
            
            
        })
        
        this.source.setText('分数: ' + this.sourceNum)
        
        this.lasttime = (game.time.now - this.startTime)/1000
        this.lasttime = 120 - (Math.floor(this.lasttime))
        this.timet.setText('剩余时间: ' + this.lasttime)
        
        
        if(this.lasttime == 0){
            usersource = this.sourceNum
            
            this.game.state.start('gameover')           
        }
        
    },
    funcDown: function(f){
        this.move = true
        
        f.alpha = 1
        this.select.add(f)
        this.lastselect = f
        
        sound.click.play()
        //console.log(f.t)
    },
    funcOver: function(f){
       
        if(!this.move) return false;
        
        //console.log(f.t +'|' +this.lastselect.t)
        
        if(f.t !== this.lastselect.t) return false;
        //if(f.i == this.lastselect.i && f.j == this.lastselect.j) return ;
        
        var x2 = Math.abs(f.center.x - this.lastselect.center.x)
        var y2 = Math.abs(f.center.y - this.lastselect.center.y)        
        var b2 = Math.sqrt(x2*x2 + y2*y2)
        if(b2 > 150 || b2 == 0) return false;
        
//        console.log(b2)
//        console.log(f.n)
        f.alpha = 1
        
//        var swapchild = null
//        this.select.forEach(function(p){
//            
//            if(f.c == p.c && f.r < p.r){
//                console.log('f.r  p.r'+f.r+':'+p.r)
//                return (swapchild = p)
//            }
//            
//        })
        
        sound.over.play()
        
        this.select.add(f)
        //swapchild && (this.select.swap(f, swapchild))
        
        
        
        this.lastselect = f
        
    },
    funcUp: function(){
		var that = this
        this.move = false
 
        var isdel = true
        if(this.select.length > 2){
            this.sourceNum += this.select.length*(this.select.length-3)*88
            this.updateobjs()
        }else{
            this.select.setAll('alpha', 0.6)
			//console.log(this.select.length)
			
			while(this.select.length > 0){
				var item = this.select.getFirstAlive()
				that.Groupeobjs.add(item)
			}
			
        }
        
        this.lastselect = null

        
    },
    updateobjs: function(){
    
        var that = this
        var pobj = this.select
        var plength = this.select.length
        
        
        this.select.sort('r')

        var isadd = []
        this.select.forEach(function(p){
        
            var newc = p.c
            var addrow = -1
            isadd.forEach(function(cid){
                if(newc == cid) addrow--
            })
            
            var flips  = that.addnewobj(newc*that.dia+30, addrow*that.dia)
            flips.r = addrow
            flips.c = p.c
            
            isadd.push(p.c)
            
            that.Groupeobjs.add(flips)
            //console.log(flips.c+ "\\\\" + flips.r)
        })

        this.Groupeobjs.forEach(function(item){
        
            that.select.forEach(function(p){
                var pc = p.c
                var pr = p.r
                
                if(item.c == pc && item.r < pr){
                
                    item.r += 1
                    
                }
            
            })

            //console.log(item.r + '--'+item.c)
        })
        
        while(this.select.length > 0){
            var item = this.select.getFirstAlive()
            item.destroy()
        }
        this.select.removeAll()
    
    
    },
    addnewobj: function(x, y){
        var r = Math.floor(Math.random()*5+1)
        var face = 'w'+r
        var flips = new Phaser.Sprite(game, x, y, face)
        flips.scale.setTo(0.2, 0.2)
        flips.inputEnabled = true;
        flips.input.pixelPerfect = true;
        flips.input.useHandCursor = true;
        flips.alpha = .6

        flips.t = face
        
        flips.events.onInputDown.add(this.funcDown, this)
        flips.events.onInputOver.add(this.funcOver, this)
           
        //console.log(face)
        
        return flips
    }

}

var gameover = {
    create: function(){
    
        sound.menu.play('',0,1,true)
        sound.play.stop()
        
        var tip = '\n你已经战胜了自己！'
        if(localStorage){
            var top = localStorage.getItem('top')
            if(top && +top > usersource) tip = '\n历史最高: '+top
            if(top && usersource > +top) localStorage.setItem('top', usersource)
        }
        
        var sourcestyle = { font: "25pt 'microsoft yahei'", fill: "#333", align:"center" }
		this.source = game.add.text(game.world.centerX, 350, '分数: '+usersource+tip, sourcestyle)
		this.source.anchor.setTo(0.5, 0.5)
        
        var button = game.add.button(game.world.centerX, 500, 'stbtn', this.replay, this, null, 1, 0);
        button.anchor.setTo(0.5, 0.5);
        
    },
    
    replay: function(){
        this.game.state.start('play')
    }
}
