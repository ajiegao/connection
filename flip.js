var Boot = {
    
    preload : function(){
//        game.load.image("circle1", "assets/png/sleepy.png")
//        game.load.image("circle2", "assets/png/smitten.png")
//        game.load.image("circle3", "assets/png/ninja-mask.png")
//        game.load.image("circle4", "assets/png/tear-tracks.png")
//        game.load.image("circle5", "assets/png/one-eyed.png")
        
        game.load.image("w1", "assets/w/a.png")
        game.load.image("w2", "assets/w/f.png")
        game.load.image("w3", "assets/w/t.png")
        game.load.image("w4", "assets/w/l.png")
        game.load.image("w5", "assets/w/y.png")
        game.load.image("w6", "assets/w/z.png")
        game.stage.backgroundColor = '#999'
    
        
    },
    create : function(){
        this.dia = 100 
        this.lastselect = null
        this.move = false
		this.select = game.add.group()
        this.Groupeobjs = game.add.group()
		
		//this.delPoints = []
        
        this.Groupeobjs.y = 222
        this.select.y = 222
        
		//this.dels = game.add.group()
		//this.animas = game.add.group()
        //fip = game.add.sprite(0, 0, "circle")
        //fip2 = new Phaser.Sprite(game, 88, 88, "circle")
        //Groupeobjs.add(fip2)
        
        //fip.anchor.setTo(0.1, 0.1)
        //fip.scale.setTo(0.1, 0.1)

        for(var i=0; i<6; i++){
        
            for(var j=0; j<6; j++){
                var flips  = this.addnewobj(i*this.dia+30, j*this.dia)
                flips.r = j
                flips.c = i
                flips.n = 'w'+i+'-'+j
                this.Groupeobjs.add(flips)
                
                
                
            }
        
        }
        
//        game.input.onDown.add(this.funcDown, this)
		game.input.onUp.add(this.funcUp, this)

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
    },
    funcDown: function(f){
        this.move = true
        
        f.alpha = 1
        this.select.add(f)
        this.lastselect = f
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
        
        
        this.select.add(f)
        //swapchild && (this.select.swap(f, swapchild))
        
        
        
        this.lastselect = f
        
    },
    funcUp: function(){
		var that = this
        this.move = false
 
        var isdel = true
        if(this.select.length > 2){
		
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
//	,
//	
//	addanima: function(item){
//	
//		if(item.r > 0){
//		
//			for(var rr = 0; rr < item.r; rr++){
//				this.dia
//				item.c
//			}
//		
//		
//		}
//
//	}
}