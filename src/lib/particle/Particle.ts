import { ParticleShape } from "./ParticleShape";

export class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    width: number;
    height: number;
    scaleSpeed: number;
    alpha: number = 1;
    alphaSpeed: number;
    rotation: number = 0;
    rotationSpeed: number;
    gravity: number;
    initialColor: string;
    middleColor?: string;
    finalColor?: string;
    lifeTime: number = 1; // lifeTime is same as alpha value for a particle
    particleShape: ParticleShape;


    constructor(
        x: number,
        y: number,
        size: number,
        speed: { x: number; y: number },
        scaleSpeed: number,
        alpha: number,
        alphaSpeed: number,
        rotationSpeed: number,
        gravity: number,
        initialColor: string,
        middleColor?: string,
        finalColor?: string,
        particleShape: ParticleShape = ParticleShape.ARC
    ) {
        this.x = x;
        this.y = y;
        this.vx = speed.x// * Math.cos(angle);
        this.vy = speed.y// * Math.sin(angle);
        this.width = size;
        this.height = size;
        this.scaleSpeed = scaleSpeed;
        this.alpha = alpha,
            this.alphaSpeed = alphaSpeed;
        this.rotationSpeed = rotationSpeed;
        this.gravity = gravity;
        this.initialColor = initialColor;
        this.middleColor = middleColor;
        this.finalColor = finalColor;
        this.particleShape = particleShape;
        this.lifeTime = alpha;
    }


    update(deltaTime: number) {
        // Movimiento
        this.vy += this.gravity;
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;

        // Cambiar tamaño
        if (this.width > 0) this.width -= this.scaleSpeed * deltaTime;
        if (this.height > 0) this.height -= this.scaleSpeed * deltaTime;

        // Asegurarse de que los tamaños no sean negativos
        if (this.width < 0) this.width = 0;
        if (this.height < 0) this.height = 0;

        this.rotation += this.rotationSpeed * deltaTime;

        const progress = 1 - this.lifeTime; // Progreso de 0 a 1

        // Reducir alpha solo al llegar al color final
        if (progress >= 0.66) {
            this.alpha -= this.alphaSpeed * deltaTime;
            if (this.alpha < 0) this.alpha = 0;
        }

        // Actualizar vida útil
        this.lifeTime -= this.alphaSpeed * deltaTime;
        if (this.lifeTime < 0) this.lifeTime = 0;
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.alpha <= 0) return;

        const gradient = this.calculateColorGradient();

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = gradient;
        ctx.translate(this.x, this.y);


        switch (this.particleShape) {
            case ParticleShape.ARC:
                ctx.beginPath();
                ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2);
                ctx.fill();
                break;
            case ParticleShape.RECT:
                ctx.rotate(this.rotation);
                ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
                break;
            // case ParticleShape.RANDOM://not used for now
            // break;

        }


        ctx.restore();
    }

    private calculateColorGradient(): string {
        const progress = 1 - this.lifeTime; // Progreso de 0 a 1

        // Fases de colores
        if (progress < 0.33) {
            // Primera fase: Color inicial
            return this.initialColor;
        } else if (progress < 0.66) {
            // Segunda fase: Color intermedio
            return this.middleColor || this.initialColor;
        } else {
            // Tercera fase: Color final
            return this.finalColor || this.middleColor || this.initialColor;
        }
    }

}
