import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const mathSymbols = [
  { symbol: '√', label: 'Square Root' },
  { symbol: 'π', label: 'Pi' },
  { symbol: '²', label: 'Squared' },
  { symbol: '³', label: 'Cubed' },
  { symbol: '∫', label: 'Integral' },
  { symbol: '∑', label: 'Sum' },
  { symbol: '∞', label: 'Infinity' },
  { symbol: '≈', label: 'Approximately' },
  { symbol: '≠', label: 'Not Equal' },
  { symbol: '≤', label: 'Less Than or Equal' },
  { symbol: '≥', label: 'Greater Than or Equal' },
  { symbol: '×', label: 'Multiply' },
  { symbol: '÷', label: 'Divide' },
  { symbol: '±', label: 'Plus Minus' },
];

interface MathInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function MathInput({ value, onChange, placeholder, className }: MathInputProps) {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  const insertSymbol = (symbol: string) => {
    if (!inputRef) return;
    
    const start = inputRef.selectionStart || 0;
    const end = inputRef.selectionEnd || 0;
    const newValue = value.substring(0, start) + symbol + value.substring(end);
    
    onChange(newValue);
    
    // Set cursor position after symbol
    setTimeout(() => {
      inputRef.focus();
      inputRef.setSelectionRange(start + symbol.length, start + symbol.length);
    }, 0);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <Input
        ref={setInputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Enter math expression..."}
        className="glass font-mono text-lg"
      />
      
      <div className="flex flex-wrap gap-2">
        {mathSymbols.map((item) => (
          <Button
            key={item.symbol}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => insertSymbol(item.symbol)}
            className="glass hover:glow-primary hover-lift h-9 w-9 p-0 font-semibold"
            title={item.label}
          >
            {item.symbol}
          </Button>
        ))}
      </div>
    </div>
  );
}
