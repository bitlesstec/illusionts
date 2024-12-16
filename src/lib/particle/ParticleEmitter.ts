import { MathUtil } from "../util/MathUtil";
import { Particle } from "./Particle";
import { ParticleShape } from "./ParticleShape";

/**
 * ParticleEmitter Class:
 * 
 * The `ParticleEmitter` class is responsible for creating and controlling the behavior of particles over time.
 * It allows you to configure the emitter and particle properties such as speed, size, lifetime, color, gravity, and more.
 * This class is ideal for creating various particle effects like fire, explosions, smoke, etc.
 * 
 * Configuration Parameters:
 * 
 * - `x`: The x-coordinate (horizontal position) of the emitter on the canvas.
 * - `y`: The y-coordinate (vertical position) of the emitter on the canvas.
 * - `numberOfParticles`: Number of particles to emit. Default is 10.
 * - `randomSpacing`: If true, particles will be emitted with random spacing between angles. Default is true.
 * - `minAngle`: The minimum angle in radians from which particles will be emitted.
 * - `maxAngle`: The maximum angle in radians from which particles will be emitted.
 * - `minSize`: The minimum size of the emitted particles.
 * - `maxSize`: The maximum size of the emitted particles.
 * - `minSpeed`: The minimum speed at which particles will be emitted.
 * - `maxSpeed`: The maximum speed at which particles will be emitted.
 * - `minScaleSpeed`: The minimum rate at which particles scale (shrink or grow).
 * - `maxScaleSpeed`: The maximum rate at which particles scale (shrink or grow).
 * - `alphaRandomized`: If true, each particle's alpha (transparency) will be randomized. Default is false.
 * - `minAlphaSpeed`: The minimum speed at which particles' transparency fades.
 * - `maxAlphaSpeed`: The maximum speed at which particles' transparency fades.
 * - `minRotationSpeed`: The minimum speed at which particles rotate.
 * - `maxRotationSpeed`: The maximum speed at which particles rotate.
 * - `gravity`: The gravity force that affects particles' vertical movement.
 * - `emitterLife`: The lifetime of the emitter in frames. If `null`, the emitter will run indefinitely.
 * - `initialColor`: The starting color of the particles.
 * - `middleColor`: An optional middle color for particles.
 * - `finalColor`: An optional final color for particles.
 * - `particleShape`: The shape of the emitted particles (e.g., `ParticleShape.ARC` or `ParticleShape.RECT`).
 * - `onComplete`: A callback function that is called when the emitter stops emitting particles (either due to `emitterLife` being reached or when reset).
 * 
 * The `ParticleEmitter` class allows you to customize how particles are emitted, how they behave, and how they fade over time, making it versatile for different visual effects.
 */
export class ParticleEmitter {
    x: number;
    y: number;
    particles: Particle[] = [];
    numberOfParticles: number;
    active: boolean = true;
    emitterLife: number | null; // emitter lifetime in frames
    // elapsedTime: number = 0; // time since emitter was actived
    gravity: number;
    initialColor: string;
    middleColor?: string; // Opcional
    finalColor?: string; // Opcional
    minAngle: number = 0;
    maxAngle: number = Math.PI * 2;
    private onComplete: (() => void) | null;

    minSpd: number;
    maxSpd: number;
    minSize: number;
    maxSize: number;

    frameCounter: number = 0;


    constructor(
        x: number,
        y: number,
        numberOfParticles: number = 10,
        randomSpacing: boolean = true,
        minAngle: number = 0,
        maxAngle: number = Math.PI * 2,
        minSize: number = 4,
        maxSize: number = 16,
        minSpeed: number = 0.1,
        maxSpeed: number = 1,
        minScaleSpeed: number = 0.01,
        maxScaleSpeed: number = 0.05,
        alphaRandomized: boolean = false,
        minAlphaSpeed: number = 0.02,
        maxAlphaSpeed: number = 0.02,
        minRotationSpeed: number = 0.01,
        maxRotationSpeed: number = 0.03,
        gravity: number = 0,
        emitterLife: number | null = null, // Si es null, el emisor no expira automáticamente
        initialColor: string,
        middleColor?: string,
        finalColor?: string,
        particleShape: ParticleShape = ParticleShape.ARC,
        onComplete: (() => void) | null = null) {
        this.x = x;
        this.y = y;
        this.numberOfParticles = numberOfParticles;
        this.gravity = gravity;
        this.initialColor = initialColor;
        this.middleColor = middleColor || initialColor;
        this.finalColor = finalColor || initialColor;
        this.emitterLife = emitterLife;
        this.minAngle = minAngle;
        this.maxAngle = maxAngle;
        this.onComplete = onComplete;
        this.minSpd = minSpeed;
        this.maxSpd = maxSpeed;
        this.minSize = minSize;
        this.maxSize = maxSize;

        // Crear partículas
        const angles = this.generateAngles(numberOfParticles, randomSpacing, minAngle, maxAngle);

        let particleAlpha = 1;

        if (alphaRandomized) {
            particleAlpha = MathUtil.getRandomRange(minAlphaSpeed, maxAlphaSpeed)
        }

        angles.forEach(angle => {

            const speed = {
                x: MathUtil.getRandomRange(minSpeed, maxSpeed) * Math.cos(angle),
                y: MathUtil.getRandomRange(minSpeed, maxSpeed) * Math.sin(angle),
            };

            this.particles.push(
                new Particle(
                    x, y,
                    MathUtil.getRandomRange(minSize, maxSize),
                    speed,
                    MathUtil.getRandomRange(minScaleSpeed, maxScaleSpeed),
                    particleAlpha,
                    MathUtil.getRandomRange(minAlphaSpeed, maxAlphaSpeed),
                    MathUtil.getRandomRange(minRotationSpeed, maxRotationSpeed),
                    gravity, initialColor, middleColor, finalColor, particleShape
                )
            );
        });
    }

    private generateAngles(
        numberOfParticles: number,
        randomSpacing: boolean,
        minAngle: number,
        maxAngle: number): number[] {
        const angles: number[] = [];
        const spacing = (maxAngle - minAngle) / (numberOfParticles - 1);
        for (let i = 0; i < numberOfParticles; i++) {
            angles.push(randomSpacing ? MathUtil.getRandomRange(minAngle, maxAngle) : minAngle + i * spacing);
        }
        return angles;
    }

    update(deltaTime: number) {
        if (!this.active) return;

        // Actualizar tiempo de vida del emisor
        if (this.emitterLife !== null) {
            // this.elapsedTime += deltaTime;

            this.frameCounter++;
            if (this.frameCounter >= this.emitterLife) {
                this.active = false;
                if (this.onComplete) this.onComplete();//add callback for emitter timeout 
                return;
            }
        }

        this.particles.forEach(particle => {
            particle.update(deltaTime);

            // reset particles only if emitterLife is null, meaning 
            //will run endlessly
            if (this.emitterLife === null && particle.alpha <= 0) {
                this.resetParticle(particle);
            }
        });

    }

    private resetParticle(particle: Particle) {
        // Generar un nuevo ángulo basado en el rango definido en el constructor
        const angle = MathUtil.getRandomRange(this.minAngle, this.maxAngle); // Hacia arriba con variación

        // Regenerar velocidad
        particle.vx = Math.cos(angle) * MathUtil.getRandomRange(this.minSpd, this.maxSpd); // Mismo rango de velocidad del emisor
        particle.vy = Math.sin(angle) * MathUtil.getRandomRange(this.minSpd, this.maxSpd); // Movimiento vertical

        // Regenerar tamaño
        const size = MathUtil.getRandomRange(this.minSize, this.maxSize);
        particle.width = size;
        particle.height = size;

        // Resetear posición
        particle.x = this.x;
        particle.y = this.y;

        // Resetear otras propiedades
        particle.alpha = 1; // Totalmente visible
        particle.rotation = 0; // Sin rotación inicial
        particle.lifeTime = 1; // Reiniciar vida completa
    }


    render(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        this.particles.forEach(particle => particle.render(ctx));
    }

    reset(emitterLife?: number) {
        this.emitterLife = emitterLife || this.emitterLife;
        this.frameCounter = 0;
        this.particles.forEach((particle) => { this.resetParticle(particle) });
        this.active = true;
    }
}
