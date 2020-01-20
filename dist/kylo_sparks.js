/* Note: this is a "spark" effect,
Parallax effect use CSS only */

window.onload = function(){
    var can = document.createElement("canvas");
    var ctx = can.getContext("2d");
    can.width = 1500;
    can.height = 800;
    can.x = 0;
    can.y = 0;
    document.getElementById("kiloren_sparks").appendChild(can); 
    // Starting position
    posX = 20,
    posY = can.height / 2;
    // Default settings
    var particles = {},
        particleIndex = 0,
        settings = {
            density: 1,
            particleSize: 2,
            startingX: can.width / 2.5,
            startingY: can.height / 1,
            gravity: -0.05
        };
    function Particle(){
        this.x = settings.startingX;
        this.y = settings.startingY;
        this.vx = Math.random() * 20 - 10;
        this.vy = Math.random() * 20 - 10;

        // Add sparks
        particleIndex ++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 10;
        this.maxLife = 100;
    }
    // Draw function
    Particle.prototype.draw = function(){
        this.x += this.vx;
        this.y += this.vy;
        this.vy += settings.gravity;
        // Spark life
        this.life++;
        if (this.life >= this.maxLife){
            delete particles[this.id];
        }
        // Spark shape
        ctx.clearRect(settings.leftWall, settings.groundLevel, can.width, can.height);
        ctx.beginPath();
        ctx.fillStyle="#FCEBAC";
        ctx.arc(this.x, this.y, settings.particleSize, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    }
    setInterval(function(){
        ctx.clearRect(0, 0, can.width, can.height);
        // Draw spark
        for (var i = 0; i < settings.density; i++){
            if (Math.random() > 0.8){
            new Particle();
            }
        }

        for (var i in particles){
            particles[i].draw();
        }
    }, 35);
};