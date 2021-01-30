<template>
  <div>
        <canvas
            id="heart"
            :width="width"
            :height="height"
            @click="onClick"></canvas>
        <canvas
            id="particles"
            :width="particlesWidth"
            :height="particlesHeight"></canvas>
        <p>{{globalClicks}}</p>

  </div>
</template>

<script>
import {addClick, registerToCounts} from '../services/ClickCountManager';

const random = (min, max) => {
    return Math.random() * ( max - min ) + min;
}

const PARTICLES_NUMBER = 150;
const MIN_LIFE = 50;
const MAX_LIFE = 150;

export default {
    data() {
        return {
            width: 150,
            height: 150,
            particlesWidth: 1000,
            particlesHeight: 1000,
            particles: [],
            ctx: null,
            globalClicks: 0,
            colors: ['rgba(243,82,92,0.8)','rgba(0,103,76,0.5)','rgba(149,178,58,0.5)','rgba(252,206,68,0.8)','rgba(245,127,79,0.5)']
        }
    },
    methods: {
        onClick(e) {
            addClick();
            this.init(e.clientX, e.clientY);
        },

        Particle(x, y, radius, index, self) {
            this.x = x;
            this.y = y;
            this.dx = Math.random()*10-5;
            this.dy = Math.random()*10-5;
            this.gravity = 0;
            this.radius = radius;

            this.id = index;
            this.life = 0;
            this.maxLife = random(MIN_LIFE, MAX_LIFE);
            this.color = self.colors[Math.floor(Math.random()*self.colors.length)];


            this.draw = () => {
                self.ctx.beginPath();
                self.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2, false);
                self.ctx.strokeStyle = this.color;
                self.ctx.lineWidth = 4;
                self.ctx.stroke();
            }

            this.update = () => {
                if (this.x + this.radius > self.particlesWidth || this.x - this.radius < 0){
                this.dx = -this.dx;
                }
                if (this.y + this.radius > self.particlesHeight || this.y - this.radius < 0){
                this.dy = -this.dy;
                }
                this.life++;
                if (this.life >= this.maxLife) {
                    delete self.particles[this.id];

                }
                this.x+=this.dx;
                this.y+=this.dy;
                this.dy += this.gravity;
                this.draw();

            }
        },

        init(x, y) {
            this.particles = (new Array(PARTICLES_NUMBER)).fill(null)
                .map((v, i) => new this.Particle(x, y, 0.5, i, this));

        },

        animateParticle() {
            requestAnimationFrame(this.animateParticle);
            // COOLNESS: if we don't clear rect it becomes a cool random drawing tool!
            this.ctx.clearRect(0, 0, this.particlesWidth, this.particlesHeight);
            this.particles.forEach(part => part.update());
        },

        resizeCanvas(canvas) {
            canvas.width = this.particlesWidth = window.innerWidth;
            canvas.height = this.particlesHeight = window.innerHeight;
        }
    },
    created() {
        registerToCounts(globalClicks => {
            this.globalClicks = globalClicks;
        })
    },
    mounted() {
        const canvas = this.$el.querySelector('#heart');
        const particlesCanvas = this.$el.querySelector('#particles')

        this.resizeCanvas(particlesCanvas);
        window.addEventListener('resize', () => this.resizeCanvas(particlesCanvas));


        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(75, 40);
            ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
            ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
            ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
            ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
            ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
            ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
            ctx.fillStyle = '#FF0000';
            ctx.fill();
        }

        if (particlesCanvas.getContext) {
            this.ctx = particlesCanvas.getContext('2d');
            this.animateParticle();
        }

    }
}
</script>

<style lang="scss" scoped>
    canvas#heart {
        cursor: pointer;
        width: 50px;
        transition: width 0.3s;
        transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &:hover {
            width: 55px;
        }
        &:active {
            width: 50px;
        }
    }
    canvas#particles {
        position: absolute;
        left: 0;
        z-index: -1;
    }
</style>
