import { clsx } from 'clsx';
export default function Home() {
  return (
    <div>
      <h1
        className={clsx(
          'text-6xl font-bold',
          'text-blue-500',
          'hover:text-blue-50',
          'hover:bg-blue-500',
          'transition duration-75',
        )}>
        Texto no meu h1
      </h1>
    </div>
  );
}
