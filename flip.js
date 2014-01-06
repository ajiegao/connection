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
        this.select = game.add.group()
        this.lastselect = null
        this.move = false
        this.Groupeobjs = game.add.group()
        //fip = game.add.sprite(0, 0, "circle")
        //fip2 = new Phaser.Sprite(game, 88, 88, "circle")
        //Groupeobjs.add(fip2)
        
        //fip.anchor.setTo(0.1, 0.1)
        //fip.scale.setTo(0.1, 0.1)

        for(var i=0; i<6; i++){
        
            for(var j=0; j<6; j++){
                var r = Math.floor(Math.random()*5+1)
                var face = 'w'+r
                var flips = new Phaser.Sprite(game, i*100+30, j*100, face)
                flips.scale.setTo(0.2, 0.2)
                flips.inputEnabled = true;
                flips.input.pixelPerfect = true;
                flips.input.useHandCursor = true;
                flips.alpha = .6
                flips.r = i
                flips.c = j
                flips.t = face
                flips.n = 'w'+i+'-'+j
                this.Groupeobjs.add(flips)
                
                flips.events.onInputDown.add(this.funcDown, this)
                flips.events.onInputOver.add(this.funcOver, this)
                
            }
        
        }
        
//        game.input.onDown.add(this.funcDown, this)
		game.input.onUp.add(this.funcUp, this)

    },
    render: function(){
        
    },
    update: function(){
        
    },
    funcDown: function(f){
        this.move = true

        f.alpha = 1
        this.select.add(f)
        this.lastselect = f
    
    },
    funcOver: function(f){
       
        if(!this.move) return false;
        if(f.t !== this.lastselect.t) return false;
        //if(f.i == this.lastselect.i && f.j == this.lastselect.j) return ;
        
        var x2 = Math.abs(f.center.x - this.lastselect.center.x)
        var y2 = Math.abs(f.center.y - this.lastselect.center.y)        
        var b2 = Math.sqrt(x2*x2 + y2*y2)
        if(b2 > 150 || b2 == 0) return false;
        
//        console.log(b2)
//        console.log(f.n)
        f.alpha = 1
        this.select.add(f)
        this.lastselect = f
        
    },
    funcUp: function(){
        this.move = false
        
        var isdel = true
        if(this.select.length > 2){
            this.select.removeAll()
        }else{
            this.select.setAll('alpha', 0.6)
        }
        
    }
}