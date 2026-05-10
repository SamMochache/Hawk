import React, { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white';
    const variants = {
      primary: 'bg-neutral-950 text-white hover:bg-neutral-800 shadow-sm',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
      ghost: 'hover:bg-neutral-100 hover:text-neutral-900 text-neutral-600',
      outline:
      'border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-900',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
    };
    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-8 text-base'
    };
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props} />);


  }
);
Button.displayName = 'Button';
// --- Card ---
export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-sm',
        className
      )}
      {...props}>
      
      {children}
    </div>);

}
export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props} />);


}
export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props} />);


}
export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-neutral-500', className)} {...props} />;
}
export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}
// --- Input ---
export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
          className
        )}
        ref={ref}
        {...props} />);


  });
Input.displayName = 'Input';
export const Label = forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) =>
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props} />

);
Label.displayName = 'Label';
// --- Badge ---
export function Badge({
  className,
  variant = 'default',
  ...props











}: React.HTMLAttributes<HTMLDivElement> & {variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'category' | 'category-ai' | 'category-robotics' | 'category-coding';}) {
  const variants = {
    default:
    'border-transparent bg-neutral-900 text-neutral-50 hover:bg-neutral-900/80',
    secondary:
    'border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80',
    outline: 'text-neutral-950 border-neutral-200',
    success:
    'border-transparent bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning:
    'border-transparent bg-amber-50 text-amber-700 border border-amber-200',
    category: 'border-transparent bg-neutral-100 text-neutral-600',
    'category-ai':
    'border-transparent bg-purple-50 text-purple-700 border border-purple-200',
    'category-robotics':
    'border-transparent bg-orange-50 text-orange-700 border border-orange-200',
    'category-coding':
    'border-transparent bg-emerald-50 text-emerald-700 border border-emerald-200'
  };
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props} />);


}
// --- Progress ---
export function ProgressBar({
  value,
  className



}: {value: number;className?: string;}) {
  return (
    <div
      className={cn(
        'h-2 w-full overflow-hidden rounded-full bg-neutral-100',
        className
      )}>
      
      <div
        className="h-full bg-neutral-900 transition-all duration-500 ease-in-out"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`
        }} />
      
    </div>);

}
export function ProgressRing({
  value,
  size = 40,
  strokeWidth = 4,
  className





}: {value: number;size?: number;strokeWidth?: number;className?: string;}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - value / 100 * circumference;
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
      style={{
        width: size,
        height: size
      }}>
      
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-neutral-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2} />
        
        <circle
          className="text-neutral-900 transition-all duration-1000 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2} />
        
      </svg>
    </div>);

}

// --- PlaceholderPage ---
export function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 bg-neutral-300 rounded"></div>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-neutral-950">{title}</h1>
        <p className="text-neutral-600 max-w-md mx-auto">
          {description || "This feature is currently under development and will be available soon."}
        </p>
      </div>
    </div>
  );
}

// --- EmptyState ---
export function EmptyState({ icon: Icon, title, description, action }: { icon?: any; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      {Icon && (
        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <Icon size={24} className="text-neutral-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-neutral-950 mb-2">{title}</h3>
      <p className="text-neutral-600 mb-6 max-w-sm">{description}</p>
      {action}
    </div>
  );
}

// --- Loading ---
export function Loading({ size = 'md', text }: { size?: 'sm' | 'md' | 'lg'; text?: string }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={cn('border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin', sizes[size])}></div>
      {text && <p className="text-sm text-neutral-600 mt-2">{text}</p>}
    </div>
  );
}