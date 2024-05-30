import { Graphics } from "pixi.js";

export interface SimplePoint{
    x: number,
    y: number
}

export interface SimpleCircle {
    x: number,
    y: number,
    width: number
}

export class CircleUtils{
    public static distance(x1: number, y1: number, x2: number, y2: number): number {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static circlesOverlap(circle1: SimpleCircle, circle2: SimpleCircle): boolean {
        const dist = this.distance(circle1.x, circle1.y, circle2.x, circle2.y);
        const combinedRadii = circle1.width/2 + circle2.width/2;
        return dist < combinedRadii;
    }

    public static isCircleWithinRectangle(circle: SimpleCircle, rectangle: Graphics): boolean {
        const circleX = circle.x;
        const circleY = circle.y;
        const radius = circle.width / 2;
    
        const rectX = rectangle.x;
        const rectY = rectangle.y;
        const rectWidth = rectangle.width;
        const rectHeight = rectangle.height;
    
        const leftEdgeCircle = circleX - radius;
        const rightEdgeCircle = circleX + radius;
        const topEdgeCircle = circleY - radius;
        const bottomEdgeCircle = circleY + radius;
    
        const isWithinLeftBound = leftEdgeCircle >= rectX;
        const isWithinRightBound = rightEdgeCircle <= rectX + rectWidth;
        const isWithinTopBound = topEdgeCircle >= rectY;
        const isWithinBottomBound = bottomEdgeCircle <= rectY + rectHeight;
    
        return isWithinLeftBound && isWithinRightBound && isWithinTopBound && isWithinBottomBound;
    }
}