/**
 * Advanced math solver utilities
 * Supports: linear equations, quadratic equations, square roots with steps
 */

import { evaluate, sqrt, parse, simplify } from 'mathjs';

export interface LinearSolution {
  type: 'linear';
  solution: number;
  steps: string[];
}

export interface QuadraticSolution {
  type: 'quadratic';
  a: number;
  b: number;
  c: number;
  discriminant: number;
  roots: { x1: number | string; x2: number | string };
  vertex: { x: number; y: number };
  axisOfSymmetry: number;
  steps: string[];
}

export interface SqrtSolution {
  type: 'sqrt';
  value: number;
  exact: string;
  decimal: number;
  steps: string[];
}

/**
 * Solve linear equation in form: ax + b = c or similar
 * Example: "3x + 5 = 14" or "2x - 3 = 7"
 */
export function solveLinear(equation: string): LinearSolution | null {
  try {
    const steps: string[] = [];
    
    // Parse equation (assume format: expression = value)
    const parts = equation.split('=').map(p => p.trim());
    if (parts.length !== 2) return null;
    
    const leftSide = parts[0];
    const rightValue = parseFloat(parts[1]);
    
    steps.push(`Original equation: ${equation}`);
    
    // Extract coefficient and constant from left side
    // Pattern: ax + b or ax - b
    const match = leftSide.match(/([-+]?\d*\.?\d*)x\s*([-+]\s*\d+\.?\d*)?/);
    if (!match) return null;
    
    const a = match[1] === '' || match[1] === '+' ? 1 : match[1] === '-' ? -1 : parseFloat(match[1]);
    const b = match[2] ? parseFloat(match[2].replace(/\s/g, '')) : 0;
    
    steps.push(`Identified: ${a}x ${b >= 0 ? '+' : ''} ${b} = ${rightValue}`);
    
    // Solve: ax + b = c => x = (c - b) / a
    const c = rightValue;
    steps.push(`Subtract ${b} from both sides: ${a}x = ${c - b}`);
    
    const solution = (c - b) / a;
    steps.push(`Divide by ${a}: x = ${solution}`);
    
    return {
      type: 'linear',
      solution,
      steps
    };
  } catch (error) {
    return null;
  }
}

/**
 * Solve quadratic equation: ax² + bx + c = 0
 * Returns roots, discriminant, vertex, and step-by-step solution
 */
export function solveQuadratic(a: number, b: number, c: number): QuadraticSolution {
  const steps: string[] = [];
  
  steps.push(`Given equation: ${a}x² ${b >= 0 ? '+' : ''} ${b}x ${c >= 0 ? '+' : ''} ${c} = 0`);
  
  // Calculate discriminant
  const discriminant = b * b - 4 * a * c;
  steps.push(`Calculate discriminant: Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`);
  
  let roots: { x1: number | string; x2: number | string };
  
  if (discriminant > 0) {
    // Two real roots
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    steps.push(`Δ > 0: Two real roots exist`);
    steps.push(`x₁ = (-b + √Δ) / 2a = ${x1.toFixed(4)}`);
    steps.push(`x₂ = (-b - √Δ) / 2a = ${x2.toFixed(4)}`);
    roots = { x1, x2 };
  } else if (discriminant === 0) {
    // One real root
    const x1 = -b / (2 * a);
    steps.push(`Δ = 0: One real root (repeated)`);
    steps.push(`x = -b / 2a = ${x1.toFixed(4)}`);
    roots = { x1, x2: x1 };
  } else {
    // Complex roots
    const realPart = -b / (2 * a);
    const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
    steps.push(`Δ < 0: Two complex roots`);
    steps.push(`x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`);
    steps.push(`x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`);
    roots = {
      x1: `${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`,
      x2: `${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`
    };
  }
  
  // Calculate vertex
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;
  steps.push(`Vertex: (${vertexX.toFixed(4)}, ${vertexY.toFixed(4)})`);
  
  // Axis of symmetry
  const axisOfSymmetry = vertexX;
  steps.push(`Axis of symmetry: x = ${axisOfSymmetry.toFixed(4)}`);
  
  return {
    type: 'quadratic',
    a,
    b,
    c,
    discriminant,
    roots,
    vertex: { x: vertexX, y: vertexY },
    axisOfSymmetry,
    steps
  };
}

/**
 * Calculate square root with rationalization steps
 */
export function solveSqrt(value: number): SqrtSolution {
  const steps: string[] = [];
  
  steps.push(`Calculate √${value}`);
  
  const result = Math.sqrt(value);
  const isExact = Number.isInteger(result);
  
  if (isExact) {
    steps.push(`${value} is a perfect square`);
    steps.push(`√${value} = ${result}`);
  } else {
    steps.push(`${value} is not a perfect square`);
    steps.push(`√${value} ≈ ${result.toFixed(6)}`);
    
    // Try to simplify (basic factorization)
    let simplified = false;
    for (let i = 2; i * i <= value; i++) {
      if (value % (i * i) === 0) {
        const outside = i;
        const inside = value / (i * i);
        steps.push(`Simplify: √${value} = √(${i * i} × ${inside}) = ${outside}√${inside}`);
        simplified = true;
        break;
      }
    }
    
    if (!simplified) {
      steps.push(`Cannot simplify further`);
    }
  }
  
  return {
    type: 'sqrt',
    value,
    exact: isExact ? `${result}` : `√${value}`,
    decimal: result,
    steps
  };
}

/**
 * General expression evaluator
 */
export function evaluateExpression(expression: string): number {
  try {
    return evaluate(expression);
  } catch (error) {
    throw new Error('Invalid expression');
  }
}
